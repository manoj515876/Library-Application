let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppend(result) {

    let booksResults = document.createElement("h1");
    booksResults.textContent = null;
    booksResults.style.textAlign = "center"
    searchResultsEl.appendChild(booksResults)

    if (result === "") {
        booksResults.textContent = "No results found"
    } else {

        let {
            imageLink,
            author
        } = result



        let imageEl = document.createElement("img")
        imageEl.src = imageLink;
        searchResultsEl.appendChild(imageEl)

        let name = document.createElement("p")
        name.textContent = author;
        searchResultsEl.appendChild(name)
    }



}



function displayResult(searchResult) {
    spinnerEl.classList.toggle("d-none")
    for (let result of searchResult)
        createAndAppend(result)
}

function search(Event) {
    if (Event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none")
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputEl.value;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                console.log()
                displayResult(search_results)
            })
    }
}

searchInputEl.addEventListener("keydown", search)