
// URL of the Python server that will handle reviews
const serverUrl = 'http://localhost:8000';

// Function to fetch reviews from the Python server
async function fetchReviews() {
  try {
    const response = await fetch(`${serverUrl}/api/reviews`, {
      method: 'GET',
    });

    if (response.ok) {
      const reviews = await response.json();

      // Now you can display the reviews on your website
      console.log('Fetched Reviews:', reviews);

      // Display reviews in your UI (modify this part as needed)
      const reviewsContainer = document.getElementById('reviews-container');
      reviews.forEach((review) => {
        const reviewElement = document.createElement('div');
        reviewElement.textContent = `Name: ${review.name}, Description: ${review.description}, Rating: ${review.rating}`;
        reviewsContainer.appendChild(reviewElement);
      });
    } else {
      console.error('Failed to fetch reviews. Response:', response);
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
}

// Call the function to fetch and display reviews
fetchReviews();

// Add an event listener to handle redirection to the review page
document.addEventListener("DOMContentLoaded", function () {
  const reviewsLink = document.querySelector('a[href="reviews.html"]');
  reviewsLink.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = 'reviews.html';
  });
});
