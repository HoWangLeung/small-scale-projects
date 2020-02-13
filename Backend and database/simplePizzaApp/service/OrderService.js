const fs = require('fs');


class OrderService{
    constructor(knex){
        this.knex = knex;
    }

    

    read(user){
        console.log('read function running');
        console.log(user, 'line 13')
        return new Promise((resolve,reject)=>{
            fs.readFile(this.file,'utf-8',(err,data)=>{
                console.log(data, "line 18 , orderService");
                if(err){
                    reject(err)
                }
                try{     
                    this.orders = JSON.parse(data);
                    console.log(this.orders, "line 24 orderService");
                    console.log(user, 'line 23')
                 
                } catch (e) {
                    return reject(e)
                }
                return resolve(this.orders[user]);
            })

        })  
    }

    list(user){
        console.log(typeof user, "line 10 list function running orderService");
        if(typeof user !== undefined){
            let query = this.knex.select('orders.id','orders.content','orders.price')
            .from('orders')
            .innerJoin('users','orders.user_id', 'users.id')
            .where('users.username', user)
          
            console.log('line 43 orderservice');
            
            return query.then((rows)=>{
                console.log(rows, 'line 39 noterservice JS');
                return rows.map(row=>({
                    id: row.id,
                    content: row.content,
                    price:row.price
                }));  
            });
        }
        
    }

    add(newOrder,user){
        console.log('add function running ?????????????????????????');
        console.log(newOrder,user);
        console.log(this.orders, 'line 43 ===========>>>>>');
        let query = this.knex
        .select('id')
        .from('users')
        .where('users.username', user);
        

            return query.then((rows)=>{
               console.log(rows[0].id);
               return this.knex.insert({
                content:newOrder,
                user_id: rows[0].id
                
            }).into('orders')
                
            })


    }

    write(){
        console.log('write function running ');
        return new Promise((resolve,reject)=>{
            fs.writeFile(this.file, JSON.stringify(this.orders),(err)=>{
                console.log(this.file, 'line 52 orderserviceJS');
                
                console.log(this.orders, "line 54 orderservice JS")
                if(err){
                    return reject(err);
                }
                resolve(this.orders);
            })
        })
    }

}

module.exports = OrderService;