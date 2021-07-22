const apiKey = 'e372a95c787543b6b3e72b26088f5b78'






// PRODUCT RELATED ROUTES. ALLOWS USERS TO VIEW DIFFERENT PRODUCTS AND LEARN ABOUT THEM

const productRoute = `https://api.spoonacular.com/food/products/search?apiKey=${apiKey}&query=`

const specificProductInfo = `https://api.spoonacular.com/food/products/`






// INGREDIENT RELATED ROUTES THAT ALLOW USERS TO SEARCH FOR SPECIFIC INGREDIENTS, CONVERT AMOUNTS, LOOK FOR INGREDIENT
// SUBSTITUTIONS AND COMPUTE THE GLYCEMIC LOAD

const ingredientSearch = `https://api.spoonacular.com/food/ingredients/search?apiKey=${apiKey}&query=`

const ingredientInformation = `https://api.spoonacular.com/food/ingredients`

const ingredientSubstitute = `https://api.spoonacular.com/food/ingredients/substitutes?apiKey=${apiKey}&ingredientName=`







// MENU RELATED ROUTES THAT ALLOW THE USER TO LOOK UP SPECIFIC TYPES OF FOOD AND BE RETUREND A LIST OF RESTURANTS AND THE FOOD THAT MATCHES
// THE USER WILL ALSO BE ABLE TO SEE SPECIFCS REGARDING A TYPE OF FOOD AND WHERE IT IS FROM

const menuSearch = `https://api.spoonacular.com/food/menuItems/search?apiKey=${apiKey}&query=`

const menuFoodInfo = `https://api.spoonacular.com/food/menuItems/`






// RECIPE RELATED ROUTES THAT ALLOW THE USER TO SEARCH FOR DIFFERENT TYPES OF FOOD RECIPES, GET RECIPE INFROMATION
// ANALYZA THE RECIPE, GET INSTRUCTIONS ABOUT THE RECIPE, AND A BREIF SUMMARY

const recipeSearch = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=`

const recipeInformation = `https://api.spoonacular.com/recipes/`

const recipeRandom = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&cuisine=`

const recipeAnalyzedInstructions = `https://api.spoonacular.com/recipes/`

const recipeSummary = `https://api.spoonacular.com/recipes/`






module.exports = {
    apiKey,
    productRoute,
    specificProductInfo,
    ingredientSearch,
    ingredientInformation,
    ingredientSubstitute,
    menuSearch,
    menuFoodInfo,
    recipeSearch,
    recipeInformation,
    recipeRandom,
    recipeAnalyzedInstructions,
    recipeSummary
}