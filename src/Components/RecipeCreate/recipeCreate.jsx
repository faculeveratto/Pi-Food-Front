import React,{useState,useEffect} from "react" ;
import { Link , useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getDiets} from "../../Redux/actions";
import "./recipe.css"
import axios from "axios";



function validate (input){
  let errors = {}
  if(!input.name) errors.name = "Campo Obligatorio"
  if(input.name.includes(1)||input.name.includes(2)||input.name.includes(3)||input.name.includes(4)||input.name.includes(5)||input.name.includes(6)||input.name.includes(7)||input.name.includes(8)||input.name.includes(9)||input.name.includes(0))errors.name = "The name cannot contain numbers";
  if(!(/^[a-zA-Z]+$/).test(input.name)) errors.name = "No puede contener caracteres "

  if (isNaN(input.healthScore)) errors.healthScore = "the value must be a number";
  if(input.healthScore<0)errors.healthScore = "value cannot be negative"
  if(input.healthScore>100)errors.healthScore = "value cannot be greater than 100"

  if(!input.dishTypes) errors.dishTypes = "Campo Obligatorio"
  if(input.dishTypes.includes(1)||input.dishTypes.includes(2)||input.dishTypes.includes(3)||input.dishTypes.includes(4)||input.dishTypes.includes(5)||input.dishTypes.includes(6)||input.dishTypes.includes(7)||input.dishTypes.includes(8)||input.dishTypes.includes(9)||input.dishTypes.includes(0))errors.name = "The name cannot contain numbers";

  if(input.types.length>3)errors.types = "value cannot be greater than 3"
  if(input.types.includes(1)||input.types.includes(2)||input.types.includes(3)||input.types.includes(4)||input.types.includes(5)||input.types.includes(6)||input.types.includes(7)||input.types.includes(8)||input.types.includes(9)||input.types.includes(0))errors.name = "The name cannot contain numbers";
  
  if(input.summary.length<30)errors.summary = "Longer than 30 characters"
  

  return errors
}





export default function RecipesCreate (){
  const dispatch=useDispatch()
  const {types, recipes} = useSelector(state => state)
  const history = useHistory()

  const [input,setInput] = useState({
    name: "",
    image: "",
    types: [],
    dishTypes: "",
    steps: "",
    summary: "",
    healthScore: ""
})
const [errors,setErrors] = useState({}) 


  function handleChange (e){
    const allRecipe= recipes.map(e=> e.name)
    if(!allRecipe.includes(e.target.value)){
    setInput({
      ...input,
      [e.target.name] : e.target.value 
    })
    setErrors(
      validate({
        ...input,
      [e.target.name] : e.target.value 
      })  
    )
  }
}

  function handleSelect(e){
    if(!input.types.includes(e.target.value)){
    setInput({
      ...input,
      types : [...input.types,e.target.value]
    })
    setErrors(
      validate({
        ...input,
        types : [...input.types,e.target.value]
      })  
    )
  }
  }
  async function handleSubmit(e){
    e.preventDefault()
    if (
      errors.name ||
      errors.healthScore ||
      errors.dishTypes ||
      errors.types ||
      errors.summary ||
      !input.name
      ) {
         alert("Recipes not Created - please complete the inputs");
      } else {
        await axios.post("https://pi-food-back.herokuapp.com/recipes", input)
         alert("Recipes created")
    history.push("/recipes")
  }}

  function handleDelete(e){
    setInput({
      ...input,
      types: input.types.filter(typ => typ !== e)
    })
    setErrors(
      validate({
        ...input,
        types: input.types.filter(typ => typ !== e)
      })  
    )
   }
 

useEffect(()=>{
  dispatch(getDiets())
},[dispatch])

 return (
  <div className="principal-on">
  <div>
    <Link to = "/recipes">
      <button className="btn">Home</button>
      </Link>
      </div>

     
    <div className="formContainer">
      <form onSubmit={e => handleSubmit(e)}>
        <h4 className="titleForm">¡ Create new Recipe !</h4>
        
        <input
        className="descriptionForm1"
        type ="text"
        value = {input.name}
        name = "name"
        onChange={e =>handleChange(e)}
        placeholder="Name"
        />
        {errors.name && <span className="errorForm">{errors.name}</span>}
        
       <textarea
        className="descriptionForm"
        type = "text"
        rows="5" 
        cols="30"
        value = {input.summary}
        name = "summary"
           onChange={e =>handleChange(e)}
           placeholder="Summary">
        </textarea>
        {errors.summary && <span className="errorForm">{errors.summary}</span>}
      
        <input 
        className="descriptionForm1"
        type = "text"
        value = {input.image}
        name = "image"
           onChange={e =>handleChange(e)}
           placeholder="Image"
        />
      

        <input 
        className="descriptionForm1"
        type = "text"
        value = {input.dishTypes}
        name = "dishTypes"
           onChange={e =>handleChange(e)}
           placeholder="DishTypes"
        />
        {errors.dishTypes && <span className="errorForm">{errors.dishTypes}</span>}

      
        <input 
        className="descriptionForm1"
        type = "text"
        value = {input.steps}
        name = "steps"
           onChange={e =>handleChange(e)}
           placeholder="Steps"
        />
      
          
        <input 
        className="descriptionForm1"
        type = "number"
        value = {input.healthScore}
        name = "healthScore"
           onChange={e =>handleChange(e)}
           placeholder="Health Score"
           />
          {errors.healthScore && <span className="errorForm">{errors.healthScore}</span>}
          
      
      
      <div className="opciones" >

      <select onChange={e => handleSelect(e)}>
        {types.map(t =>(
          <option value = {t.name}> {t.name}</option>
        ))}
      </select>
      </div>
      {input.types.map(e => 
      <div className="opciones">
         <div>
                  <ul>
                        {e}<button
                            type="button"
                            onClick={()=>handleDelete(e)}
                            >X</button>
                  </ul>
                  </div>
  
        {errors.types && <span className="errorForm">{errors.types}</span>}
        </div>
        )}

      <button type = 'submit' className="btnForm">Create</button>
      
      

        
    
      </form>
        </div>
    </div>
  
  
) }