class Post {
  constructor(data) {
    this.id = data.id || undefined;
    this.userId = data.userId;
    this.title = data.title;
    this.body = data.body;
  }
}

export default Post;
