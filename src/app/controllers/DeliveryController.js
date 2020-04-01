import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveryController {
  async index(req, res) {
    const { id } = req.params;
    const { option = 'not_delivered', page = 1 } = req.query;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(401).json({
        message: 'this deliveryman does not exists',
      });
    }

    const orders = await Order.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: option === 'not_delivered' ? null : { [Op.ne]: null },
      },
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
          model: File,
          as: 'signature',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.status(200).json(orders);
  }
}

export default new DeliveryController();
