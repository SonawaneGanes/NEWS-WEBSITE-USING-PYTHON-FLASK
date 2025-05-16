function onNavItemClick(category) {
    fetchNewsByCategory(category);
}

function fetchNewsByCategory(category) {
    const API_KEY = '94da927230e54e5ca7800dfc16bd2190'; // Replace with actual API key
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            bindData(data.articles);
        })
        .catch(error => console.error("Error fetching news:", error));
        
// Toggle profile dropdown
function toggleProfileDropdown() {
    const dropdown = document.getElementById('profile-dropdown');
    dropdown.classList.toggle('visible');
    dropdown.classList.toggle('hidden');
}

// Optional: Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    const dropdown = document.getElementById('profile-dropdown');
    const icon = document.getElementById('profile-icon');

    if (dropdown && !dropdown.contains(event.target) && event.target !== icon) {
        dropdown.classList.remove('visible');
        dropdown.classList.add('hidden');
    }
});
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cardscontainer");
    cardsContainer.innerHTML = "";

function toggleProfileDropdown() {
    const dropdown = document.getElementById('profile-dropdown');
    dropdown.classList.toggle('hidden');
}

    const template = document.getElementById("template-news-card");

    articles.forEach(article => {
        const cardClone = template.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage || "https://via.placeholder.com/400x200";
    newsTitle.innerHTML = article.title || "No title";
    newsDesc.innerHTML = article.description || "No description";

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata"
    });
    newsSource.innerHTML = `${article.source.name || "Unknown"} · ${date}`;
}
