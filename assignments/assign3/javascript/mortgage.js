    //********************************************************************************//
    //* Name :                                                                       *//
    //* zenit login : int222_161                                                     *//
    //********************************************************************************//
    //********************************************************************************//
    //*   Do not modify any statements in detailPaymentCalculation function          *//
    //********************************************************************************//

function detailPaymentCalculation(mortAmount,mortDownPayment,mortRate,mortAmortization) {

    //********************************************************************************//
    //*   This function calculates the monthly payment based on the following:       *//
    //*                                                                              *//
    //*               M = P [ i(1 + i)n ] / [ (1 +  i)n - 1]                         *//
    //*                                                                              *//
    //*   Note: This function also updates the payment amount on the form            *//
    //********************************************************************************//
     var paymentError = "";
     var v = mortAmount * 1;
     var d = mortDownPayment * 1;
     var i = mortRate * 1;
     var y = mortAmortization * 1;
     var a = v - d;
         i = i/100/12;
         n = y * 12;
     var f = Math.pow((1+i),n);

     var p = (a * ((i*f)/(f-1))).toFixed(2);

     if (p=="NaN" || p=="Infinity") {
         document.forms[0].payment.value = "";
     }
     else {
           document.forms[0].payment.value = p;
     }

} // End of detailPaymentCalculation function


function calculatePayment()
{   

    //********************************************************************************//
    //*   You will need to call the functions that validate the following:           *//
    //********************************************************************************//
    //*        (1)              (2)              (3)             (4)                 *//
    //********************************************************************************//
    //*   Property value  -  Down payment  -  Interest rate -  Amortization          *//
    //********************************************************************************//
    //*   If there are no errors, then call                                          *//
    //*                                                                              *//
    //*      detailPaymentCalculation(...., ......, ......, ......);                 *//
    //*                                                                              *//
    //*   and make sure to pass the four values in the order shown above.            *//
    //*                                                                              *//
    //********************************************************************************//
    //*   If there are errors, present the client the following message in the       *//
    //*   reserved area on the form:                                                 *//
    //*                                                                              *//
    //*   Please complete the form first and then click on Calculate Monthly Payment *//
    //*                                                                              *//
    //********************************************************************************//

	formValidation();
	
} // End of calculatePayment function



function formValidation()
{

    //***************************************************************************************//
    //*                                                                                     *//
    //* This function calls the different functions to validate all required fields         *//
    //*                                                                                     *//
    //* Once you have called and validated all field, determine if any error(s)             *//
    //*  have been encountered                                                              *//
    //*                                                                                     *//
    //* If any of the required fields are in error:                                         *//
    //*                                                                                     *//
    //*    present the client with a list of all the errors in reserved area                *//
    //*         on the form and                                                             *//
    //*          don't submit the form to the CGI program in order to allow the             *//
    //*          client to correct the fields in error                                      *//
    //*                                                                                     *//
    //*    Error messages should be meaningful and reflect the exact error condition.       *//
    //*                                                                                     *//
    //*    Make sure to return false                                                        *//
    //*                                                                                     *//
    //* Otherwise (if there are no errors)                                                  *//
    //*                                                                                     *//
    //*    Recalculate the monthly payment by calling                                       *//
    //*      detailPaymentCalculation(mortAmount,mortDownPayment,mortRate,mortAmortization) *//
    //*                                                                                     *//
    //*    Change the 1st. character in the field called client to upper case               *//
    //*                                                                                     *//
    //*    Change the initial value in the field called jsActive from N to Y                *//
    //*                                                                                     *//
    //*    Make sure to return true in order for the form to be submitted to the CGI        *//
    //*                                                                                     *//
    //***************************************************************************************//

	var errMsg = "";
	document.getElementById('errors').innerHTML = "";
	
	// validate all fields and set error message
	errMsg += checkUserId(errMsg) + checkClient(errMsg) + checkPropValue(errMsg);
	
	if(errMsg != "")
		document.getElementById('errors').innerHTML = errMsg;

} // End of completeFormValidation

// validates client ID
function checkUserId(errMsg)
{
	var userId = document.mortgage.userId.value;
	
	// check that all 10 values are present
	if(userId.length == 10)
	{
		// check if 5th value is a hyphen
		if(userId.charAt(4) == '-')
		{
			var i, sum1 = 0, sum2 = 0;
			
			// check if first 4 characters are numeric
			for(i = 0; i < 4; i++)
			{
				// break the loop if is not a number
				if(isNaN(userId.charAt(i)))
					break;
				// else add it to the sum
				else
					sum1 += userId.charAt(i) * 1;
			}
			
			// check if loop completed
			if(i == 4)
			{
				// check if last 5 characters are numeric
				for(i = 5; i < userId.length; i++)
				{
					// break the loop if is not a number
					if(isNaN(userId.charAt(i)))
						break;
					// else add it to the sum
					else
						sum2 += userId.charAt(i) * 1;
				}
				
				// check if loop completed
				if(i == userId.length)
				{
					// check if sum1 and sum2 are greater than zero
					if(sum1 > 0 && sum2 > 0)
					{
						// check if sum2 is 2 more than double sum1
						if(sum2 != (sum1 * 2) + 2)
							errMsg += "<p>The sum of last 5 numbers is not double plus 2 of sum of first 4 numbers.</p>";
					}
					else
						errMsg += "<p>The sum of the first 4 numbers or last 5 numbers is not greater than zero.</p>";
				}
				else
					errMsg += "<p>One of the last 5 characters is not numeric.</p>";
			}
			else
				errMsg += "<p>One of the first 4 characters is not numeric.</p>";
		}
		else
			errMsg += "<p>The 5th character of user ID must be a hyphen(-).</p>";
	}
	else
		errMsg += "<p>The user ID must be 10 characters long.</p>";
	
	return errMsg;
}

// validates client name
function checkClient(errMsg)
{
	var client = document.mortgage.client.value;
	
	// check if a value exists
	if(client)
	{
		/* RegEx use not allowed in checking for this assignment so RIP these two...
		// check if value is alphabetic
		if(client.match(/^['a-zA-Z]+$/))	// checks if contains ', a-z, or A-Z -- ^ checks start of text, + matches more of the preceding characters, and $ checks the end of text
		{	
			// check if first 3 letters are alphabetical
			if(client.charAt(0).match(/^[a-zA-Z]+$/) != null && client.charAt(1).match(/^[a-zA-Z]+$/) != null && client.charAt(2).match(/^[a-zA-Z]+$/) != null)
			{
		*/
		
		var x;
		
		// check all letters for alphabetic characters or apostrophe
		for(x = 0; x < client.length; x++)
		{
			var topCap = 'A'.charCodeAt(0), bottomCap = 'Z'.charCodeAt(0), topLow = 'a'.charCodeAt(0), bottomLow = 'z'.charCodeAt(0);
			var c = client.charCodeAt(x);
		
			if((c <= bottomCap && c >= topCap) || (c <= bottomLow && c >= topLow) || client.charAt(x) == '\'')
				continue;
			else
				break;
		}
		
		// check if loop completed
		if(x == client.length)
		{
			// check first 3 letters for alphabetic characters
			for(x = 0; x < 4; x++)
			{
				var topCap = 'A'.charCodeAt(0), bottomCap = 'Z'.charCodeAt(0), topLow = 'a'.charCodeAt(0), bottomLow = 'z'.charCodeAt(0);
				var c = client.charCodeAt(x);
		
				if((c <= bottomCap && c >= topCap) || (c <= bottomLow && c >= topLow))
					continue;
				else
					break;
			}
			
			// check if loop compeleted
			if(x == 4)
			{
				// check if name contains apostrophe at beginning or end
				if(client.charAt(0) != '\'' && client.charAt(client.length - 1) != '\'')	// check for first letter doesn't really ever fire since first letter has to be alphabetic with last check...
				{
					var i, aposCount = 0, invalidApos = false;
				
					// check apostrophe count
					for(i = 0; i < client.length; i++)
					{
						if(client.charAt(i) == '\'')
							aposCount++;
					}
			
					// check if there are multiple apostrophes
					if(aposCount > 1)
						errMsg += "<p>Name can only include one apostrophe.</p>";
				}
				else
					errMsg += "<p>Name can not have an apostrophe as the first or last letter.</p>";
			}
			else
				errMsg += "<p>First 3 characters of name must be alphabetical.</p>";
		}
		else
			errMsg += "<p>Name can only contain alphabetical characters and one apostrophe (optional).</p>";
	}
	else
		errMsg += "<p>You must put a value for client name.</p>";
	
	return errMsg;
}

// validates property value
function checkPropValue(errMsg)
{
	var propValue = document.mortgage.propValue.value;
	
	// check if contains a value
	if(propValue)
	{
		// check if value is numeric
		if(!(isNaN(propValue)))
		{
			// check if value is a positive whole number
			if((propValue > 0) && (propValue % 1 == 0))
			{
				// check if value is at least 65,000 more than down payment
				if(propValue < document.mortgage.downPay.value * 1 + 65000)
					errMsg += "<p>Property value must be at least 65,000 more than down payment.</p>";
			}
			else
				errMsg += "<p>Property value must be a positive whole number.</p>";
		}
		else
			errMsg += "<p>Property value must be numeric.</p>";
	}
	else
		errMsg += "<p>You must enter a value for the property.</p>";
	
	return errMsg;
}