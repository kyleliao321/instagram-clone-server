import { AuthenticationError, HttpError } from './http-errors';

describe('http-errors', () => {
  test('class exetended from HttpError should be the instance of HttpError', () => {
    // given
    const authenticationError = new AuthenticationError();

    // when
    const result = authenticationError instanceof HttpError;

    // expect
    expect(result).toBe(true);
  });
});
