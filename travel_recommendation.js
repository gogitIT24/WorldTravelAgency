document.addEventListener('DOMContentLoaded', function() {
    let travelData = {};

    // Fetch travel data from JSON
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            travelData = data;
            console.log(travelData);  // Log to see if data is fetched correctly
        })
        .catch(error => console.error('Error fetching data:', error));

    // Event listener for search button
    document.querySelector('.input-container button').addEventListener('click', function() {
        searchDestinations(travelData);
    });
});

function searchDestinations(travelData) {
    const searchInput = document.querySelector('.search-bar input').value.toLowerCase();
    console.log(`Searching for: ${searchInput}`);
    displayResults(searchInput, travelData);
}

function displayResults(keyword, data) {
    // Clear previous results
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    // Define keywords for beaches, temples, and countries
    const keywords = {
        beaches: ['beach', 'beaches'],
        temples: ['temple', 'temples'],
        countries: ['country', 'countries']
    };

    // Determine category based on keyword
    let category;
    for (let key in keywords) {
        if (keywords[key].includes(keyword)) {
            category = key;
            break;
        }
    }

    if (category) {
        data[category].forEach(place => {
            if (keyword === 'countries' ? place.name.toLowerCase().includes(keyword) : true) {
                const result = document.createElement('div');
                result.innerHTML = `
                    <div class="result-item">
                        <img src="${place.imageUrl}" alt="${place.name}">
                        <div>
                            <h3>${place.name}</h3>
                            <p>${place.description}</p>
                            <button onclick="visitDestination('${place.name}')">Visit</button>
                        </div>
                    </div>
                `;
                resultsContainer.appendChild(result);
            }
        });
    }
}

function visitDestination(placeName) {
    console.log(`Visit initiated for: ${placeName}`);
    // Further implementation for visiting a destination
}

function clearSearch() {
    document.querySelector('.search-bar input').value = '';
    document.getElementById('results').innerHTML = '';
    console.log("Search cleared");
}

function bookNow() {
    console.log("Booking initiated");
    // Implement booking logic
}

// Optional: Display the actual time in the location
function displayTime(timezone, elementId) {
    const options = { timeZone: timezone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const localTime = new Date().toLocaleTimeString('en-US', options);
    document.getElementById(elementId).innerText = `Current Local Time (${timezone}): ${localTime}`;
}
