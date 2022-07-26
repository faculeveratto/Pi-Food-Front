import React from "react"
import "./card.css";

export default function Card({ Name, image, type, dishTypes}) {
    return(
        <div className="card">
            <h3>{Name}</h3>
            <img src={image} alt="img not found" />
            <div className="diets-container">
            <h4>Types: {type? type : "Sin Tipos"}</h4>
            <h5>Dish Types: {dishTypes}</h5>
            </div>
        </div>
    );
}