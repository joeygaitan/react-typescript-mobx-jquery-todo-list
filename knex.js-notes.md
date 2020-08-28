youtube link for database primary keys, private, and joint tables: https://www.youtube.com/watch?v=-CuY5ADwn24

# primary key: is an attribute (or field) that uniquely identifies every record in a certain table.

1 primary key per entity
primary key rules
1. Unique
2. never changing
3. Never Null

good to know: usernames are sometimes usernames, use ids

# foriegn key: foreign key is a primary key of another entity from another table. It's a refrence to another to entity associated with it.

* they can be repeated. There can be muiltiple foreign keys in the table

# Composite primary key

coresponding table that has conflicting ids. Because the ids are duplicated so you need to have another table with those two ids inside of it. You have to combine them so they cant be duplicates anymore

* both of the attributes are combined to make composite primary key

# Bridge table

order entity

record of interactions and allowing other information to be captured between two tables

## knex

### migrations

onDelete('cascade') deletes everything coresponding with the item in the table

- how to make a new migration table.....

* knex migrate:make (table-name)

#### creates a batch file with the latest migrations for each table. so if you need to rollback that is what it uses. This allows you to update your tables' columns easily with a rollback and migrate:latest.

* knex migrate:latest

#### rollback is so that it drops the table so that you can add a new column to your table for later changes in your application

* knex migrate:rollback

### seeds

#### how to make a seed from a table! Warning whenever you run this command the id changes on each table :/ which sucks so you have to drop tables or rollback and remigrate and run the seeds again

* knex seed:make table_name_01

### how to add the seeds into your database

* knex seed:run

        {user_id: 1,active:false,header:"Work",body:"", container_index:1,container_item_index:1,private:true},
        {user_id: 1,active:false,header:"Personal Work",body:"", container_index:2,container_item_index:1,private:true},
        {user_id: 1,active:false,header:"Work On Friends homework",body:"Finish problems 1-20", container_index:1,container_item_index:2,private:true}