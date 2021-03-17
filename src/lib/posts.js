export const validatePost = (post) => {
  const {
    title,
    body,
    userId,
  } = post;

  if (!title || !body || !userId) {
    return false;
  }

  return true;
};
