 //define variables
        let form = document.getElementsByClassName('form');
        let submitButton = document.getElementById('submitButton');
        window.onscroll = ()=>{
            if(window.pageYOffset >= menu.offsetTop)
                navbar.classList.add('sticky');
            else
                navbar.classList.remove('sticky');
        }

        //make the tab text perform a downward motion hover
        function elementHoverAnimation(item){
            let element = document.getElementById(item);
            let id = null;
            let frameIndex = 0;
            let ySpeed = 0;
            let r = Math.floor(Math.random()*255);
            let g = Math.floor(Math.random()*255);
            let b = Math.floor(Math.random()*255);
            let pos = element.style.marginTop;
            clearTimeout(id);
            id = setInterval(frame, 10);
            function frame(){
               if(frameIndex == 40){
                    clearInterval(id);
                    element.style.color = "rgb("+255+","+255+","+255+")";
                    return;
                }
                pos = ySpeed;
                ySpeed -= 0.2;
                if(frameIndex >= 20){
                    pos = ySpeed;
                    ySpeed += 0.2;
                }
                frameIndex++;
                element.style.color = "rgb("+r+","+g+","+b+")";
                //console.log("rgb("+r+","+g+","+b+")")
                element.style.marginTop = (pos* ySpeed )+ 'px';
            }
        }


        //form cannot process, we need to use prevent default to not submit anything
        function cancelsubmit(event){
            event.preventDefault();
        }

        function setVisibleInline(element, value){
            if(value)
                element.style.display = 'inline';
            else
                element.style.display = 'none';
        }

        //checks if the first character in the string is capitalized
        function checkCapitalInitial(str){
            if(str.length <= 0)
                return false;
            const chars = str.split('');
            if(chars[0] == chars[0].toUpperCase())
                return true;
            else
                return false;
        }

        //function to check if input contains only numbers
        function containsOnlyNumbers(input){
            if(/^\d+$/.test(input))
                return true;
            else
                return false;
        }

        //function to check if input contains only letters
        function containsOnlyLetters(input) {
            if(/^[a-zA-z]+$/.test(input))
               return true; 
            else
                return false;
        }

        //function used to test if a text field exceeds a certain number of words
        function exceedsMaxLength(str, max){
            const words = str.split(' ');
            console.log(words.length > 25);
            if(words.length > 25)
                return true;
            return false;
        }

        //clears message off of the screen
        function displayMsg(msg){
            let msgObject = document.getElementById(msg.getName());
            msgObject.innerHTML = msg.getMsg();
        }

        //shows message on screen
        function clearMsg(msg){
            let msgObject = document.getElementById(msg.getName());
            msgObject.innerHTML = "";
        }

        //each error message will be organized as an error object, for simplicity
        class errMsg{
            name;
            msg;
            value;

            constructor(name, msg){
                this.name = name;
                this.msg = msg;
                this.value = false;
            }
            getName(){return this.name;}
            getMsg(){return this.msg;}
            getValue(){return this.value;}
            setValue(value){this.value = value;}
        }

        //function validates all input fields and verifies that each input field is of correct specifications
        function formSubmission(){
            const firstName = document.getElementById('first-name');
            const lastName = document.getElementById('last-name');
            const id = document.getElementById('id');
            const description = document.getElementById('description');
            let errMsgContainer = document.getElementById('errorMsg-Container');
            let result = document.getElementById('result');
            /*List of class objects of type errMsg(String name,String msg,String value)*/
            let errMsgss = [new errMsg('first-name-Error','Error! First letter of first name must be capitalized...also must contain letters only!'),
                            new errMsg('last-name-Error','Error! First letter of last name must be capitalized...also must contain letters only!'),
                            new errMsg('id-Error','Error! ID must be at least 9 digits long!'),
                            new errMsg('description-Error','Error! Description must not exceed 25 words and must not be empty!'),
                            new errMsg('hours-work-Error','The value you entered is not a real number!')];
            //first clear all error messages before checking fields again            
            errMsgss.forEach(msg => {
                clearMsg(msg);
            });
            //first check first name
            if(!checkCapitalInitial(firstName.value) || !containsOnlyLetters(firstName.value)){
                errMsgContainer.style.display = 'inline';
                errMsgContainer.add
                displayMsg(errMsgss[0]);
                errMsgss[0].setValue(true);
            }
            //second check last name 
                //must have first letter capital and must only contain letters
            if(!checkCapitalInitial(lastName.value) || !containsOnlyLetters(lastName.value)){
                errMsgContainer.style.display = 'inline';
                displayMsg(errMsgss[1]);
                errMsgss[1].setValue(true);
            }
            //third check id
            if(id.value.toString().length < 9){
                errMsgContainer.style.display = 'inline';
                displayMsg(errMsgss[2]);
                errMsgss[2].setValue(true);
            }
            //fourth check description
            const exceedsLength = exceedsMaxLength(description.value, 25);
            if(exceedsLength || description.value == ""){
                errMsgContainer.style.display = 'inline';
                displayMsg(errMsgss[3])
                errMsgss[3].setValue(true);
            }
            //check if there is an errMsg that has been switched on
            errMsgss.forEach((msg)=>{
                if(msg.getValue())
                    displayMsg(msg);
            });
            //if we have not hit any errors, we will show GUI pop up
            let page = document.getElementById('main');
            const errExists = errMsgss.find(msg=>{
                if(msg.getValue())
                    return true;
            });
            console.log('errExists: ' + errExists);
            if(!errExists){
                errMsgss.forEach(msg => {
                        clearMsg(msg);
                });
                page.style.backgroundColor = "antiquewhite";
                setTimeout(()=>{
                    submitAlert(firstName.value, lastName.value, id.value, description.value);
                },100);
            }
            else
                page.style.backgroundColor = "yellow";
        }
        
        //function generateds alert on the window, if form is submitted
        function submitAlert(arg1, arg2, arg3, arg4){
            if((arg1 == null) || (arg2 == null) || (arg3.toString == null) || (arg4 == null))
                return;   
                //display GUI MSG
            const result = document.getElementById("result");
        }


        //function saves the result to the hoursWorkedThisWeek SPAN
        function saveValue(){
            let hoursLog = document.getElementById("hoursWorkedThisWeek");
            console.log(result.value)
            err = new errMsg('hours-work-Error','The value you entered is not a real number');
            let msg = document.getElementById(err.name);
            if(isNaN(result.value) || result.value == ""){
                //display the error to the user
                displayMsg(err);
                hoursLog.innerHTML = "Hours worked this week: " + userSavedValue; 
                //hoursLog.innerHTML = "Hours worked this week: " + result.value; 
                return false;
            }
            clearMsg(err);
            //we know this value is valid, we can keep going
            hoursLog.innerHTML = "Hours worked this week: " + result.value; 
            userSavedValue = result.value;
            return true;
        }

        //function checks if the user inputs a text in the result field.
            // Must have no letters and no characters other than numbers
        function validInputValue(){
            if (!containsOnlyNumbers(userInputValue)){
               //check if its an operator
               const operators = ['+','-','*','/'];
               for(let i = 0; i < operators.length; i++){
                    if(userInputValue == operators[i])
                        return true;
               }
               //not a number and not an operator
               return false;
            }
            //is a valid number
            return true;
        }


        
       