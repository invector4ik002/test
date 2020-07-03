import React, {useState} from 'react';
import { EditPosts } from './EditPosts';
import { useHttp } from '../hooks/http.hook';

export const Post = ({ posts }) => {
   const {loading} = useHttp();
   const [hiden, setHiden] = useState(false);

   const editHandler = () => {
      setHiden(true)
   }

   const closeHandler = () => {
      setHiden(false)
   }

   return (
      
      <div className="row">
         { posts.map( (post, index) => {
            return (
               <>
               <div className="col s12 m12" key={ index }>
                  <div className="card blue-grey darken-1">
                     <div className="card-content white-text">
                        <span className="card-title">{ post.name }</span>
                        <p>{ post.content }</p>
                     </div>
                     <div className="card-action">
                        <button 
                           className='btn blue accent-2 card-action__btn_margin-right'
                           onClick={editHandler}
                           disabled={loading}
                           >Редактировать
                        </button>
                        <button 
                           className='btn red accent-3 black-text'
                           // onClick={registerHandler} 
                           disabled={loading}
                           >Удалить
                        </button>
                     </div>
                 </div>
               </div>
               { hiden && <EditPosts closeHandler={closeHandler}/> }
               </>
            )
         })}
      </div>
   )
}