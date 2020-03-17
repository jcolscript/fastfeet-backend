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
}

export default new RecipientController();
