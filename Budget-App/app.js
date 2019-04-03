var budgetController = (function(){
    
    
    
    
})();



var UIcontroller = (function(){
    
    var DomObject = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputbtn:'.add__btn'
        
    };
    
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DomObject.inputType).value,
                description: document.querySelector(DomObject.inputDescription).value,
                value: document.querySelector(DomObject.inputValue).value
                
                
            };
        },
        
        getDom: function() { // making private object returnable i.e public
            return DomObject;
        }
        
    };
    
})();


var Controller = (function(budgetCntrl, UICntrl){
    // do not forget the () while calling the function this is not a callback
    var DOM =  UICntrl.getDom();
    
    var calculate = function(){
       var input =  UICntrl.getInput();
        console.log(input)
        
       
        
    }
    
    document.querySelector(DOM.inputbtn).addEventListener('click',calculate);
    
    document.addEventListener('keypress', function(event){
        if(event.keyCode === 13 || event.which === 13){
            calculate();
            
        }
        
        
    });
    // pass these modules as a parameter else it wont give access to UICntrl 
})(budgetController,UIcontroller);