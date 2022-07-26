import axios from "axios";
export const GET_RECIPES = "GET_RECIPES"
export const GET_DETAILS = "GET_DETAILS"
export const GET_TYPES = "GET_TYPES"
export const GET_ALL_TYPES = "GET_ALL_TYPES"
export const GET_DIETS = "GET_DIETS"
export const GET_RECIPES_NAME = "GET_RECIPES_NAME"
export const GET_ORDER_NAME = "GET_ORDER_NAME"
export const GET_ORDER_HEALTH_SCORE = "GET_ORDER_HEALTH_SCORE"
export const GET_FILTER_CREATED = "GET_FILTER_CREATED"
export const GET_PUNTAJE = "GET_PUNTAJE"

export function getRecipes() {
  return async function(dispatch){
    let json= await axios.get(`https://pi-food-back.herokuapp.com/recipes`);
    return dispatch({
      type:GET_RECIPES,
      payload : json.data
    })
  }
}

export function getRecipesId(id) {
  return async function(dispatch){
    let json=await axios.get(`https://pi-food-back.herokuapp.com/recipes/${id}`)
    return dispatch({
      type : GET_DETAILS,
      payload : json.data
    })
  }
}

export function getTypes(payload){
    return({
      type:GET_TYPES,
      payload,
    })
  }

export function getDiets (){
  return async function(dispatch){
    let json=await axios.get(`/types`)
    return dispatch({
      type:GET_DIETS,
      payload : json.data
    })
  }
}

  
export function getRecipesByName(name){
  return async function (dispatch){
    try{
      let json=await axios.get(`https://pi-food-back.herokuapp.com/recipes?name=${name}`)
      return dispatch({
        type:GET_RECIPES_NAME,
        payload : json.data 
      })
    }catch{
      alert("Recipes not found")
    }
  }
  }

export function getOrderName(payload){
  return{
    type:GET_ORDER_NAME,
    payload, 
  }
}

export function getOrderHealthScore(payload){
  return{
    type: GET_ORDER_HEALTH_SCORE,
    payload, 
      }
    }

export function getFilterCreated(payload){
      return{
        type: GET_FILTER_CREATED,
        payload, 
          }
        }  

//BOTON MAYOR A 80(PUNTAJE)
// export function getPuntaje(payload){
//   return{
//     type: GET_PUNTAJE,
//     payload
//   }
// }

    
