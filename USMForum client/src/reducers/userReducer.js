export const initialState = null

export const reducer = (state, action) =>{
    if(action.type == "USER"){
        return action.payload
    }
    if(action.type == "CLEAR"){ //On logout
        return null
    }
    return state
}