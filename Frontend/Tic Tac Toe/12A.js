$(function(){
    let fields = $('.field')
        var possibleCombinations = {
        1: [1,2,3],
        2: [4,5,6],
        3: [7,8,9],
        4: [1,4,7],
        5: [2,5,8],
        6: [3,6,9],
        7: [1,5,9],
        8: [3,5,7],
    };
    var clicks = 0;
    let circle = [];
    let cross = [];
    let won = false;
    
$(`.field`).on('click', function(e){
 let Id= e.target.id;
  if(won){
            return
        }
  if(clicks%2 === 0){
    $(`#${Id}`).addClass('cross')
      console.log(Id);
       cross.push(parseInt(Id))
       console.log("circle arr =  "+ cross);
      checkWin(cross,'CROSS');
      }else if(clicks%2 !==0){
          $(`#${Id}`).addClass('circle')
          circle.push(parseInt(Id))
          console.log("circle arr =  "+ circle);
          checkWin(circle,'CIRCLE');         
      }  
      clicks++;
      console.log('clicks '+clicks);
})
    function checkWin(arr, name){    
        if(arr.length < 3) return;
        
        for(var p in possibleCombinations){
            console.log(possibleCombinations[p].every(elem=> arr.indexOf(elem) > -1));
            
            if(possibleCombinations[p].every(elem=> arr.indexOf(elem) > -1)){ 
              
                          
                won = true;            
             setTimeout(function(){
                    return alert(`player ${name} won`)
                }, 300);
            }
        }
    }
    $('#reload-btn').on('click', function(){
         
        console.log('start agian');
        fields.removeClass('circle cross')
       cross = [];
        circle = [];
        clicks = 0;
        won = false;
    })

})

