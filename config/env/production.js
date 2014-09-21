
/**
 * Expose
 */

module.exports = {
  db: {
    type: 'mariadb',
    name: 'dbname',
    user: 'root',
    pass: '',
    host: 'localhost'
  },
  domain: {
    api: 'http://api.example.com',
    client: 'http://example.com',
    cors: [
      this.client
    ]
  }
};
