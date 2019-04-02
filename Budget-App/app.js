var budgetController = (function(){
    
    
    
    
})();



var UIcontroller = (function(){
    
    
    return ({
        getInput:function(){
            
        }
        
    });
    
})();


var Controller = (function(){
    
    var calculate = function(){
        
        
       console.log('Key Is pressed');   
        
    }
    
    document.querySelector('.add__btn').addEventListener('click',calculate);
    
    document.addEventListener('keypress', function(event){
        if(event.keyCode === 13 || event.which === 13){
            calculate();
            
        }
        
        
    });
    
})();