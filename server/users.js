const users = {
  activeUsers: {},

  registerUser(username) {
    if (!username || this.activeUsers[username]) {
      return false;
    }
    this.activeUsers[username] = true;
    return true;
  },

  registerGuest() {
    let name;
    let nextId = 1;
    while (!this.registerUser(name)) {
      name = 'Guest ' + nextId;
      nextId += 1;
    }
    return name;
  },

  getUsers() {
    return Object.keys(this.activeUsers);
  },

  vacate(username) {
    if (this.activeUsers[username]) {
      delete this.activeUsers[username];
    }
  }
};

module.exports = users;
