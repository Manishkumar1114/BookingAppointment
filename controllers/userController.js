const User = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const { name, username, phoneNumber, emailId } = req.body;
    const newUser = await User.create({ name, username, phoneNumber, emailId });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.destroy({ where: { id: userId } });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, username, phoneNumber, emailId } = req.body;
    const user = await User.findByPk(userId);
    if (user) {
      user.name = name;
      user.username = username;
      user.phoneNumber = phoneNumber;
      user.emailId = emailId;
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};
