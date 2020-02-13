const express = require("express");
var router = express.Router();

class NoteRouter{
    constructor(noteService){
        this.noteService = noteService;
    }

    router(){  
        router.get("/",this.get.bind(this));
        router.post('/', this.post.bind(this));
        router.delete('/:id', this.delete.bind(this));
        router.put('/:id', this.put.bind(this));
        return router
    }

    get(req,res){
        console.log(req.auth.user,"LINE 18 router router .js <<<<>>>");
        
        return this.noteService.list(req.auth.user)
        .then((data)=>res.json(data))
        .catch((err)=>res.status(500).json(err));
    }
    post(req,res){
        console.log("Line21, NoeRouters activating");
        console.log(req.body.content);
        let noteBody = req.body.content

        return this.noteService.add(noteBody,req.auth.user)
        .then((data)=> {
            this.noteService.list(req.auth.user).then((data)=>{
                console.log(data,"Line30 in RouterJS")
                res.json(data)
            })
        }) //
        .catch((err)=>res.status(500).json(err));
    }

    put(req, res) {
        return this.noteService.update(req.params.id, req.body.note, req.auth.user) // The noteService fires the update command, this will update our note (and our JSON file)
            .then(() => this.noteService.list(req.auth.user)) // Then we fire list note from the same noteService which returns the array of notes for that user. 
            .then((notes) => res.json(notes)) // Then we respond to the request with all of our notes in the JSON format back to our clients browser. 
            .catch((err) => res.status(500).json(err));
    };

    delete(req,res){
        console.log("Line 35 in delete router, delete activating==============<><>");
        console.log(req.body);
        console.log(req.params);
        console.log(req.params.id); 
        return this.noteService.remove(req.params.id, req.auth.user)
        .then(() => this.noteService.list(req.auth.user))
        .then((data)=>{
            console.log('resolved')
            console.log(data, "<===== router")
            res.json(data)}) //
        .catch((err)=>res.status(500).json(err));
    }
   
}
    
module.exports = NoteRouter

