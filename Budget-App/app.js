var budgetController = (function(){
    var Expenses = function(id,description, value){
        this.id = id,
        this.description = description,
        this.value = value
    };
    
    var Income = function(id,description, value){
        this.id = id,
        this.description = description,
        this.value = value
    };
        
   var data = {
       allItem:{
           exp:[],
           inc:[]
           
       },
       total:{
           exp:0,
           inc:0 
       }
       
       
   };
    
    return {
        additem : function(type,desc,val){
            var newItem, ID;
            
            
            //creating new ID
            if(data.allItem[type].length >0){
            ID = data.allItem[type][data.allItem[type].length -1].id + 1;    
            }else{
            ID = 0;
            }
            
            
            if(type === 'exp'){
                newItem = new Expenses(ID,desc,val);
            }else if(type === 'inc'){
                newItem = new Expenses(ID,desc,val);
                
            }
            
            data.allItem[type].push(newItem);
            
            // so that new item will be accessible to other items
            return newItem;
        },
        
        testing: function(){
            console.log(data);
            
        }
    };
    
    
    
})();

var UIcontroller = (function(){
    
    var DomObject = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputbtn:'.add__btn',
        incomeContainer: 'income__list',
        expenseContainer 'expenses__list':
        
    };
    
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DomObject.inputType).value,
                description: document.querySelector(DomObject.inputDescription).value,
                value: document.querySelector(DomObject.inputValue).value
                
                
            };
        },
        addElement: function(obj, type){
            var html, newHtml,element;
            
            
            if(type === 'inc'){
                element = DomObject.incomeContainer;
                html = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                
            }
            else{
                element = DomObject.expenseContainer;
                
                html = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>
                
                '
            }
            
            newHtml = html.replace(%id%, obj.id);
            // first replace html then make chances in newHtml else old %id% will
            //still be there
            newHtml = newHtml.replace(%description%, obj.description);
            newHtml = newHtml.replace(%value%, obj.value);
            
            
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
            
        }
        
        ,
        
        getDom: function() { // making private object returnable i.e public
            return DomObject;
        }
        
    };
    
})();


var Controller = (function(budgetCntrl, UICntrl){
    // do not forget the () while calling the function this is not a callback
    
    var setUpEventListeners= function(){
    // Dom will only be used for events
        var DOM =  UICntrl.getDom();
        
    document.querySelector(DOM.inputbtn).addEventListener('click',calculate);
    
    document.addEventListener('keypress', function(event){
        if(event.keyCode === 13 || event.which === 13){
            calculate();
            
        }
        });
        
        
    }
    
    
    var calculate = function(){
        var input =  UICntrl.getInput();
        //console.log(input)
        var additem =  budgetCntrl.additem(input.type,input.description,input.value);  
        
        UICntrl.addElement(additem, input.type);
        
    };
    
   return {
       init : function(){
           console.log('Event started');
           setUpEventListeners();
       }
       
   }
        
    
    // pass these modules as a parameter else it wont give access to UICntrl 
})(budgetController,UIcontroller);

// to start the application we need to call init as it is inside IIFE it is private 
// but we have returned it so it can be accessed from outside
Controller.init();