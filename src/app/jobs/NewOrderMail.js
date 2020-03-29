import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'NewOrderMail ';
  }

  async handle({ data }) {
    const { deliveryman, recipient, product } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Uma nova entrega disponivel!',
      template: 'neworder',
      context: {
        deliverymanName: deliveryman.name,
        product,
        recipientName: recipient.name,
        recipientStreet: recipient.street,
        recipientNumber: recipient.number,
        recipientState: recipient.state,
        recipientCity: recipient.city,
        recipientPostal_code: recipient.postal_code,
      },
    });
  }
}

export default new CancellationMail();
