// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      database: 'vagrant',
      user:     'development',
      password: 'development'
    },
    migrations: {
      tableName: 'milestones'
    }
  }
};
