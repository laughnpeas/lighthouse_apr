let firstname= process.argv[2];
let lastname = process.argv[3];
let birthdate= process.argv[4];
const knexConfig = {
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'development',
    password : 'development',
    database : 'vagrant',
    port: 5432,
    ssl: true
  }
}

const knex = require('knex')(knexConfig);
let person = 
  {
    first_name: firstname,
    last_name: lastname,
    birthdate: new Date(birthdate) 
  };

//Using Promise
knex.transaction( (trx) => {
  return trx
    .insert(person)
    .into('famous_people')
    .then( () => {
      console.log(person.first_name + ' ' + person.last_name + ' saved.');
    })
    .catch(function(error) {
      throw error;
    })
    .finally( () => {
      knex.destroy();
    });
});