'use strict'

// const apiKey =  "GkekCg3gIab3elUjYTtJOP5QeEssORTgzm44cu95";
// const searchUrl =  "https://api.nps.gov/api/v1/parks?parkCode=acad";

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function displayResults(responseJson) {
    console.log(responseJson);
    $("#js-error").empty();
    $("#results-list").empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $("#results-list").append(
            `<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
            <p>${responseJson.data[i].description}</p>
            </li>`
        )};
    $("results").removeClass("hidden");
};

function getParkInfo(searchUrl, searchTerm, maxResults, apiKey) {
    const params = {
        limit: maxResults,
        stateCode: searchTerm
        }

    const queryString = formatQueryParams(params)
    const url = searchUrl + "?" + queryString + "&api_key=" + apiKey;
    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $("#js-error-message").text(`Something isn't right: ${err.message}`);
        });
}

function watchForm() {
    $("form").submit(event => {
        event.preventDefault();
        const searchUrl = "https://api.nps.gov/api/v1/parks"
        const searchTerm = $("#js-search-term").val();
        const maxResults = $("#js-max-results").val();
        const apiKey = "GkekCg3gIab3elUjYTtJOP5QeEssORTgzm44cu95"
        getParkInfo(searchUrl, searchTerm, maxResults, apiKey);
    });
}

$(watchForm);