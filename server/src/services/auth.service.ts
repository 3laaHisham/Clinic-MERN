import { StatusCodes } from 'http-status-codes';
import { HttpError, generateToken, putRedis } from '../utils';
import { User, Request, ICommonUser } from '../models';

const login = async (body: ICommonUser) => {
  const { username, password } = body;
  if (!(username && password)) throw new HttpError(StatusCodes.BAD_REQUEST, 'Username and password are required');

  const user = await User.findOne({ username: username });
  if (!user) throw new HttpError(StatusCodes.NOT_FOUND, 'User not found');

  const isCorrect: boolean = user.isCorrectPassword(password);
  if (!isCorrect) throw new HttpError(StatusCodes.UNAUTHORIZED, 'Incorrect password');

  // const token = generateToken(user!._id, user!.role);
  // putRedis(token, token)

  return {
    status: StatusCodes.OK,
    message: 'Login successful'
    // token
  };
};

const register = async (body: any) => {
  const user = new User(body);
  await user.save();

  if (body.role === 'Doctor') {
    const newRequest = new Request({
      medicID: user._id
    });
    await newRequest.save();
  }

  return {
    status: StatusCodes.CREATED,
    message: 'User created successfully',
    result: user
  };
};

export { login, register };
