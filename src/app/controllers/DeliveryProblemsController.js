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
        },
      ],
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    const listOrders = orders.filter(order => order.problems.length > 0);
    return res.status(200).json(listOrders);
  }
}

export default new DeliveryProblemsController();
