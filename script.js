function search () {
    const keyword = document.getElementById("keyword").value;
    console.log(keyword);
    console.log(goodreadsApiKey)
    // Get input from user, get results from api using fetch
    const endpoint = 'https://www.goodreads.com/search/index.xml';
    const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
    const url = corsAnywhere + endpoint + "?" + "key=" + goodreadsApiKey + "&" + "q=" + keyword;
    
    fetch(url)    
    .then(function(response){
        console.log(response);
        return response.text();
    }) 
    .then(function(response){
        const parser = new DOMParser(); // creating a new object
        const parsedRes = parser.parseFromString(response, "text/xml"); //parsing respone and format of output
        const parsedJson = xmlToJson(parsedRes); //parsing xmlToJson object
        console.log(parsedJson);
    })
    
    // Display resultes on page as a list
}

