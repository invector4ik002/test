import React, { useState, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';



export const EditPosts = ({ closeHandler }) => {

   const {loading, request} = useHttp();

   const [post, setPost] = useState({
      name: '',
      content: '',
   });
   
   const changeHandler = (event) => {
      setPost({...post, [event.target.name]: event.target.value})
   };

   const createHandler = async () => {
      try {
         const data = await request('/api/post/:id', 'PUT', {...post})
         // message(data.message)
         closeHandler()
         console.log(data)
      } catch(e) {}
   };

   useEffect(() => {// Убираем баг с label
      window.M.updateTextFields()
   }, []);

   return (
      <div className='row question-wraper'>
         <div className='col '>
            {/* <h1>Список постов</h1> */}
            <div className='card blue-grey darken-1'>
               <div className='card-content white-text'>
                  <span className='card-title'>Редактировать тестовые сообщения</span>
                  <div>

                     <div className='input-field'>
                        <input 
                           className='validate' 
                           placeholder='Ввидите names'
                           id='name' 
                           type='text' 
                           name='name'
                           value={post.name}
                           onChange={changeHandler}
                        />
                        <label htmlFor='name'>names</label>
                     </div>

                     <div className="input-field">
                        <textarea 
                           id="content" 
                           className="materialize-textarea" 
                           name='content'
                           value={post.content}
                           onChange={changeHandler}
                           ></textarea>
                        <label htmlFor="content">Введите сообщение</label>
                     </div>

                  </div>
               </div>
               <div className='card-action'>
                  <button 
                     className='btn yellow darken-4 card-action__btn_margin-right'
                     onClick={createHandler}
                     disabled={loading}
                  >создать
                  </button>
                  <button 
                     className='btn yellow darken-4 card-action__btn_margin-right'
                     onClick={closeHandler}
                     disabled={loading}
                  >закрыть
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}