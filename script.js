function search () {  //calling API and searching data
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
        console.log(parsedJson); // XML to JSON object 
        
        displayResults(parsedJson); //passing data to another function
        
    })  
    
// Display resultes on page as a list
function displayResults(responseObj){
    // console.log("calling inside displayResults", responseObj);
    const works = responseObj.GoodreadsResponse.search.results.work; // how to get to the work array
    document.getElementById("result").innerHTML = "";
    
    works.forEach(function(work) {
        // console.log(work);
        const author = work.best_book.author.name["#text"];
        const title = work.best_book.title["#text"];
        const imgUrl = work.best_book.image_url["#text"];
        console.log(title, author, imgUrl);
        
        const myListItem = document.createElement("li");
        const image = document.createElement("img");
        image.setAttribute("src", imgUrl);
        
        myListItem.innerHTML = title + "by" + author;
        myListItem.appendChild(image);
        document.getElementById("result").appendChild(myListItem);
        
    })
    }
    
}

    // const myList = document.createElement("li");
    // myList.innerHTML = "item 1"
    // document.getElementById("result").appendChild(myList);
    // document.getElementById("results").innerHTML = "<li>item1</li><li>item2</li>";
    