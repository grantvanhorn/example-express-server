import {
  validateUser,
} from '../src/lib/users';
import 'chai/register-expect';

describe('User validation...', () => {
  it('should return true with a correct model', () => {
    const user = {
      "name": "Test",
      "email": "test@test.com",
      "expertise": "Test",
    };

    const userValidationResult = validateUser(user);
    expect(userValidationResult).to.be.true;
  });

  it('should return false when expertise is missing', () => {
    const user = {
      "name": "Test",
      "email": "test@test.com",
    };

    const userValidationResult = validateUser(user);
    expect(userValidationResult).to.not.be.true;
  });

  it('should return false when email is missing', () => {
    const user = {
      "name": "Test",
      "expertise": "Test",
    };

    const userValidationResult = validateUser(user);
    expect(userValidationResult).to.not.be.true;
  });

  it('should return false when name is missing', () => {
    const user = {
      "email": "test@test.com",
      "expertise": "Test",
    };

    const userValidationResult = validateUser(user);
    expect(userValidationResult).to.not.be.true;
  });
});
