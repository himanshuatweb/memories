import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../model/userModel.js';

//Existing user
export const signin = async (req, res) => {
  console.log(`signin controller runs`);
  const { email, password } = req.body;
  try {
    const checkUser = await UserModel.findOne({ email });
    if (!checkUser) {
      console.log('User does not exists.');
      return res.status(404).json({ message: 'User does not exists.' });
    }
    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      console.log('Invalid Credentials');
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const token = jwt.sign(
      { email: checkUser.email, id: checkUser._id },
      'SECRET_PASSWORD',
      { expiresIn: '1h' }
    );
    res.status(200).json({ result: checkUser, token });
  } catch (error) {
    console.log('From Catch Error ', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

//New User
export const signup = async (req, res) => {
  console.log(`signup controller runs`);
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const ifAlreadyExits = await UserModel.findOne({ email });
    if (ifAlreadyExits) {
      console.log('User already exists.');
      return res.status(400).json({ message: 'User already exists.' });
    }

    if (password !== confirmPassword) {
      console.log('Passwords do not match.');
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const hashedPassword = await bcrypt.hash(password, 2);
    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      'SECRET_PASSWORD',
      { expiresIn: '1h' }
    );
    console.log(result);
    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
