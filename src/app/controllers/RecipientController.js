import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const {
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      postal_code,
    } = await Recipient.create(req.body);

    return res
      .status(201)
      .json({ id, name, street, number, complement, city, state, postal_code });
  }

  async update(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    const {
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      postal_code,
    } = await recipient.update(req.body);

    return res
      .status(201)
      .json({ id, name, street, number, complement, city, state, postal_code });
  }
}

export default new RecipientController();
