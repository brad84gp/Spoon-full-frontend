

const INITIAL_STATE = {
    user : {},
    userGroceryList : {},
    token : null,
    loggedIn : false,
}

function GroceryRootReducer(state=INITIAL_STATE, action){
    switch (action.type){
        case 'LOGGED_IN' :
            return {...state, loggedIn : state.loggedIn = true}
        case 'TOKEN_VALUE' :
            return {...state, token : state.token = action.payload}
        case 'USER':
            return {...state, user : state.user = action.payload}
        case 'GROCERY_LIST':
            return {...state, userGroceryList : state.userGroceryList = action.payload}
        case 'RESET_STATE' :
            return INITIAL_STATE
        default:
            return state
    }
}


export default GroceryRootReducer;