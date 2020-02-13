// const NoteService = require('./NoteService');

// describe('NoteService tests, simple', ()=>{
//     test('List note', function(){
//         const noteService = new NoteService()

//         let notes = noteService.listNote()

//         expect(notes).toEqual([]);
//     })

//     test('List note', function(){
//         const noteService = new NoteService()

//         let notes = noteService.listNote()

//         expect(notes).toEqual([]);

//         noteService.addNote('My first note');
//         notes = noteService.listNote()
//         expect(notes).toEqual(['My first note'])
//     })
// })

const NoteService = require('./NoteService');


describe('Testing the Note Service', ()=>{

    beforeEach(function () {
        if (fs.existsSync('notes.json')) {



            fs.unlinkSync('notes.json');
        }

        fs.writeFileSync('notes.json', '[]');
    });

    test('it lists all notes', ()=>{
        const noteService = new NoteService('./notes.json')

        noteService.listNote().then((result)=>{
            expect(result).toEqual([])
        })
    })

    test('it adds notes', ()=>{
        const noteService = new NoteService('./notes.json')
        noteService.addNote('test').then(()=>{
            return  noteService.listNote().then((result)=>{
            expect(result).toEqual(['test'])
        })
        })
    })



    /* 
    Challenge for the students:

    test('it can add more than one note using addNote', (done)=>{


    })

    required logic - 
    Create a new instance of the noteService
    Using the noteService add one note
    then add another note
    then using list notes get your expected results
    expect results to equal / to be the two notes that you added previously


    This may cause an error:
    Expected $.length = 1 to equal 2. Expected $[0] = 'SUPER' to equal 'testing'. Expected $[1] = undefined to equal 'SUPER'.Stack:Error: Expected $.length = 1 to equal 2.Expected $[0] = 'SUPER' to equal 'testing'.Expected $[1] = undefined to equal 'SUPER'. You can see the error in the test.json, only one of the notes was added..... oh no!  
 const noteService = new NoteService('test.json');
            noteService.addNote('testing').then(() => {
                return noteService.addNote('SUPER').then(() => {
                    return noteService.listNote();
                }).then((result) => {
                    expect(result).toEqual(['testing', 'SUPER']);

                    done();
                }).catch((err) => {
                    done.fail(err)
                })
            })

        })

    ==============================================================
    

    test('add notes before listing notes while having the previous notes', function(done){
        const noteService = new NoteService('test.json');
            noteService.addNote('test').then(()=>{

                const noteService2 = new NoteService('test.json');

                return noteService2.addNote('test2').then(()=>{

                    return noteService2.listNote();

                }).then((result)=>{

                    expect(result).toEqual(['test', 'test2']);
                    done();
                    
            }).catch((err)=>{ //we have two catch blocks this catch wil ensure the current block doesnt break
                done.fail(err);
            }).catch((err)=> { //the last is so it all doesnt break
                done.fail(err);
            });

            });
    })
    */

})