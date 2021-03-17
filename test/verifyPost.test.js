import {
  validatePost,
} from '../src/lib/posts';
import 'chai/register-expect';

describe('User validation...', () => {
  it('should return true with a correct model', () => {
    const post = {
      userId: 1,
      title: 'Test',
      body: 'Test body.',
    };

    const postValidationResult = validatePost(post);
    expect(postValidationResult).to.be.true;
  });

  it('should return false when a userId is missing', () => {
    const post = {
      title: 'Test',
      body: 'Test body.',
    };

    const postValidationResult = validatePost(post);
    expect(postValidationResult).to.not.be.true;
  });

  it('should return false when title is missing', () => {
    const post = {
      userId: 1,
      body: 'Test body.',
    };

    const postValidationResult = validatePost(post);
    expect(postValidationResult).to.not.be.true;
  });

  it('should return false when body is missing', () => {
    const post = {
      userId: 1,
      title: 'Test',
    };

    const postValidationResult = validatePost(post);
    expect(postValidationResult).to.not.be.true;
  });
});
