import {GET_DETAILS, GET_DIETS, GET_FILTER_CREATED, GET_ORDER_HEALTH_SCORE, GET_ORDER_NAME, GET_PUNTAJE, GET_RECIPES, GET_RECIPES_NAME, GET_TYPES} from "../actions"

const initialState = {
    recipes : [],
    recipesId : {},
    allRecipes: [],
    types: []
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case GET_RECIPES: 
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
            case GET_DETAILS:
                return {
                    ...state,
                    recipesId: action.payload
                }
            case GET_TYPES:
                const diets = state.allRecipes
                const filterByDiets = action.payload === "all" ? diets
                : diets.filter(e => e.types.includes(action.payload))
                return {
                    ...state,
                    recipes: filterByDiets
                }
                case GET_DIETS:
                    return{
                        ...state,
                        types: action.payload
                    }
                case GET_RECIPES_NAME:
                return{
                    ...state,
                    recipes: action.payload
                    }
                case GET_ORDER_NAME:
                        let order = action.payload === "A-Z" ? 
                        state.recipes.sort((a ,b)=> a.name.localeCompare(b.name)) 
                        :  state.recipes.sort((a ,b)=> b.name.localeCompare(a.name))
                        return {
                          ...state,
                          recipes: order
                        }
                case GET_ORDER_HEALTH_SCORE:
                        let orderHS = action.payload === "Min-Max" ? 
                        state.recipes.sort(function(a,b){
                          if(a.healthScore > b.healthScore ) return 1
                          if(b.healthScore > a.healthScore) return -1
                          return 0
                        }) 
                        :  state.recipes.sort(function(a,b){
                          if(a.healthScore > b.healthScore ) return -1
                          if(b.healthScore > a.healthScore) return 1
                          return 0
                        })
                        return {
                          ...state,
                          recipes: orderHS
                        }
                case GET_FILTER_CREATED:
                        const allRecipes = state.allRecipes;
                           const created_Filter = action.payload === 'Created' ? allRecipes.filter(e=> typeof e.id=== "string")
                           : allRecipes.filter(e=> typeof e.id=== "number")
                        return{
                            ...state,
                            recipes: action.payload === "All" ? state.allRecipes : created_Filter
                        }
                //BOTON MAYOR A 80(PUNTAJE)
                // case GET_PUNTAJE:
                //     const all= state.allRecipes
                //     const puntaje= all.filter(e=>e.healthScore>80)
                //     return{
                //         ...state,
                //         recipes: puntaje
                //     }
                



            default :
            return state
    }

}

export default rootReducer