const searchInput = document.querySelector("#office-search");
const filterButtons = document.querySelectorAll(".filter-button");
const officeCards = document.querySelectorAll(".office-card");
const resultCount = document.querySelector("#result-count");
const noResults = document.querySelector("#no-results");

let activeFilter = "all";

function updateDirectory() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  officeCards.forEach((card) => {
    const matchesCategory =
      activeFilter === "all" || card.dataset.category === activeFilter;
    const searchableText = `${card.dataset.search} ${card.textContent}`.toLowerCase();
    const matchesSearch = searchableText.includes(searchTerm);
    const isVisible = matchesCategory && matchesSearch;

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  resultCount.textContent = String(visibleCount);
  noResults.hidden = visibleCount > 0;
}

searchInput.addEventListener("input", updateDirectory);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    updateDirectory();
  });
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
});

updateDirectory();