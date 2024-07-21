const heroContainer = document.getElementById('hero-container');
const heroImg = document.getElementById('hero-img');
const dayTitle = document.getElementById('day-title');
const dayDescription = document.getElementById('day-description');
const dayCountry = document.getElementById('day-country');
const dayCategory = document.getElementById('day-category');
const dayType = document.getElementById('day-type');
const ingredients = document.getElementById('ingredients');
const instructions = document.getElementById('instructions');
const ingredientsInfo = document.getElementById('ingredients-info');

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

export const showDayRecipe = (data) => {

  let id = data.meals[0].idMeal;
  instructions.setAttribute('data-showId', id);
  dayTitle.innerHTML = data.meals[0].strMeal;
  dayDescription.innerHTML = data.meals[0].strInstructions;
  heroImg.src = data.meals[0].strMealThumb;
  dayCountry.innerHTML = data.meals[0].strArea;
  dayCategory.innerHTML = data.meals[0].strCategory;
  dayType.innerHTML = data.meals[0].strTags;

  ingredients.addEventListener('click', () => {
    dayDescription.parentElement.classList = 'd-none';
    ingredientsInfo.classList.remove('d-none');
    // Check if the ul already exists
    let ulEl = document.querySelector('#ingredients-list');
    if (!ulEl) {
      ulEl = document.createElement('ul');
      ulEl.id = 'ingredients-list'; // Adding an ID to identify it

      for (let i = 1; i <= 20; i++) {
        const ingredient = data.meals[0][`strIngredient${i}`];
        const measure = data.meals[0][`strMeasure${i}`];

        if (ingredient !== null && ingredient !== '') {
          const listItem = document.createElement('li');
          listItem.textContent = measure + ' ' + ingredient;
          ulEl.appendChild(listItem);
        }
      }

      ingredientsInfo.appendChild(ulEl);
    } else {
      // If ul already exists, just make sure it is visible
      ulEl.style.display = 'block';
    }
  });
};

instructions.addEventListener('click', (e) => {
  const val = e.target.closest('.instructions');
  const showId = val.dataset.showid;
  // location.href = `detail.html?id=${showId}`;
  window.open(`detail.html?id=${showId}`, '_blank');
});


// Scrollreveal Animation
const animate = ScrollReveal({
  origin: 'top',
  distance: '70px',
  duration: '2000',
  delay: '300',
});

animate.reveal('.hero-container');
