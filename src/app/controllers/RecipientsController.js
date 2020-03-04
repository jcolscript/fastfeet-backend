import Recipients from '../models/Recipients';

class RecipientsController {
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
    } = await Recipients.create(req.body);

    return res
      .status(201)
      .json({ id, name, street, number, complement, city, state, postal_code });
  }
}

export default new RecipientsController();
