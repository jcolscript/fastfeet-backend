import {
  parseISO,
  isAfter,
  isBefore,
  setHours,
  startOfHour,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { Op } from 'sequelize';

import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

class StartDeliveryController {
  async update(req, res) {
    const { orderId } = req.params;
    const { deliveryman_id, start_date } = req.body;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    const order = await Order.findByPk(orderId, {
      where: { canceled_at: null },
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'canceled_at',
        'created_at',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'city',
            'state',
            'postal_code',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(401).json({
        message: 'you cannot initiate a delivery without entering a valid delivery id',
      });
    }

    if (!order || order.canceled_at) {
      return res.status(401).json({
        message: 'order does not exist or has been canceled',
      });
    }

    if (order.deliveryman.id !== deliveryman.id) {
      return res.status(401).json({
        message: 'you can not start a delivery with another deliveryman id',
      });
    }

    const date = parseISO(start_date);

    if (isBefore(date, new Date())) {
      return res.status(400).json({ message: 'past date are not permitted' });
    }

    if (
      (isBefore(startOfHour(date), startOfHour(setHours(new Date(), 8))),
      isAfter(startOfHour(date), startOfHour(setHours(new Date(), 18))))
    ) {
      return res.status(401).json({
        message: 'withdrawals can only be made between 08:00 and 18:00',
      });
    }

    const ordersToday = await Order.findAndCountAll({
      where: {
        deliveryman_id,
        canceled_at: null,
        start_date: { [Op.between]: [startOfDay(date), endOfDay(date)] },
      },
    });

    if (ordersToday >= 5) {
      return res.status(401).json({
        message: 'you reached the number of withdrawals per day (5 withdrawals)',
      });
    }

    order.start_date = date;
    await order.save();

    return res.status(200).json(order);
  }
}

export default new StartDeliveryController();
