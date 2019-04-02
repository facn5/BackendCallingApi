var submitButton = document.getElementById("submitButton");
var inputFieldValue = document.getElementById("searchInput");
var outputSectionContainer0 = document.getElementsByClassName("outputSectionContainer")
var outputSectionContainer1 = document.getElementsByClassName("outputSectionContainer")

    submitButton.addEventListener("click", function(event) {
      event.preventDefault();

      myFetch( inputFieldValue.value );

      inputFieldValue.value = "";


});

function myFetch( value ) {

    fetch('/search?s=' + inputFieldValue.value)
     .then(
      (response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        response.json().then((data) => {
          data = JSON.parse(data)

           if( data.length > 4 )
           data = data.slice(0,4);

           var newElementContainer, newElementTitle, newElementYear, newElementImage;


           for( var i = 0; i < 4; i++ )
           {
             newElementContainer = document.createElement("div");
             newElementContainer.class = "item-container";
             newElementTitle = document.createElement("h3");
             newElementTitle.innerText = data[i]['Title'];
             newElementYear = document.createElement("p");
             newElementYear.innerText = data[i]['Year'];
             newElementImage = document.createElement("img");
             newElementImage.src = data[i]['Poster'];
             newElementImage.alt = "Movie Poster";
             newElementImage.id = data[i]['imdbID'];

             newElementContainer.appendChild(newElementTitle);
             newElementContainer.appendChild(newElementYear);
             newElementContainer.appendChild(newElementImage);
             if( i < 2)
             outputSectionContainer0.appendChild(newElementContainer);
             else
             outputSectionContainer1.appendChild(newElementContainer);

           }

        })
      }
    )
    .catch((err) => {
      console.log('Fetch Error :-S', err);
    });
}
