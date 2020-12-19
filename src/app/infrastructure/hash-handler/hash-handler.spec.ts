import makeBuildHashHandler from './hash-handler';

describe('hash-handler', () => {
  test('should return the same message-digest when given inputs are the same', () => {
    // given
    const input = 'input';

    const buildHashHandler = makeBuildHashHandler();

    const hashHandler = buildHashHandler();

    // when
    const firstResult = hashHandler.hash(input);
    const secResult = hashHandler.hash(input);

    // expect
    expect(firstResult).toBe(secResult);
  });
});
