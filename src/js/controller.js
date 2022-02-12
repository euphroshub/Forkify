// Imports
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';


const controlRecipes = async function() {
    try {
        const id = window.location.hash.slice(1);

        if (!id) return;
        recipeView.renderSpinner();

        // Loading recipe
        await model.loadRecipe(id);

        // Rendering recipe
        recipeView.render(model.state.recipe);

    }   catch (err) {
        recipeView.renderError();
    }
}

// Search results controler
const controlSearchResults = async function() {
    try {
        // Get search query
        const query = searchView.getQuery();
        if (!query) return;

        // Load search results
        await model.loadSearchResults(query);

        // Render results

    }   catch(err) {
        console.error(err);
    }
}

// Publisher-Subscriber pattern.
const init = function() {
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
}

init();