document.addEventListener("DOMContentLoaded", function () {
    const snacksByDay = {
        "Monday": {
            "Chips": [
                { "name": "N/A", "price": "N/A" },
                { "name": "N/A", "price": "N/A" }
            ],
            "Candy": [
                { "name": "N/A", "price": "N/A" },
                { "name": "N/A", "price": "N/A" }
            ],
            "Drinks": [
                { "name": "N/A", "price": "N/A" },
                { "name": "N/A", "price": "N/A" }
            ]
        },
        "Tuesday": {
            "Chips": [
                { "name": "N/A", "price": "N/A" },
                { "name": "N/A", "price": "N/A" }
            ],
            "Candy": [
                { "name": "N/A", "price": "N/A" },
                { "name": "N/A", "price": "N/A" }
            ],
            "Drinks": [
                { "name": "N/A", "price": "N/A" },
                { "name": "N/A", "price": "N/A" }
            ]
        },
        "Wednesday": {
            "Chips": [
                { "name": "N/A", "price": "N/A" },
                { "name": "N/A", "price": "N/A" }
            ],
            "Candy": [
                { "name": "N/A", "price": "N/A" },
                { "name": "N/A", "price": "N/A" }
            ],
            "Drinks": [
                { "name": "N/A", "price": "N/A" },
                { "name": "N/A", "price": "N/A" }
            ]
        },
        "Thursday": {
            "Chips": [
                { "name": "N/A", "price": "N/A" },
                { "name": "N/A", "price": "N/A" }
            ],
            "Candy": [
                { "name": "N/A", "price": "N/A" },
                { "name": "N/A", "price": "N/A" }
            ],
            "Drinks": [
                { "name": "N/A", "price": "N/A" },
                { "name": "N/A", "price": "N/A" }
            ]
        },
        "Friday": {
            "Chips": [
                { "name": "N/A", "price": "N/A" },
                { "name": "N/A", "price": "N/A" }
            ],
            "Candy": [
                { "name": "N/A", "price": "N/A" },
                { "name": "N/A", "price": "N/A" }
            ],
            "Drinks": [
                { "name": "N/A", "price": "N/A" },
                { "name": "N/A", "price": "N/A" }
            ]
        }
    };

    const daySelector = document.getElementById('day-selector');
    const categorySelector = document.getElementById('category-selector');
    const snacksContainer = document.getElementById('snacks-container');
    const searchInput = document.getElementById('search');
    const specialsList = document.getElementById('specials-list');
    const reviewsList = document.getElementById('reviews-list');

    function populateDaySelector() {
        daySelector.innerHTML = '';

        for (const day in snacksByDay) {
            const option = document.createElement('option');
            option.value = day;
            option.text = day;
            daySelector.appendChild(option);
        }
    }

    function populateCategorySelector(day) {
        categorySelector.innerHTML = '';

        if (snacksByDay[day]) {
            const categories = Object.keys(snacksByDay[day]);
            categories.forEach((category) => {
                const option = document.createElement('option');
                option.value = category;
                option.text = category;
                categorySelector.appendChild(option);
            });
        }
    }

    function displaySnacks() {
        const selectedDay = daySelector.value;
        const selectedCategory = categorySelector.value;
        const selectedText = searchInput.value.toLowerCase();

        if (selectedDay && selectedCategory) {
            const snacks = snacksByDay[selectedDay][selectedCategory];

            let snacksHTML = `<h2>Snacks for ${selectedDay} (${selectedCategory}):</h2>`;
            if (snacks) {
                snacksHTML += '<ul>';
                snacks.forEach((snack) => {
                    if (selectedText === '' || snack.name.toLowerCase().includes(selectedText)) {
                        snacksHTML += `<li>${snack.name} : $${snack.price}</li>`;
                    }
                });
                snacksHTML += '</ul>';
            } else {
                snacksHTML += '<p>No snacks available for this day and category.</p>';
            }

            snacksContainer.innerHTML = snacksHTML;
        }
    }

    function displaySpecials() {
        const selectedDay = daySelector.value;
        const specials = specialsByDay[selectedDay];

        let specialsHTML = '<h2>Daily Specials:</h2>';
        if (specials) {
            specialsHTML += '<ul>';
            specials.forEach((special) => {
                specialsHTML += `<li>${special.name} : $${special.price}</li>`;
            });
            specialsHTML += '</ul>';
        } else {
            specialsHTML += '<p>No specials available for this day.</p>';
        }

        specialsList.innerHTML = specialsHTML;
    }

    function displayReviews() {
        const selectedDay = daySelector.value;
        const selectedCategory = categorySelector.value;

        // Fetch and display user reviews for snacks in the selected category
        // Implement the reviews feature here

        let reviewsHTML = `<h2>Reviews for ${selectedDay} (${selectedCategory}):</h2>`;
        // Loop through fetched reviews and create HTML elements to display them

        reviewsList.innerHTML = reviewsHTML;
    }

    daySelector.addEventListener('change', () => {
        populateCategorySelector(daySelector.value);
        displaySnacks();
        displaySpecials();
        displayReviews();
    });

    categorySelector.addEventListener('change', () => {
        displaySnacks();
        displayReviews();
    });

    searchInput.addEventListener('input', () => {
        displaySnacks();
        displayReviews();
    });

    // Initialize the page with default data
    populateDaySelector();
    populateCategorySelector(daySelector.value);
    displaySnacks();
    displaySpecials();
    displayReviews();
});
