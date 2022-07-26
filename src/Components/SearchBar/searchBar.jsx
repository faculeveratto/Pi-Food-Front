import React ,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { getRecipesByName } from '../../Redux/actions';
import "./searchBar.css"


export default function SearchBar(props) {
  const dispatch = useDispatch()
  const [name,setRecipes]=useState("");
  const {setCurrentPage}= props
  function handleSearch(e){
    setRecipes(e.target.value)
  }
  function handleSubmit(e){
    setCurrentPage(1)
    dispatch(getRecipesByName(name))
    setRecipes("")
  }
  return (
    <nav>
    <div className="nav">
      <input 
      type ="text"
      placeholder='Search...'
      onChange={(e)=>handleSearch(e)}
      />
      <button type = "Submit" onClick={(e)=> handleSubmit(e)}>🔍</button>
    </div>
      
      </nav>
  )
}