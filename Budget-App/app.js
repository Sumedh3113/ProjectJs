var budgetController = (function(){
    var Expenses = function(id,description, value,percent){
        this.id = id,
        this.description = description,
        this.value = value
        this.percent = percent;
    };
    
    Expenses.prototype.calcPercent = function(totalIncome){
        
        if(totalIncome > 0){
        this.percent = Math.round((this.value/totalIncome)*100);    
        }else{
            this.percent = -1;
        }
        
        
    };
    
    Expenses.prototype.getExp = function(){
        
        return this.percent;
    };
    
    var Income = function(id,description, value){
        this.id = id,
        this.description = description,
        this.value = value
    };
    
    var calTotal = function(type){
            var sum = 0;
            data.allItem[type].forEach(function(cur){
                sum +=cur.value;
                
                
            });
            data.total[type] = sum;
            
        };
        
   var data = {
       allItem:{
           exp:[],
           inc:[]
           
       },
       total:{
           exp:0,
           inc:0 
       },
       budgetAmt: 0,
       percent: -1
       
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
                newItem = new Income(ID,desc,val);
                
            }
            
            data.allItem[type].push(newItem);
            
            // so that new item will be accessible to other items
            return newItem;
        },
        
        testing: function(){
            console.log(data);
            
        },
        deleteItem: function(type,id){
            var ids, index;
        // map return every position and make it as an array
            ids = data.allItem[type].map(function(cur){
                return cur.id;
                
            });
            
            index = ids.indexOf(id);
            //console.log(index);
            
            if(index > -1){
                data.allItem[type].splice(index,1);
                
            }
            
            
        },
        calBudget: function(){
         calTotal('inc');
         calTotal('exp')
            
        // cal budget
        data.budgetAmt = data.total.inc - data.total.exp;
        if(data.total.inc > 0){
            //cal percent
        data.percent = Math.round((data.total.exp/data.total.inc)*100);
        } else{
            
            data.percent = -1;
        }
        
            
        },
        getBudget:function(){
            return {
                bud:data.budgetAmt,
                percent: data.percent,
                totalinc: data.total.inc,
                totalexp: data.total.exp
            }
            
            
        },
        
        calPercent: function(){
          data.allItem.exp.forEach(function(cur){
              cur.calcPercent(data.total.inc);
              
          });
        
            },
        getsPercent: function(){
        var eachPercent = data.allItem.exp.map(function(cur){
         
            return cur.getExp();
            
        });
            
        return eachPercent;
    }
        

    };
    
    
    
})();

var UIcontroller = (function(){
    
    var DomObject = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputbtn:'.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetlabel:'.budget__value',
        budgetInc: '.budget__income--value',
        budgetExp: '.budget__expenses--value',
        percentage: '.budget__expenses--percentage',
        container: '.container',
        expPercent:'.item__percentage',
        date:'.budget__title--month'
    };
    
    
    formatString = function(num,type){
        var numSplit, int, dec;
        
        num = Math.abs(num);
        num = num.toFixed(2);
        
        numSplit =  num.split('.');
        
        int = numSplit[0];
        dec = numSplit[1];
        
        if(int.length > 3){
            int = int.substr(0,int.length-3) + ',' + int.substr(int.length -3,3);
            
        }
        
        return (type === 'exp' ? '-':'+') + ' '+int + '.' + dec;
        
        
        
    }
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DomObject.inputType).value,
                description: document.querySelector(DomObject.inputDescription).value,
                value: parseFloat(document.querySelector(DomObject.inputValue).value)
                
                
            };
        },
        addElement: function(obj, type){
            var html, newHtml,element;
            
            
            if(type === 'inc'){
                element = DomObject.incomeContainer;
                
                
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                
            }
            else{
                element = DomObject.expenseContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            newHtml = html.replace('%id%', obj.id);
            // first replace html then make chances in newHtml else old %id% will
            //still be there
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatString(obj.value,type));
            
            //console.log(newHtml);
            
            //document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
        },
        removeElement:function(selectorID){
               var elem = document.getElementById(selectorID);
                elem.parentNode.removeChild(elem);
            
        },
        
        getDom: function() { // making private object returnable i.e public
            return DomObject;
        },
        
        clearField: function() {
            var field, fieldArr;
            field = document.querySelectorAll(DomObject.inputDescription +','+ DomObject.inputValue);
            //  field is a list type we are converting it to array type
            // Array is the function construtor 
            fieldArr = Array.prototype.slice.call(field); 
            fieldArr.forEach(function(cur,i, arr){  
                cur.value = "";
                
                
            });
            
            fieldArr[0].focus();
            
        },
        displayBudget: function(obj){
            var type;
            
               obj.bud > 0 ? type = 'inc' : type ='exp';
               
            
            document.querySelector(DomObject.budgetlabel).textContent = formatString(obj.bud,type);
            document.querySelector(DomObject.budgetInc).textContent = formatString(obj.totalinc,'inc');
            document.querySelector(DomObject.budgetExp).textContent = formatString(obj.totalexp,'exp');
            
            if(obj.percent > 0)
               {
               document.querySelector(DomObject.percentage).textContent = obj.percent + '%';
               }else{
        
                document.querySelector(DomObject.percentage).textContent = '--';
                    }   
            
        },
        
        displayPercent: function(percentage) {
            
            var fields = document.querySelectorAll(DomObject.expPercent);
            
            var NodeForEach = function(list, callback){
                for(var i =0; i<list.length; i++){
                    callback(list[i],i);
                   // fetching each expence field and passing to function below 
                }
                
            };
            
            // customized function for travering through list nodes not arrays
            NodeForEach(fields, function(current, index){
                if(percentage[index] > 0){
                    current.textContent = percentage[index] + '%';   
                   }else{
                   current.textContent = '--';
                   
                   }
           
                            
            });
        },
            
        displayDate: function(){
        var now, month, year;
            
            now = new Date();
            
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            year = now.getFullYear();
            month = now.getMonth();
            
            document.querySelector(DomObject.date).textContent = months[month] + ' '+ year;
            
            //return 
            
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
            
                                                    }});
    document.querySelector(DOM.container).addEventListener('click',cntrlDeleteItem);
        
    }
    
    var updateBudget= function(){
        
        //cal budget
    budgetCntrl.calBudget();
        // get budget
        var bud = budgetCntrl.getBudget();
        //display budget
        //console.log(bud);
        UICntrl.displayBudget(bud);
        
    }
    
    /*----to update the percentage------------*/
    var updatePercent =function(){
        
        //1. Calculate the percent
        budgetCntrl.calPercent();
        
        //2. Get the percent
        var expPercent =  budgetCntrl.getsPercent();
        //3.print it
        
        //console.log(expPercent);
        UICntrl.displayPercent(expPercent);
        
        
        
        
    }
    /*-----------------------This is the function making all the  calls ----------------*/
    var calculate = function(){
        // Fetching Input
        var input =  UICntrl.getInput();
        
        if(input.description != "" && !isNaN(input.value) && input.value !=0)
            {
        //console.log(input)
        var additem =  budgetCntrl.additem(input.type,input.description,input.value);  
        
        // adding element to UI
        UICntrl.addElement(additem, input.type);
        
        //Clear fields
        UICntrl.clearField();
        
        updateBudget();
                
        updatePercent();
                
                  
            }
    
    };
    
    // all the functions inside addEvent Listeners will have access 
    // to this event (name can change) object
    var cntrlDeleteItem = function(event){
        var itemId, splitID, type, ID;
        
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        //something should happen only if it has id
        if(itemId){
            splitID = itemId.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
        
        // Delete item from DataStructure
            budgetCntrl.deleteItem(type,ID);
        // Delete item from UI
            UICntrl.removeElement(itemId);
        // Update Budget
            updateBudget();
            
            updatePercent();
        }
    }
    

   return {
       init : function(){
           console.log('Event started');
           UICntrl.displayDate();
           UICntrl.displayBudget({
                bud: 0,
                percent: -1,
                totalinc: 0,
                totalexp: 0
           });
           setUpEventListeners();
       }
       
   }
        
    
    // pass these modules as a parameter else it wont give access to UICntrl 
})(budgetController,UIcontroller);

// to start the application we need to call init as it is inside IIFE it is private 
// but we have returned it so it can be accessed from outside
Controller.init();