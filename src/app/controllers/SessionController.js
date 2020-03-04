import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: 'user not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'password does not match' });
    }

    const { id, name, cellphone } = user;

    return res
      .status(200)
      .json({ id, name, cellphone, token: user.generateToken() });
  }
}

export default new SessionController();
