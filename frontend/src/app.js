import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import './main.css';
import RecipeDetail from './RecipeDetail';

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [tags, setTags] = useState([]); // Stan do przechowywania tagów
    const [newRecipe, setNewRecipe] = useState({
        name: "",
        country: "",
        prep_time: "",
        description: "",
        recipe: "",
        tags: []
    });
    const [selectedRecipe, setSelectedRecipe] = useState(null);
   // const [selectedRecipeName, setSelectedRecipeName] = useState(null);

    useEffect(() => {
        fetchRecipes();
        fetchTags(); // Załaduj tagi
    }, []);

    const fetchRecipes = () => {
        axios.get('http://127.0.0.1:8000/api/recipes/')
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => console.error(error));
    };

    const fetchTags = () => {
        axios.get('http://127.0.0.1:8000/api/tags/')  // Endpoint tagów
            .then(response => {
                setTags(response.data); // Przechowuj tagi w stanie
            })
            .catch(error => console.error(error));
    };

    const handleInputsChange = (e) => {
        setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
    };

    const handleTagChange = (e) => {
        //const value = Array.from(e.target.selectedOptions, option => option.value);
        //setNewRecipe({ ...newRecipe, tags: value });
       const tagId = parseInt(e.target.value);
       const checked = e.target.checked;

       if (checked) {
           setNewRecipe((prevRecipe) => ({
              ...prevRecipe,
              tags: [...prevRecipe.tags, tagId],
           }));
       } else {
           setNewRecipe((prevRecipe) => ({
              ...prevRecipe,
              tags: prevRecipe.tags.filter((id) => id !== tagId),
           }));
       }
    };

    const handleAddRecipe = () => {
        axios.post('http://127.0.0.1:8000/api/recipes/', newRecipe)
            .then(response => {
                setRecipes([...recipes, response.data]);
                setNewRecipe({
                    name: "",
                    country: "",
                    prep_time: "",
                    description: "",
                    recipe: "",
                    tags: []
                });
            })
            .catch(error => console.error(error));
    };

    const handleEditClick = (recipe) => {
        setSelectedRecipe(recipe);
        setNewRecipe(recipe);
    };

    const handleUpdateRecipe = (id) => {
        axios.put(`http://127.0.0.1:8000/api/recipes/${selectedRecipe.id}/`, newRecipe)
            .then(response => {
                fetchRecipes();
                setNewRecipe({
                    name: "",
                    country: "",
                    prep_time: "",
                    description: "",
                    recipe: "",
                    tags: []
                });
            })
            .catch(error => console.error(error));
    };

    const handleCancelRecipe = (recipe) => {
        setSelectedRecipe(null);
        setNewRecipe({
            name: "",
            country: "",
            prep_time: "",
            description: "",
            recipe: "",
            tags: []
        });
    };

    const handleDeleteClick = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/recipes/${id}/`, newRecipe)
            .then(response => {
                fetchRecipes();
            })
            .catch(error => console.error(error));
    };

    return (
        <Router>
            <div className='app-container'>
                <h1>Your food recipes</h1>

                {/* Routes to render different components based on the URL */}
                <Routes>
                    {/* Main route with form and recipe list */}
                    <Route 
                        path="/" 
                        element={
                            <>
                                <div className='form-container'>
                                    <div className='form-inputs'>
                                        <input
                                            type='text'
                                            name='name'
                                            placeholder='name'
                                            value={newRecipe.name}
                                            onChange={handleInputsChange}
                                        />
                                        <input
                                            type='text'
                                            name='country'
                                            placeholder='country'
                                            value={newRecipe.country}
                                            onChange={handleInputsChange}
                                        />
                                        <input
                                            type='text'
                                            name='prep_time'
                                            placeholder='preparation time'
                                            value={newRecipe.prep_time}
                                            onChange={handleInputsChange}
                                        />
                                        <textarea
                                            name='description'
                                            placeholder='description'
                                            value={newRecipe.description}
                                            onChange={handleInputsChange}
                                        />
                                        <textarea
                                            name='recipe'
                                            placeholder='recipe'
                                            value={newRecipe.recipe}
                                            onChange={handleInputsChange}
                                        />

                                        {/* Dropdown do wyboru tagów
                                        <select
                                            name='tags'
                                            multiple={true}
                                            value={newRecipe.tags}
                                            onChange={handleTagChange}
                                        >
                                            {tags.map(tag => (
                                                <option key={tag.id} value={tag.id}>
                                                    {tag.name}
                                                </option>
                                            ))}
                                        </select>*/}

                                        {/* Formularz wyboru tagów jako checkboxy */}
                                        <div className="tag-container">
                                           {tags.map(tag => (
                                              <div key={tag.id} className="tag-item">
                                                 <input
					             type="checkbox"
					             id={`tag-${tag.id}`}
					             value={tag.id}
					             checked={newRecipe.tags.includes(tag.id)}
					             onChange={handleTagChange}
					         />
					         <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
					      </div>
					   ))}
					</div>


                                        <div className='form-buttons'>
                                            {
                                                selectedRecipe ? (
                                                    <>
                                                        <button onClick={handleUpdateRecipe}>Update</button>
                                                        <button onClick={handleCancelRecipe}>Cancel</button>
                                                    </>
                                                ) : (
                                                    <button onClick={handleAddRecipe}>Add new recipe</button>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>

                                {/* Lista przepisów */}
                                <ul className='recipes-list'>
                                    {
                                        recipes.map(recipe => (
                                            <li key={recipe.id}>
                                                <div>
                                                    <strong>{recipe.name}</strong>
                                                </div>
                                                <div className='actions'>
                                                    {/* Link do strony szczegółów przepisu */}
                                                    <Link to={`/recipes/${recipe.id}`} className='view'>
                                                        <button>View</button>
                                                    </Link>
                                                    <button className='edit' onClick={() => handleEditClick(recipe)}>Edit</button>
                                                    <button className='delete' onClick={() => handleDeleteClick(recipe.id)}>Delete</button>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </>
                        }
                    />

                    {/* Strona szczegółów przepisu */}
                    <Route 
                        path="/recipes/:id" 
                        element={<RecipeDetail />} 
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
