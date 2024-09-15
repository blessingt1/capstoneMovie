//creating variagles
const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=dfaf87e8e31b545f8eec4ba9b8e62943&page=1';//link of where the api is accessed from
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';//path to the image of every movie
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=dfaf87e8e31b545f8eec4ba9b8e62943&query=";//how we are going to search and get a response from the api

//gettintg section from our html
const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");//getting the query


returnMovies(APILINK);//the link we want the function to fetch from 
//return movies function, to return movies after the user performa a search
function returnMovies(url){
    fetch(url).then(res => res.json())
    .then(function(data){
                console.log(data.results);
                data.results.forEach(element => {
                    //creating the entire movie card for each movie 
                    const div_card = document.createElement('div');//creating a new div element in our html and storing the new constant div
                    div_card.setAttribute('class', 'card');

                    const div_row = document.createElement('div');//creating a new div element in our html and storing the new constant div
                    div_row.setAttribute('class', 'row');
                    
                    const div_column = document.createElement('div');//creating a new div element in our html and storing the new constant div
                    div_column.setAttribute('class', 'column');

                    const image = document.createElement('img');//creating a new img element in our html and storing the new constant img
                    image.setAttribute('class', 'thumbnail');
                    image.setAttribute('id', 'image');

                    const title = document.createElement('h3');//creating a new h3 element in our html and storing the new constant h3
                    title.setAttribute('id', 'title');

                    const center = document.createElement('center');//creating a new center element in our html and storing the new constant center
                
                    title.innerHTML = `${element.title}`;//returns movie name as the title
                    image.src = IMG_PATH + element.poster_path;//returns the link to the image as the poster path
                    

                    //adding an element under another element as structured in our html
                    center.appendChild(image);
                    div_card.appendChild(center);
                    div_card.appendChild(title);
                    div_column.appendChild(div_card);
                    div_row.appendChild(div_column);
            
                    main.appendChild(div_row);
                });
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';


    const searchItem = search.value;

    //showing the result and clearing what was on the screen before the user searched
    if(searchItem)
    {
        returnMovies(SEARCHAPI + searchItem);
        search.value = clear;//or search.value ="";
    }
});