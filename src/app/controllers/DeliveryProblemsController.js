import Order from '../models/Order';
import Recipient from '../models/Recipient';
import File from '../models/File';
import Deliveryman from '../models/Deliveryman';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemsController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const orders = await Order.findAll({
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
        {
          model: DeliveryProblem,
          as: 'problems',
          attributes: ['id', 'description'],
          required: true,
        },
      ],
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.status(200).json(orders);
  }

  async store(req, res) {
    const { id } = req.params;
    const { description } = req.body;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(401).json({
        message: 'order does not exists',
      });
    }

    await DeliveryProblem.create({
      delivery_id: id,
      description,
    });

    await order.reload({
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
        {
          model: DeliveryProblem,
          as: 'problems',
          attributes: ['id', 'description'],
        },
      ],
    });

    return res.status(201).json(order);
  }
}

export default new DeliveryProblemsController();
