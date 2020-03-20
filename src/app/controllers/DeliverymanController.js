import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const deliverymen = await Deliveryman.findAll({
      where: { enabled: true },
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
      order: ['name'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.status(200).json(deliverymen);
  }

  async store(req, res) {
    const deliverymanData = req.body;

    const isDuplicated = await Deliveryman.findOne({
      where: { email: deliverymanData.email },
    });

    if (isDuplicated) {
      return res.status(400).json({
        message: 'deliveryman alredy exists.',
      });
    }

    const { id, name, email } = await Deliveryman.create(deliverymanData);

    return res.status(201).json({ id, name, email });
  }

  async update(req, res) {
    const { email } = req.body;

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (email && email !== deliveryman.email) {
      const isDuplicated = await Deliveryman.findOne({
        where: { email },
      });

      if (isDuplicated) {
        return res.status(400).json({ message: 'deliveryman alredy exists.' });
      }
    }

    const { id, name } = await deliveryman.update(req.body);

    return res.status(200).json({ id, name, email });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    deliveryman.enabled = false;
    deliveryman.save();

    const { name, email } = deliveryman;

    return res.status(200).json({ id, name, email });
  }
}

export default new DeliverymanController();
