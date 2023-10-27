// Replace these values with your actual information
const accessToken = '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';
const databaseRepo = 'Thebullfighter9/Database';
const reviewsFile = 'reviews.json';

// Function to fetch reviews from the Database repository
async function fetchReviews() {
  try {
    const response = await fetch(`https://api.github.com/repos/${databaseRepo}/contents/${reviewsFile}`, {
      method: 'GET',
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    if (response.ok) {
      const reviewsData = await response.json();
      const reviewsContent = atob(reviewsData.content); // Decode base64 content

      // Parse the reviews content as JSON
      const reviews = JSON.parse(reviewsContent);

      // Now you can display the reviews on your website
      console.log('Fetched Reviews:', reviews);

      // Display reviews in your UI (modify this part as needed)
      // For example, you can loop through reviews and append them to a div.
      const reviewsContainer = document.getElementById('reviews-container');
      reviews.forEach((review) => {
        const reviewElement = document.createElement('div');
        reviewElement.textContent = `Name: ${review.name}, Description: ${review.description}, Stars: ${review.stars}`;
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
