var httpRequest;

function makeRequest() 
{
	var url = 'https://zenit.senecac.on.ca/~emile.ohan/int222/labs/lab06/courses.json'; 

	// make an HTTP request object
	if (window.XMLHttpRequest) // Mozilla, Safari, ...
	{
		httpRequest = new XMLHttpRequest(); 
	} 
	else if (window.ActiveXObject) // IE
	{
		try 
		{
			httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} 
		catch (e) 
		{
			try 
			{
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} 
			catch (e) {}
		}
	}
    
	if (!httpRequest) 
	{
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
        
	// register a request listener
	httpRequest.onreadystatechange = showContents;
	
	// make the HTTP request 
	httpRequest.open('GET', url, true);
	httpRequest.send();
}
    
// the function that handles the server response
function showContents() 
{
	//  check for response state
    //  0      The request is not initialized
    //  1      The request has been set up
    //  2      The request has been sent
    //  3      The request is in process
    //  4      The request is complete

    if (httpRequest.readyState === 4) 
	{
		// check the respone code
        if (httpRequest.status === 200) // The request has succeeded
		{ 
        	// Javascript function JSON.parse to parse JSON data
			var jsArray = JSON.parse(httpRequest.responseText);

			// create a table
			var table = "";
			table += "<table class='table-1'>";
			table += "<caption>School of ICT | Faculty of Applied Science and Enginnering Technology</caption>";
			
			// headers
			table += "<tr>";
			table += "<th>Program Area</th>";
			table += "<th>Semester</th>";
			table += "<th colspan=5>Courses</th>";
			table += "</tr>";

			// details
			for(var x = 0; x < jsArray.length; x++)
			{
				table += "<tr>";
				table += "<td>" + jsArray[x].name + "</td>";
				table += "<td>" + jsArray[x].semester + "</td>";
				for(var i = 0; i < jsArray[x].courses.length; i++)
					table += "<td>" + jsArray[x].courses[i] + "</td>";
				table += "</tr>";
			}
			
			table += "</table>";

			// show table
			document.getElementById("data").innerHTML = table;
		} 
		else 
		{
			alert('There was a problem with the request.');
		}
	}
}