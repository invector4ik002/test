import React, {useState} from 'react';
import { EditPosts } from './EditPosts';
import { useHttp } from '../hooks/http.hook';

export const Post = ({ stateArr }) => {
   
   const {loading, request} = useHttp();
   const [postId, setPostId] = useState(null);
   const [hiden, setHiden] = useState(false);

   const openHandler = (event) => {
      setPostId(event.target.id)
      setHiden(true)
   }

   const closeHandler = () => {
      setHiden(false)
   }

   const deleteHandler = async (event) => {
      await setPostId(event.target.id)
      try {
         const data = await request(`/api/post/${postId}`, 'DELETE')
         // window.location.reload()
      } catch(e) {}
   };
  
   return (
      <div className="row"> 
         { stateArr.map( (post, index) => {
            return (
               <div className="col s12 m12" key={index}>
                  { hiden && <EditPosts closeHandler={closeHandler} postId={postId}/> }
                  <div className="card blue-grey darken-1">
                     <div className="card-content white-text">
                        <span className="card-title">{ post.name }</span>
                        <p>{ post.content }</p>
                     </div>
                     <div className="card-action">
                        <button 
                           className='btn blue accent-2 card-action__btn_margin-right'
                           onClick={openHandler}
                           id = {post._id}
                           disabled={loading}
                           >Редактировать
                        </button>
                        <button 
                           className='btn red accent-3 black-text'
                           onClick={deleteHandler} 
                           id = {post._id}
                           disabled={loading}
                           >Удалить
                        </button>
                     </div>
                  </div>
               </div>   
            )
         })}
      </div>
   )
}

