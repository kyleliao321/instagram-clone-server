import jwt from 'jsonwebtoken';
import { GenerateTokenService } from '../../utilities/types';

export default function makeGenerateTokenService(dependency: {
  key: string;
}): GenerateTokenService {
  return function generateTokenService(id: string): string {
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
