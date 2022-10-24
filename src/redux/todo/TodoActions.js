import axios from "axios";
import { BASE_URL, ADD_TODOS, GET_TODOS, DELETE_TODOS, REMOVE_TODOS, ERROR_TODO } from "./TodoTypes";

export const addTodos = (data) => {
     return async (dispatch) => {
          const postData = {
               timeStamp : new Date().getTime().toString(),
               data : data
          };

          const response = await axios.post(`${BASE_URL}/todos`, postData);
          
          dispatch({
               type : ADD_TODOS,
               payload : response.data 
          });
     }
}

export const getTodos = () => {
     return async (dispatch) => {
          const response = await axios.get(`${BASE_URL}/todos?_sort=id&_order=desc`); 
          dispatch({
               type : GET_TODOS,
               payload : response.data 
          });
     }
}

export const deleteTodos = (id) => {
     return async (dispatch) => {
          await axios.delete(`${BASE_URL}/todos/${id}`);

          dispatch({
               type : DELETE_TODOS,
               payload : id
          })
     }
}

export const removeTodos = () => {
     return async (dispatch, getState) => {
          const data = getState().todoReducers.list;
          let id = [];
          data.map((item) => id.push(item.id));
          
          await axios.delete(`${BASE_URL}/todos/${id}`);
     
          dispatch({
               type : REMOVE_TODOS,
               payload : []
          }) 
     }
}

export const getError = (error) => {
     return {
           type : ERROR_TODO,
           payload : error.message
     }
}