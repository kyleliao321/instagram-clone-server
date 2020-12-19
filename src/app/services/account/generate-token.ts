import { AuthHandler, GenerateTokenService } from '../../utilities/types';

export default function makeGenerateTokenService(dependency: {
  authHandler: AuthHandler;
  key: string;
}): GenerateTokenService {
  return function generateTokenService(id: string): string {
    const token = dependency.authHandler.sign(
      {
        userId: id
      },
      dependency.key,
      { expiresIn: '1h' }
    );

    return token;
  };
}
