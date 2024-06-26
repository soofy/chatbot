export const cartReducer = (state, action)=>{
    debugger;
    switch (action.type) {
        case 'ADD_ITEM':
            return {...state, cart : [...state.cart, action.payload]}
            
        case 'REMOVE_ITEM':
            return {...state, cart : state.cart.filter((p)=>p.id!==action.payload.id)}
    
        default:
          return  state;
    }


}