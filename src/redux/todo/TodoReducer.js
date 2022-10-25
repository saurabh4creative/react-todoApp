import { ADD_TODOS, DELETE_TODOS, GET_TODOS, REMOVE_TODOS, ERROR_TODO, EDIT_TODOS } from "./TodoTypes";

const initialState = {
     list : []
}

export const todoReducers = (state = initialState, action) => {
     switch (action.type) {
           case ADD_TODOS :

                return {
                    ...state,
                    list : [
                        action.payload,
                        ...state.list
                    ]
                }

           case GET_TODOS :

               return {
                    ...state,
                    list : action.payload
               }     

           case DELETE_TODOS :
               const newList = state.list.filter((item)=> item.id !== action.payload) 

               return {
                    ...state,
                    list : newList
               };

           case REMOVE_TODOS :

               return{
                    ...state,
                    list : action.payload
               }     
           
           case EDIT_TODOS :   
               
               const id = action.payload.data.id;
               const text = action.payload.data.data;

               const newEditList = state.list.map(obj => {
                    if (obj.id === id) {
                        return {...obj, data: text};
                    }
                  
                    return obj;
               }); 

               return {
                    ...state,
                    list : newEditList
               };

           default : 
               return state 
     }
}

const initState = {
     error: null
};

export const errorReducer = (state = initState, action) => {
     switch( action.type ){
          case ERROR_TODO :
               return { 
                    error : action.payload        
               }
          default : return state     
     } 
}