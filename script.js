// Get all the keys from document
var num = document.querySelectorAll('#calculadora span');
var operadores = ['+', '-', 'x', '÷'];
var decimal = false;

// Add onclick event to all the keys and perform operations
for(var i = 0; i < num.length; i++) {
	num[i].onclick = function(e) {
		// Get the input and button values
		var input = document.querySelector('.display');
		var inputVal = input.innerHTML;
		var btnValor = this.innerHTML;
		
		// Now, just append the key values (btnValue) to the input string and finally use javascript's eval function to get the result
		// If clear key is pressed, erase everything
		if(btnValor == 'C') {
			input.innerHTML = '';
			decimal = false;
		}
		
		// If eval key is pressed, calculate and display the result
		else if(btnValor == '=') {
			var ecuacion = inputVal;
			var lastChar = ecuacion[ecuacion.length - 1];
			
			// Replace all instances of x and ÷ with * and / respectively. This can be done easily using regex and the 'g' tag which will replace all instances of the matched character/substring
			ecuacion = ecuacion.replace(/x/g, '*').replace(/÷/g, '/');
			
			// Final thing left to do is checking the last character of the equation. If it's an operator or a decimal, remove it
			if(operadores.indexOf(lastChar) > -1 || lastChar == '.')
            ecuacion = ecuacion.replace(/.$/, '');
			
			if(ecuacion)
				input.innerHTML = eval(ecuacion);
				
                decimal = false;
		}
		
		// Basic functionality of the calculator is complete. But there are some problems like 
		// 1. No two operators should be added consecutively.
		// 2. The equation shouldn't start from an operator except minus
		// 3. not more than 1 decimal should be there in a number
		
		// We'll fix these issues using some simple checks
		
		// indexOf works only in IE9+
		else if(operadores.indexOf(btnValor) > -1) {
			// Operator is clicked
			// Get the last character from the equation
			var lastChar = inputVal[inputVal.length - 1];
			
			// Only add operator if input is not empty and there is no operator at the last
			if(inputVal != '' && operadores.indexOf(lastChar) == -1) 
				input.innerHTML += btnValor;
			
			// Allow minus if the string is empty
			else if(inputVal == '' && btnValor == '-') 
				input.innerHTML += btnValor;
			
			// Replace the last operator (if exists) with the newly pressed operator
			if(operadores.indexOf(lastChar) > -1 && inputVal.length > 1) {
				// Here, '.' matches any character while $ denotes the end of string, so anything (will be an operator in this case) at the end of string will get replaced by new operator
				input.innerHTML = inputVal.replace(/.$/, btnValor);
			}
			
			decimal =false;
		}
		
		// Now only the decimal problem is left. We can solve it easily using a flag 'decimalAdded' which we'll set once the decimal is added and prevent more decimals to be added once it's set. It will be reset when an operator, eval or clear key is pressed.
		else if(btnValor == '.') {
			if(!decimal) {
				input.innerHTML += btnValor;
				decimal = true;
			}
		}
		
		// if any other key is pressed, just append it
		else {
			input.innerHTML += btnValor;
		}
		
		// prevent page jumps
		e.preventDefault();
	} 
}