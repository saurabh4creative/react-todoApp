import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodos, getTodos, deleteTodos, removeTodos, getError, editTodos } from '../redux/todo/TodoActions';
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const inputValue = useRef();
    const dispatch = useDispatch();
    const dataFetchedRef = useRef(false);
    const todoList = useSelector((state) => state.todoReducers.list); 
    const errorFound = useSelector( (state) => state.errorReducer.error);
    const [isEdit, setisEdit] = useState(false);
    const [isEditID, setisEditID] = useState();
    const [isEditText, setisEditText] = useState();
     
    const submitHandler = e => {
         e.preventDefault(); 
         const value = inputValue.current.value;
         
         if( value === '' || !value || value === null ){
              return toast.error('Please Enter the Text...');
         } 
         
         if( isEdit ){ 
            const postData = {
                 id : isEditID,
                 data : value 
            };

            dispatch( editTodos(postData) ).catch((error)=>{
                dispatch( getError(error) ); 
            });

            setisEdit(false);
            setisEditID();
            setisEditText();

            toast.success('Todo Edit Successfully...');
         }
         else{
            dispatch( addTodos(value) ).catch((error)=>{
                dispatch( getError(error) ); 
            });
            toast.success('Todo Added Successfully...');
         }
         
         inputValue.current.value = '';
    };

    useEffect(()=>{
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        dispatch( getTodos() ).catch((error)=>{
            dispatch( getError(error) ); 
        });
    }, [dispatch]);

    const deleteTodo = (id) => {
        dispatch( deleteTodos(id) ).catch((error)=>{
            dispatch( getError(error) ); 
        });
        toast.success('Todo Delete Successfully...');
    }

    const clearTodo = () => {
        dispatch( removeTodos(todoList) ).catch((error)=>{
            dispatch( getError(error) ); 
        });
        toast.success('Todo Remove Successfully...');
    }

    useEffect(()=>{
        if( errorFound ){ 
            toast.error(errorFound);
        }  
    }, [errorFound]);

    const editTodo = (id) => {
        setisEdit(true);
        setisEditID(id);

        const editText = todoList?.filter((item)=> {
             if( item.id === id ){
                  return item;
             } 
        }); 
        
        setisEditText(editText[0].data);
    } 

    useEffect(()=>{
        if( isEditText ){
            inputValue.current.value = isEditText;
        }  
    }, [isEdit, isEditID, isEditText]);

    return (
        <>
        <div className="todoApp position-relative">
               <div className='bg-img'></div>
               <div className='innerDiv position-relative pt-5'>
                     <div className='container'>
                           <div className='row justify-content-center'>
                                <div className='col-xl-5 col-lg-5 col-sm-10 col-md-8 col-12'>
                                      <div className='web-logo text-center'>
                                           <img src='https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo.svg' alt='Todo Logo' />
                                      </div>

                                      <div className='input-box mt-5'>
                                           <div className='top-form position-relative'>
                                                 <form onSubmit={submitHandler}>
                                                      <input ref={inputValue} type={'text'} placeholder="Create a Todo" className='form-control' />
                                                      <button type="submit">
                                                             {
                                                                 isEdit ? <><i className='fa fa-edit'></i></> : <><i className='fa fa-plus'></i></>
                                                             }
                                                      </button>
                                                 </form>
                                           </div>
                                      </div>

                                      <div className='result-sec mt-4 pt-2'>
                                            <div className='list-res'>
                                                   <div className='final-res'>
                                                          
                                                   </div>
                                            </div>
                                            <div className='final-res'>
                                                   {
                                                         todoList?.map((item)=>{
                                                              const  {id, data} = item;
                                                              return (
                                                                    <div key={id} className='res-div'>
                                                                            <div className='d-flex align-items-center justify-content-between'>
                                                                                <div>
                                                                                      { data }
                                                                                </div>
                                                                                <div> 
                                                                                      <button onClick={(e) => editTodo(id)} className='sl-btn'>
                                                                                            <i className='fa fa-edit'></i>
                                                                                      </button>
                                                                                      <button onClick={(e) => deleteTodo(id)} className='sl-btn'>
                                                                                            <i className='fa fa-trash'></i>
                                                                                      </button>
                                                                                </div>
                                                                            </div>
                                                                    </div> 
                                                              )
                                                         })
                                                   } 
                                                   <div className='res-div'>
                                                         <ul className='navbar-nav flex-row justify-content-between'>
                                                               {
                                                                   todoList?.length > 0 ? 
                                                                   <>
                                                                        <li>
                                                                                { todoList?.length } { todoList?.length === 1 ? 'item' : 'items' }
                                                                        </li>
                                                                        <li className='cursor' onClick={clearTodo}>
                                                                                Clear All
                                                                        </li>
                                                                   </> : <>
                                                                        <li className='text-center col'>
                                                                              No Todo List Found...
                                                                        </li>
                                                                   </>
                                                               } 
                                                         </ul>
                                                   </div>
                                            </div>
                                      </div>

                                      <div className='author-name pb-4 text-center mt-4'>
                                           Completed by Saurabh Jain
                                      </div>
                                </div>
                           </div>
                     </div>
               </div>
        </div>
        <ToastContainer />
        </>
    );
}

export default Home;