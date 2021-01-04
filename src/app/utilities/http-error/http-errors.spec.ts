import { UnauthorizedError, HttpError } from './http-errors';

describe('http-errors', () => {
  test('class exetended from HttpError should be the instance of Error', () => {
    // given
    const unauthorizedError = new UnauthorizedError();

    // when
    const result = unauthorizedError instanceof Error;

    // expect
    expect(result).toBe(true);
  });
});
