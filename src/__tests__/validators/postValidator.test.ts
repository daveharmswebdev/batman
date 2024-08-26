import { createPostSchema } from '../../validators/postsValidator';

describe('createPostSchema', () => {
  it('validate a correct post object', () => {
    const validData = {
      title: 'valid title',
      content: 'valid content',
      published: false,
      authorId: 1,
    };

    expect(() => createPostSchema.parse(validData)).not.toThrow();
  });

  it('should throw for missing a title', () => {
    const invalidData = {
      content: 'valid content',
      published: false,
      authorId: 1,
    };

    expect(() => createPostSchema.parse(invalidData)).toThrow();
  });
});
