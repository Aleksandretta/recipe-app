import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
    const { id } = useParams(); // Pobieranie ID przepisu z URL
    const [recipe, setRecipe] = useState(null);
    const [tags, setTags] = useState([]); // Stan na tagi

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await axios.get(`http://127.0.0.1:8000/api/recipes/${id}/`);
            setRecipe(response.data);
        };

        const fetchTags = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/tags/'); // Pobieranie wszystkich tagów
            setTags(response.data);
        };

        fetchRecipe();
        fetchTags();
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    // Zamiana identyfikatorów tagów na nazwy
    const tagNames = recipe.tags.map(tagId => {
        const tag = tags.find(t => t.id === tagId);
        return tag ? tag.name : 'Unknown Tag'; // Jeśli tag nie zostanie znaleziony, wyświetl 'Unknown Tag'
    });

    return (
        <div className='recipe-detail-container'>
            <h2>{recipe.name}</h2>
            <p><strong>Country:</strong> {recipe.country}</p>
            <p><strong>Preparation Time:</strong> {recipe.prep_time}</p>
            <p><strong>Description:</strong> {recipe.description}</p>
            <p><strong>Recipe:</strong> {recipe.recipe}</p>
            <p><strong>Tags:</strong> {tagNames.join(', ')}</p> {/* Wyświetlanie nazw tagów */}
        </div>
    );
};

export default RecipeDetail;
