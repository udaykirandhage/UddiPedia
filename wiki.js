let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById('searchResults');
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResults(result) {
    //step 1
    let {
        link,
        title,
        description
    } = result;
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add('result-item');
    searchResultsEl.appendChild(resultItemEl);
    //step 2
    let titleEl = document.createElement('a');
    titleEl.href = link;
    titleEl.target = '_blank';
    titleEl.textContent = title;
    titleEl.classList.add('result-title');
    resultItemEl.appendChild(titleEl);

    //step 3
    let tileBreakEl = document.createElement('br');
    resultItemEl.appendChild(tileBreakEl);

    //Anchor url step 4 manandi

    let urlEl = document.createElement('a');
    urlEl.classList.add('result-url');
    urlEl.href = link;
    urlEl.target = '_blank';
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    // line break
    let lineBreakEl = document.createElement('br');
    resultItemEl.appendChild(lineBreakEl);

    // step 6 para Description 

    let descriptionEl = document.createElement('p');
    descriptionEl.classList.add('line-description');
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);





}

function displayResults(search_results) {
    //let result = search_results[1];
    spinnerEl.classList.add("d-none");
    for (let result of search_results) {
        createAndAppendSearchResults(result);
    }
}

function searchWiki(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = '';
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;

        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })

            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}
searchInputEl.addEventListener('keydown', searchWiki);