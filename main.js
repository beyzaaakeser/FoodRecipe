const BASE_URL = ` https://api.spoonacular.com`;

// Your Spoonacular API key
const apiKey = 'bde2838207c74c7e8dd13405aab5a53f';

// URL for the API request
// const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1`;
// const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=recipe&number=20`;
const apiUrl = `https://api.spoonacular.com/recipes/random?number=50&apiKey=${apiKey}`;

// Function to fetch data from Spoonacular API
async function fetchRecipe() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call the function
fetchRecipe();
