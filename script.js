const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.querySelector(".loader");

let apiQuotes = [];

//Loader

function load() {
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.className += " hidden";
    }, 2500);
  });
}

load();
//Show New Quote
function newQuote() {
  //Pick a random quote from array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // If Author field is blank replace it with 'Unknown'

  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determine styling (long quote or short quote)
  if (quote.text.length > 115) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
}

//Get Quotes From API

async function getQuotes() {
  //   loader();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    newQuote();
  }
}

//Tweet the quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
