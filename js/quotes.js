// Final project, part 7: fetch a quote on page load and on button clicks.
(function initializeQuotes() {
    const button = document.getElementById("new-quote");
    const status = document.getElementById("quote-status");
    const result = document.getElementById("quote-result");
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");

    async function loadQuote() {
        if (button.disabled) return;
        button.disabled = true;
        button.textContent = "Loading...";
        status.textContent = "Loading a quote...";
        result.hidden = true;

        try {
            const response = await fetch("https://dummyjson.com/quotes/random", {
                cache: "no-store",
                signal: AbortSignal.timeout(10000)
            });
            if (!response.ok) throw new Error("Could not fetch a quote.");

            const data = await response.json();
            if (typeof data.quote !== "string" || typeof data.author !== "string"
                || !data.quote.trim() || !data.author.trim()) {
                throw new Error("The quote is missing text or an author.");
            }

            // Display API content as text so it cannot insert HTML into the page.
            quoteText.textContent = data.quote;
            quoteAuthor.textContent = "- " + data.author;
            result.hidden = false;
            status.textContent = "";
        } catch (error) {
            status.textContent = "Could not load a quote. Check your connection and try again.";
        } finally {
            button.disabled = false;
            button.textContent = "New quote";
        }
    }

    button.addEventListener("click", loadQuote);
    loadQuote();
})();
