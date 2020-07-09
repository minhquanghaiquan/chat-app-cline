export const initialState = null

export const reducer = (state,action)=>{
    if(action.type==="USER"){
        return {user: action.payload}
    }
 

    // if(action.type==="GETCHAT"){
    //     return {...state, chats: action.payload}
    // }
    // if(action.type==="AFTERPOST"){
    //     return {...state, chats: [...state.chats,...action.payload]}
    // }
    if(action.type==="CLEAR"){
        return null
    }
    return state
}
