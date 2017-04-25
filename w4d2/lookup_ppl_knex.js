let lastname = process.argv[2];
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
//Using Callback
/*knex('famous_people')
.where({
  last_name: lastname
}).select('*')
.asCallback((err, rows) => {
  if(err) {
    throw err;
  } else {
    console.log('Searching...');
    if(rows.length > 0){
      console.log(`Found ${rows.length} person(s) by the last name '${lastname}':` );
      let index = 1;
      for(let person of rows){
        console.log(`-${index++}: ${person.first_name} ${person.last_name}, born '${new Date(person.birthdate).toLocaleDateString('en-CA')}'`);
      }
    }else{
      console.log(`Not Found any person(s) by the name '${lastname}':` );
    }
  }
  knex.destroy();
});
*/

//Using Promise
knex.select('*')
  .from('famous_people')
  .where({ last_name: lastname })
  .then(function (rows) {
    console.log('Searching...');
    if(rows.length > 0){
      console.log(`Found ${rows.length} person(s) by the last name '${lastname}':` );
      let index = 1;
      for(let person of rows){
        console.log(`-${index++}: ${person.first_name} ${person.last_name}, born '${new Date(person.birthdate).toLocaleDateString('en-CA')}'`);
      }
    }else{
      console.log(`Not Found any person(s) by the name '${lastname}':` );
    }
  }).catch(function(err) {
    throw err;
  }).finally(function() {
    knex.destroy();
  });

