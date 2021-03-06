import { RegisterRequestBodySchema } from '../schemas';

describe('register request schema', () => {
  test('validation should failed when user name is not provided', () => {
    // given
    const data = {
      password: 'mockPassword'
    };

    // when
    const { error } = RegisterRequestBodySchema.validate(data);

    //expect
    expect(error === undefined).toBe(false);
  });

  test('validation should failed when password is not provided', () => {
    // given
    const data = {
      userName: 'mockUserName'
    };

    // when
    const { error } = RegisterRequestBodySchema.validate(data);

    //expect
    expect(error === undefined).toBe(false);
  });

  test('validation should failed when user name is blank', () => {
    // given
    const data = {
      userName: '',
      password: 'mockPassword'
    };

    // when
    const { error } = RegisterRequestBodySchema.validate(data);

    //expect
    expect(error === undefined).toBe(false);
  });

  test('validation should failed when password is blank', () => {
    // given
    const data = {
      userName: 'mockUserName',
      password: ''
    };

    // when
    const { error } = RegisterRequestBodySchema.validate(data);

    //expect
    expect(error === undefined).toBe(false);
  });

  test('validation should succeed when user name and password are given and not blank', () => {
    // given
    const data = {
      userName: 'mockUserName',
      password: 'mockPassword'
    };

    // when
    const { error } = RegisterRequestBodySchema.validate(data);

    //expect
    expect(error === undefined).toBe(true);
  });
});
