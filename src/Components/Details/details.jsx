import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
// import { getRecipesId } from "../../Redux/actions";
import {useParams} from "react-router-dom"
import {Link} from "react-router-dom"
import "./details.css"
import axios from "axios"
import { useState } from "react";

const Details = () => {
    const[recipe,setRecipe] = useState()
    //const dispatch = useDispatch();
    const {id} = useParams();
    //const recipesId = useSelector(state => state.recipesId);
    
    useEffect ( ()=> { // ejecuta nuesta action en conjunto con el useDispach 
      axios (`https://pi-food-back.herokuapp.com/recipes/${id}`) 
      .then (response =>{
           setRecipe (response.data)
      }) // despacha la accion
    },[id]) //no permite el bucle infinito


    return recipe?
    (
        <div className="detail-background">
        <div className="home">
            <Link to = "/recipes">
                <button className="btn">Home</button>
                </Link>
                </div>

            <div  className="detalle" key={recipe.id}>
                <h2>Name: {recipe.name}</h2>
                <img src={recipe.image} alt= {recipe.name}></img>
                
                <h3>DishTypes: 
                    {recipe.dishTypes}
                </h3>

                <h4>Types:  
                    {recipe.types[0] instanceof Object? recipe.types.map(e => e.name).join(", ") : recipe.types[0]? recipe.types.join(", ") : "Sin Tipos" }
                    </h4>
                    <div>
                          <h3>Summary: </h3>
                          <h9>{recipe.summary.replace(/<[^>]+>/g, '')}</h9>
                    </div>

                <h4>HealthScore: {recipe.healthScore}</h4>

                <div>
                <h3 className="steps">Steps:</h3>
                <h8>{recipe.steps}</h8>
                </div>
            </div>
        </div>
        ):<h1>Cargando...</h1>
}

export default Details