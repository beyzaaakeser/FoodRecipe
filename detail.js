const detailImg = document.querySelector('.detail-img img');
const recipeName = document.querySelector('.detail-info h1');
const ingredientsList = document.querySelector('.recipe-information ul');
const instructions = document.querySelector('.recipe-information p');
const youtubeVideo = document.querySelector('.video p');
const sourceLink = document.querySelector('.source a');

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('id');

  if (recipeId) {
    await fetchRecipeDetails(recipeId);
  }
});

const fetchRecipeDetails = async (id) => {
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    showRecipeDetails(data.meals[0]);
  } catch (error) {
    console.error('Error fetching recipe details:', error);
  }
};

const showRecipeDetails = (meal) => {
  console.log(meal);

  detailImg.src = meal.strMealThumb;
  recipeName.textContent = meal.strMeal;
  instructions.textContent = meal.strInstructions;

  ingredientsList.innerHTML = '';
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient) {
      const listItem = document.createElement('li');
      listItem.textContent = `${measure} ${ingredient}`;
      ingredientsList.appendChild(listItem);
    }
  }

  if (meal.strYoutube) {
    const youtubeEmbedUrl = meal.strYoutube.replace('watch?v=', 'embed/');
    youtubeVideo.innerHTML = `<iframe class="iframeVideo" width="640" height="360" src="${youtubeEmbedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else {
    youtubeVideo.textContent = 'No video available';
  }

  if (meal.strSource) {
    sourceLink.innerHTML = `<a class="source-a" href="${meal.strSource}" target="_blank"> <i class='bx bx-link-alt'></i> Other Recipe Page </a>`;
  } else {
    sourceLink.textContent = 'No source available';
  }
};


