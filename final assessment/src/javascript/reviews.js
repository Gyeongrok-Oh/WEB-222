// reviews.js

// Function to generate the star rating string
function getStarRating(rating) {
  const filledStar = "\u2605"; // Unicode character for filled star (★)
  const emptyStar = "\u2606"; // Unicode character for empty star (☆)

  let starRating = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starRating += filledStar; // Add a filled star for each rating point
    } else {
      starRating += emptyStar; // Add an empty star for the remaining points
    }
  }
  return starRating;
}

// Function to generate review cards
function generateReviewCards() {
  const reviewsContainer = document.getElementById("reviews-container");
  reviewsContainer.innerHTML = ""; // Clear the reviews container before generating new cards

  // Loop through the reviewData and create a card for each review
  // eslint-disable-next-line no-undef
  reviewData.forEach((review) => {
    const reviewCard = document.createElement("div");
    reviewCard.classList.add("review-card");

    const reviewTitle = document.createElement("div");
    reviewTitle.classList.add("review-title");
    reviewTitle.textContent = `Name: ${review.name}`;

    const reviewDate = document.createElement("div");
    reviewDate.classList.add("review-date");
    reviewDate.textContent = `Date: ${review.date}`;

    const reviewRating = document.createElement("div");
    reviewRating.classList.add("review-rating");
    const starRating = getStarRating(review.rating); // Generate star rating
    reviewRating.textContent = `Rating: ${starRating}`;

    const reviewContent = document.createElement("div");
    reviewContent.classList.add("review-content");
    reviewContent.textContent = review.reviewText;

    reviewCard.appendChild(reviewTitle);
    reviewCard.appendChild(reviewDate);
    reviewCard.appendChild(reviewRating);
    reviewCard.appendChild(reviewContent);

    reviewsContainer.appendChild(reviewCard);
  });
}

// Function to add a new review to reviewData
function addNewReview(event) {
  event.preventDefault();

  // Get form input values
  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  const ratingInput = document.getElementById("rating").value;
  const reviewText = document.getElementById("reviewText").value;

  // Validate the ratingInput
  const rating = parseInt(ratingInput);
  if (isNaN(rating) || rating < 1 || rating > 5) {
    const errorMessage = "Please enter a valid rating between 1 and 5.";
    const errorDisplay = document.getElementById("error-message");
    errorDisplay.textContent = errorMessage;
    return;
  }

  // Create a new review object
  const newReview = {
    name: name,
    date: date,
    rating: rating,
    reviewText: reviewText
  };

  // Add the new review to the reviewData array
  // eslint-disable-next-line no-undef
  reviewData.push(newReview);

  // Regenerate all review cards
  generateReviewCards();

  // Reset the form after adding a new review
  document.getElementById("add-review-form").reset();

  const errorDisplay = document.getElementById("error-message");
  errorDisplay.textContent = "";
}

// Call the function to generate review cards when the page loads
document.addEventListener("DOMContentLoaded", () => {
  generateReviewCards();

  // Attach form submission event listener
  document.getElementById("add-review-form").addEventListener("submit", addNewReview);
});
