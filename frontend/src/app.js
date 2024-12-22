import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './main.css';

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
    const [toView, setToView] = useState({
        name: "",
        country: "",
        prep_time: "",
        description: "",
        recipe: "",
        tags: []
    })
    const [openView, setOpenView] = useState(true);

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
        console.log(newRecipe);
    };

    const handleTagChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setNewRecipe({ ...newRecipe, tags: value });
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

    const handleViewClick = async(id) => {
        const response = await axios.get(`http://127.0.0.1:8000/api/recipes/${id}/`)
        setToView(response.data)
        setOpenView(true)
    }

    const handleEditClick = (recipe) => {
        setSelectedRecipe(recipe)
        setNewRecipe(recipe)
    }

    const handleUpdateRecipe = (id) => {
        axios.put(`http://127.0.0.1:8000/api/recipes/${selectedRecipe.id}/`, newRecipe)
        .then(response => {
            //populates the form with data from the database
            fetchRecipes();
            //clears input fields after clicking update button
            setNewRecipe({
                name: "",
                country: "",
                prep_time: "",
                description: "",
                recipe: "",
                tags: []
            })
        })
        .catch(error => console.error(error))
    }

    const handleCancelRecipe = (recipe) => {
        setSelectedRecipe(null)
        setNewRecipe({
            name: "",
            country: "",
            prep_time: "",
            description: "",
            recipe: "",
            tags: []
        })
    }

    const handleDeleteClick = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/recipes/${id}/`, newRecipe)
        .then(response => {
            //populates the form with data from the database
            fetchRecipes();
        })
        .catch(error => console.error(error))
    }

    return (
        <div className='app-container'>
            <h1>Your food recipes</h1>
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

                    {/* Dropdown do wyboru tagów */}
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
                    </select>

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
            <ul className='recipes-list'>
                {
                    recipes.map(recipe => (
                        <li key={recipes.id}>
                            <div>
                                <strong>{recipes.name}</strong>
                            </div>
                            <div className='actions'>
                                <button className='view' onClick={() => handleViewClick(recipe.id)}>View</button>
                                <button className='edit' onClick={() => handleEditClick(recipe)}>Edit</button>
                                <button className='delete' onClick={() => handleDeleteClick(recipe.id)}>Delete</button>
                            </div>
                        </li>
                    ))
                }
            </ul>

            {/*Single View */}
            {openView && (
                <>
                    <div className='outer-box'>
                        <strong>{toView.name}</strong>
                        <br />
                        <span>Country : {toView.country} </span>
                        <br />
                        <span>Preparation time : {toView.prep_time} </span>
                        <br />
                        <span>Description : {toView.description} </span>
                        <br />
                        <span>Recipe : {toView.recipe} </span>
                        <br />
                        <span>Tags : {toView.tags} </span>
                    </div>
                    <button onClick={() => setOpenView(false)}>Close</button>
                </>
            )}
        </div>
    );
};

export default App;
