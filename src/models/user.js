class User {
  constructor(data) {
    this.id = data.id || undefined;
    this.name = data.name;
    this.email = data.email;
    this.expertise = data.expertise;
  }
}

export default User;
