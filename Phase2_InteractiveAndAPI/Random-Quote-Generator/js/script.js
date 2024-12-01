// API URL and headers for API Ninjas
const apiUrl = "https://api.api-ninjas.com/v1/quotes?category=inspirational";


const apiKey = "ADD YOUR OWN API KEY HERE";


// Select elements
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const fetchQuoteButton = document.getElementById("fetchQuoteButton");
const requestCountElement = document.getElementById("requestCount");

// Max requests per day
const MAX_REQUESTS_PER_DAY = 40;

// Track requests in localStorage
function getRequestCount() {
    const today = new Date().toISOString().slice(0, 10); // Get today's date (YYYY-MM-DD)
    const storedData = JSON.parse(localStorage.getItem("quoteRequestCount")) || {};

    // Reset count if it's a new day
    if (storedData.date !== today) {
        storedData.date = today;
        storedData.count = 0;
        localStorage.setItem("quoteRequestCount", JSON.stringify(storedData));
    }

    return storedData;
}

function incrementRequestCount() {
    const storedData = getRequestCount();
    storedData.count++;
    localStorage.setItem("quoteRequestCount", JSON.stringify(storedData));
    return storedData.count;
}

// Update UI for remaining requests
function updateRequestCountUI() {
    const storedData = getRequestCount();
    const remainingRequests = MAX_REQUESTS_PER_DAY - storedData.count;
    requestCountElement.textContent = `Requests remaining today: ${remainingRequests}`;
    fetchQuoteButton.disabled = remainingRequests <= 0;
}

// Fetch and display a random quote
async function fetchQuote() {
    const storedData = getRequestCount();

    // Block API call if request limit is reached
    if (storedData.count >= MAX_REQUESTS_PER_DAY) {
        quoteText.textContent = "You have reached your daily request limit. Please try again tomorrow.";
        quoteAuthor.textContent = "";
        return;
    }

    try {
        // Fetch the quote from the API
        fetchQuoteButton.disabled = true;
        fetchQuoteButton.textContent = "Fetching...";
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "X-Api-Key": apiKey,
            },
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        // Update the DOM with the fetched quote
        quoteText.textContent = `"${data[0].quote}"`;
        quoteAuthor.textContent = data[0].author ? `- ${data[0].author}` : "- Unknown";

        // Increment request count
        incrementRequestCount();
        updateRequestCountUI();
    } catch (error) {
        console.error("Error fetching quote:", error);
        quoteText.textContent = "Oops! Unable to fetch a quote. Please try again later.";
        quoteAuthor.textContent = "";
    } finally {
        fetchQuoteButton.disabled = false;
        fetchQuoteButton.textContent = "Get Quote";
    }
}

// Initialize the app
updateRequestCountUI();
fetchQuoteButton.addEventListener("click", fetchQuote);
