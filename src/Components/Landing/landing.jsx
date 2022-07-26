import React from "react";
import {Link} from "react-router-dom";
import "./landing.css"


export default function LandingPage(){
  return (
    <div className="principal">
    <div>
        <div className="title">
          <h1> Premium Recipes </h1>
          <Link to="/recipes">
            <div className="btn">
              <span>Explore Recipes</span>
            </div>
          </Link>
        </div>
      </div>
      </div>
  )
}