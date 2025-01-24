# Recipe app

Welcome to the Recipe App! This app allows users to store, search, view, update, and delete recipes locally. With a simple and intuitive interface, users can easily manage their recipe collection by filling out a form with key details such as name of the recipe, its preparation time, country origin of the meal, step by step procedure to cook the meal and assign among various built-in tags. The app also includes a search bar so you can easily filter recipes based on their name or tags.

## Features

- **Add Recipes**: Fill out every field on the form with recipe details and choose at least one tag in order to save a recipe in the app.
- **Tags**: Choose at least one built-in tag using checkboxes when adding or updating a recipe to categorize them.
- **View Recipe Details**: Click on "View" button on any recipe in the list to view its details.
- **Update Recipes**: Edit existing recipes by clicking the "Update" button, which fills in the form with the current recipe data. If you change your mind, click "Cancel" button which prevents changes from being saved.
- **Delete Recipes**: Remove recipes from the list permanently using "Delete" button.
- **Search Recipes**: Use the search bar to filter recipes by their name or tags.

## Requirements

- Web browser with support for local storage (Chrome, Firefox, Safari, etc.)
  
## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/recipe-app.git
   cd recipe-app
   ```
   
2. Use the following command to set up the environment and run the app for the first time:

   ```bash
   docker compose up --build
   ```
 
3. Once the app is initialized, your app data will be stored in a volume which is why it is enough to use
   ```bash
   docker compose up
   ```

## App Usage

**Adding a Recipe** <br/>
Fill in the recipe form with the following fields:<br/>
Name: The name of the recipe.<br/>
Preparation Time: The time it takes to prepare the recipe.<br/>
Ingredients: List the ingredients required for the recipe.<br/>
Tags: Choose at least one tag from the available checkboxes.<br/>
Once all fields are completed and at least one tag is selected, click the "Save Recipe" button to store it locally.<br/>

Tags are built-in and they are initialized using a script "create_default_tags.py". User is advised to use the built-in tags. It it however possible to modify or add tags inside /backend/management/commands/create_default_tags.py script before the app initalization.

**Searching Recipes**<br/>
Use the search bar below the form to filter the list of recipes by their name or tags. Simply type in the name or tag you are looking for and the list will update to show matching recipes.

**Viewing a Recipe**<br/>
To view recipe details click "View" button on the recipe. This will display the name, preparation time, ingredients, and tags.

**Updating a Recipe**<br/>
To update a recipe, click on the "Edit" button next to the recipe in the list. This will fill in the form with the current recipe data. You can make changes and click "Save" Recipe to update the information. If you don't want to save your changes, click "Cancel".

**Deleting a Recipe**<br/>
To delete a recipe, click the "Delete" button next to the recipe.

## Local Storage<br/>
Recipes app uses local storage to store youe recipes locally, so they will persist even after removal of Docker containers. However, the data will only be available on the same device.
