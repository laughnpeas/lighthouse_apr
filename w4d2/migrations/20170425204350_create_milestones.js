exports.up = function(knex, Promise) {  
  return Promise.all([
    knex.schema.createTable('milestones', function(table){
      table.integer('id');
      table.string('descriptione');
      table.date('date_achievedd');
      table.integer('famous_person_id');
      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {  
  return Promise.all([
    knex.schema.dropTable('milestones')
  ])
};