import jwt from 'jsonwebtoken';
import { GenerateTokenService } from '../../utilities/types';

export default function makeGenerateToken(dependency: {
  key: string;
}): GenerateTokenService {
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
