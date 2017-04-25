const db = require('./db');

let lastname = process.argv[2];
db.connect((error, client) => {
  client.query('SELECT * FROM famous_people WHERE last_name=$1::text',[lastname], (error, result) => {
    console.log('Searching...');
    let rows = result.rows;
    if(rows.length > 0){
      console.log(`Found ${rows.length} person(s) by the last name '${lastname}':` );
      let index = 1;
      for(let person of rows){
        console.log(`-${index++}: ${person.first_name} ${person.last_name}, born '${new Date(person.birthdate).toLocaleDateString('en-CA')}'`);
      }
    }else{
      console.log(`Not Found any person(s) by the name '${lastname}':` );
    }
    client.end();
  });
});