const heroContainer = document.getElementById('hero-container');
const heroImg = document.getElementById('hero-img');
const dayTitle = document.getElementById('day-title');
const dayDescription = document.getElementById('day-description');

const apiUrl = `https://www.themealdb.com/api/json/v1/`;

async function fetchRandomRecipe() {
  try {
    const response = await fetch(`${apiUrl}1/random.php`);
    const data = await response.json();
    console.log(data);
    showDayRecipe(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call the function
fetchRandomRecipe();

showDayRecipe = (data) => {
  dayTitle.innerHTML = data.meals[0].strMeal;
  dayDescription.innerHTML = data.meals[0].strInstructions;
  heroImg.src = data.meals[0].strMealThumb;
};


