import React, { useState, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { Redirect } from 'react-router-dom';
// import { useMessage } from '../hooks/message.hook';

export const PostsCreatePage = () => {

   const [post, setPost] = useState({
      name: '',
      content: '',
   });
   
   // const message = useMessage();
   const {loading, request} = useHttp();

   const changeHandler = (event) => {
      setPost({...post, [event.target.name]: event.target.value})
   };

   const createHandler = async () => {
      try {
         const data = await request('/api/post/generate', 'POST', {...post})
         // message(data.message)
         console.log(data)
      } catch(e) {}
      console.log(post)
   };
  
   useEffect(() => {// Убираем баг с label
      window.M.updateTextFields()
   }, []);

   return (
      <div className='row'>
         <div className='col s6 offset-s3'>
            {/* <h1>Список постов</h1> */}
            <div className='card blue-grey darken-1'>
               <div className='card-content white-text'>
                  <span className='card-title'>Создадим тестовые сообщения</span>
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
                  >Создать
                  </button>
                  <button 
                     className='btn grey lighten-1 black-text'
                     // onClick={registerHandler} 
                     disabled={loading}
                     
                  >выход
                 </button>
               </div>
            </div>
         </div>
      </div>
   )
}
