import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';
import { getPosts } from '../redux/action';

export const AuthPage = () => {
   const dispatch = useDispatch();
   const auth = useContext(AuthContext);
   const message = useMessage();
   const {loading, request, error, clearError} = useHttp();
   const [posts, setPosts] = useState([]);
   const [form, setForm] = useState({
      email: '',
      password: '',
   });

   dispatch(getPosts(posts));

   useEffect (() => {
      message(error)
      clearError()
   },[error, message, clearError]);

   useEffect(() => {
      window.M.updateTextFields()
   },[]);

   const changeHandler = (event) => {
      setForm({...form, [event.target.name]: event.target.value})
   }

   const registerHandler = async () => {
      try {
         const data = await request('/api/auth/register', 'POST', {...form})
         message(data.message)
      } catch(e) {}
   }
   const loginHandler = async () => {//вход
      try {

         const fetched = await request('/api/post', 'GET', null, {
            //  Authorization: `Bearer ${token}`
         })
         setPosts(fetched);
         

         const data = await request('/api/auth/login', 'POST', {...form})
         auth.login(data.token, data.userId)

         
      } catch(e) {}
   }

   return (
      <div className='row'>
         <div className='col s6 offset-s3'>
            {/* <h1>Список постов</h1> */}
            <div className='card blue-grey darken-1'>
               <div className='card-content white-text'>
                  <span className='card-title'>Авторизация</span>
                  <div>

                     <div className='input-field'>
                        <input 
                           className='validate' 
                           placeholder='Ввидите email'
                           id='email' 
                           type='text' 
                           value={form.email}
                           name='email'
                           onChange={changeHandler}
                        />
                        <label htmlFor='email'>Email</label>
                     </div>
                     <div className='input-field'>
                        <input 
                           className='validate' 
                           placeholder='Ввидите пароль' 
                           id='password' 
                           type='password' 
                           value={form.password}
                           name='password'
                           onChange={changeHandler}
                        />
                        <label htmlFor='password'>Password</label>
                     </div>

                  </div>
               </div>
               <div className='card-action'>
                  <button 
                     className='btn yellow darken-4 card-action__btn_margin-right'
                     onClick={loginHandler}
                     disabled={loading}
                  >Войти
                  </button>
                  <button 
                     className='btn grey lighten-1 black-text'
                     onClick={registerHandler} 
                     disabled={loading}
                  >Регистрация
                 </button>
               </div>
            </div>
         </div>
      </div>
   )
};