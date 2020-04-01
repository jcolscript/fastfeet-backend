import Mail from '../../lib/Mail';

class CancellationOrderMail {
  get key() {
    return 'CancellationOrderMail ';
  }

  async handle({ data }) {
    const { deliveryman, recipient, product, problem } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Uma entrega foi cancelada!',
      template: 'cancelledorder',
      context: {
        deliverymanName: deliveryman.name,
        product,
        recipientName: recipient.name,
        recipientStreet: recipient.street,
        recipientNumber: recipient.number,
        recipientState: recipient.state,
        recipientCity: recipient.city,
        recipientPostal_code: recipient.postal_code,
        problem,
      },
    });
  }
}

export default new CancellationOrderMail();
