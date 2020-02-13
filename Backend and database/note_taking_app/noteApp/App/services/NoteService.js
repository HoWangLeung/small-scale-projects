const fs = require('fs');

class NoteService{
    constructor(knex){  //pass notes.json as argument
        this.knex = knex; //this.file = file from notes.json

    }
    add(note, user){

        let query = this.knex
        .select('id')
        .from('users')
        .where('users.username', user);

            return query.then((rows) =>{
                console.log(rows[0].id, '<=====this is the id');
                
                if(rows.length === 1){
                    return this.knex.insert({
                        content:note,
                        user_id: rows[0].id
                    }).into('notes')
            }else{
                    throw new Error('Cannot add a note to a user that doesnt exist')
                }
            });
     
    };

    list(user){
        if(typeof user !== 'undefined'){
            let query = this.knex.select('notes.id', 'notes.content')
                .from('notes')
                .innerJoin('users', 'notes.user_id', 'users.id')
                .where('users.username', user) //user is the argument
                .orderBy('notes.id', 'asc')
                //what is asc
                return query.then((rows)=>{
                    console.log(rows, 'pp');
                    return rows.map(row=>({
                        id: row.id,
                        content: row.content
                    }));               
                });
            }
        }

    update(id, note, user){
        let query = this.knex
        .select('id')
        .from('users')
        .where('users.username', user);

            return query.then((rows =>{
                if(rows.length ===1){
                    return this.knex('notes')
                    .where('id',id)
                    .update({
                        content:note
                    })
                } else{
                    throw new Error('Cannot update a note if the user doesnt exist!')
                }
            }));
    };

    remove(id, user){
        let query = this.knex
        .select('id')
        .from('users')
        .where('users.username', user);

            return query.then((rows) =>{
                if(rows.length ===1){
                    return this.knex('notes')
                    .where('id',id)
                    .del()
                } else{
                    throw new Error('Cannot remove a note when the user doesnt exist!')
                }
            });
    }
}

module.exports = NoteService;