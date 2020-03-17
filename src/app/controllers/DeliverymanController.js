import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    return res.status(200).json();
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
}

export default new DeliverymanController();
