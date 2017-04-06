/**
 * Created by nanjain on 3/31/17.
 */
var CRIMSON = CRIMSON || {};
(function () {


})();

// Get the <datalist> and <input> elements.
var dataList = document.getElementById('json-datalist');
var input = document.getElementById('ajax');

// Create a new XMLHttpRequest.
var request = new XMLHttpRequest();

// Handle state changes for the request.
request.onreadystatechange = function (response) {
    if (request.readyState === 4) {
        if (request.status === 200) {
            // Parse the JSON
            var jsonOptions = JSON.parse(request.responseText);

            // Loop over the JSON array.
            jsonOptions.forEach(function (item) {
                // Create a new <option> element.
                var option = document.createElement('option');
                // Set the value using the item in the JSON array.
                option.value = item;
                // Add the <option> element to the <datalist>.
                dataList.appendChild(option);
            });

            // Update the placeholder text.
            input.placeholder = "search";
        } else {
            // An error occured :(
            input.placeholder = "Couldn't load serieslist options :(";
        }
    }
};

// Update the placeholder text.
input.placeholder = "Loading options...";

// Set up and make the request.
request.open('GET', 'http://10.78.150.59:8081/listSeries', true);
request.send();


// $(document).ready(function() {
//       $('#ajax').keyboard({
     
//      preventPaste : true,  
//      autoAccept : true
//     }).addTyping();  
      
// });


/*$(document).ready(function () {
    
    $("#suggest").autocomplete({
        delay: 100,
        source: function (request, response) {
            
            // Suggest URL
            var suggestURL = "http://localhost:8081/listSeries";
            //suggestURL = suggestURL.replace('%QUERY', request.term);
            
            // JSONP Request
            $.ajax({
                method: 'GET',
                dataType: 'jsonp',
                //data: { get_param: 'value' },
                jsonpCallback: 'jsonCallback',
                url: suggestURL
            })
            .success(function(data){
                var list = data;
                alert(list);
                alert(JSON.stringify(data));
                response(data);
            });
        }
    });

});*/