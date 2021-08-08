const { default: knex } = require("knex");

exports.up = function(knex) {
    return knex.schema
    .createTable("userDetail",(table)=>{
        table.increments('Id').primary();
        table.string('UserName',255).notNullable();
        table.string('Email_id',255).notNullable();
        table.string('password',255).notNullable();
        table.unique("Email_id")
  
    })
    .createTable('post',(table)=>{
            table.increments('id').primary();
            table.string("Images",255).notNullable()
            table.integer("like").notNullable()
            table.integer("dislike").notNullable()
            

    })
    .createTable('postDetail',(table)=>{
        table.string('Email_id',255).notNullable();
        table.string("Images",255).notNullable()
        table.string("like_or_dislike",255).notNullable()
        

})

};


exports.down = function(knex) {
    return knex.schema.dropTable("userDetail").dropTable("post").dropTable("postDetail")
};
