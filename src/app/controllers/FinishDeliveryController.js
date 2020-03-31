import { isBefore, parseISO } from 'date-fns';

import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

class FinishDeliveryController {
  async update(req, res) {
    const { orderId } = req.params;
    const { deliveryman_id, end_date, signature_id } = req.body;

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
        message: 'you can not finish a delivery without entering a valid delivery id',
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

    const file = await File.findByPk(signature_id);

    if (!file) {
      return res.status(400).json({
        message: 'signature image not saved later',
      });
    }

    const date = parseISO(end_date);

    if (isBefore(date, new Date())) {
      return res.status(400).json({ message: 'past date are not permitted' });
    }

    order.end_date = date;
    order.signature_id = signature_id;
    await order.save();

    return res.status(200).json(order);
  }
}

export default new FinishDeliveryController();
