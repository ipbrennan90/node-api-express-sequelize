
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
    api: 'http://localhost:3100',
    client: 'http://localhost:9100'
  }
};
