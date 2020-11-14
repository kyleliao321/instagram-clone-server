import jwt from 'jsonwebtoken';
import { GenerateToken } from '../../utilities/types';

export default function makeGenerateToken(dependency: {
  key: string;
}): GenerateToken {
  return function generateToken(id: string): string {
    const token = jwt.sign(
      {
        id
      },
      dependency.key,
      { expiresIn: '1h' }
    );

    return token;
  };
}
