import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDiets, getRecipes, getTypes, getOrderName, getOrderHealthScore, getFilterCreated, getPuntaje} from "../../Redux/actions";
import Card from "../Card/card";
import Paginado from "../Paginate/paginate"
import SearchBar from "../SearchBar/searchBar";
import loader from "./cooking.gif"
import "./home.css"
import Footer from "../Footer/Footer"

const Home = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);
    const types = useSelector(state => state.types)
    const [order, setOrder] = useState("")
    const [orderHS, setOrderHS] = useState("")

    const [currentPage, setCurrentPage] = useState(1); // setcurrentpage seteo en 1, 
    const [recipesPerPage] = useState(9);
    const indexOfLastRecipes = currentPage * recipesPerPage; // 9
    const indexOfFirstRecipes = indexOfLastRecipes - recipesPerPage; // 0

    const currentRecipes = recipes.slice(
        indexOfFirstRecipes,
        indexOfLastRecipes
    );

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => { // ejecuta nuesta action en conjunto con el useDispach 
        dispatch(getRecipes())  // despacha la accion
    }, [dispatch]) //no permite el bucle infinito

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])



    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes())
    }

    function handleFilterByType(e) {
        dispatch(getTypes(e.target.value))
        setCurrentPage(1)
    }

    function handleOrderAZ(e) {
        dispatch(getOrderName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleOrderHealthScore(e) {
        dispatch(getOrderHealthScore(e.target.value))
        setCurrentPage(1)
        setOrderHS(`Ordenado ${e.target.value}`)
    }

    function handleFilterCreated(e) {
        dispatch(getFilterCreated(e.target.value))
        setCurrentPage(1)
    }
    //BOTON MAYOR A 80(PUNTAJE)
    // function handlePuntaje(e){
    //     dispatch(getPuntaje(e))
    // }
    

    return (
        <div>
            <div className="foto">
                <div className="a">
                    <h1 className="a"> Recipe Page</h1>
                    <div className="botonReload"><button className="btn" onClick={handleClick} >Reload Recipes</button> </div>
                    <SearchBar className="searchDiv" setCurrentPage={setCurrentPage} />
                    <div className="botonReload"><Link to="/createRecipes" ><button className="btn"><span>Create Recipe </span></button></Link></div>
                         
                       
                </div>
                <div className="navContainer">

                    {/* <button onClick={handlePuntaje}>Mayor a 80</button> */}
                
                  

                    <div className="b">
                        <select defaultValue="Api or Created" onChange={(e) => handleFilterCreated(e)}>
                            <option disabled>Api or Created</option>
                            <option value="All">All</option>
                            <option value="Created">Created</option>
                            <option value="Api">Api</option>
                        </select>
                        <select defaultValue="Order" onChange={e => handleOrderAZ(e)}>
                            <option disabled>Order</option>
                            <option value="All">All</option>
                            <option value='A-Z'>A - Z</option>
                            <option value='Z-A'>Z - A</option>
                        </select>
                        <select defaultValue="Score" onChange={e => handleOrderHealthScore(e)}>
                            <option disabled>Score</option>
                            <option value="All">All</option>
                            <option value='Max-Min'>High score</option>
                            <option value='Min-Max'>Low score</option>
                        </select>
                        <select defaultValue="Diets" onChange={e => handleFilterByType(e)}>
                            <option disabled>Diets</option>
                            <option value="all">All</option>
                            {types.map((e) => (
                                <option key={e.id} value={e.name}>{e.name}</option>
                            ))}
                        </select>
                       
                    </div> 
                    <Paginado
                            recipesPerPage={recipesPerPage}
                            recipes={recipes.length}
                            paginado={paginado}
                        />
                </div>
                <div className="cards">
                    {currentRecipes.length ?
                        currentRecipes.map(e => {
                            return (
                                <div key={e.id}>
                                    <Link to={"/recipes/" + e.id}>
                                        <Card
                                            Name={e.name}
                                            image={e.image}
                                            type={e.types instanceof Array ? e.types.map(e => e.name).join(", ") : e.types ? e.types : "Sin Tipos"}
                                            dishTypes={e.dishTypes}
                                            />
                                    </Link>
                                </div>
                                    )
                                }) : <div className="loader"><img src={loader} alt="CARGANDOOOO" /></div>}
                </div>
            <Footer/>
            </div>
        </div>
    )

}

export default Home;