import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/users';

const SECRET = process.env.JWT_SECRET || 'minhaSenha';

interface JwtPayload {
  user_id: string;
}

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.decode(token) as JwtPayload;
    const { user_id } = decoded;

    const findUserById = await UserService.getByFirebaseId(user_id);
    if (!findUserById) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    req.body.user = { user_id };
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default validateJWT;
