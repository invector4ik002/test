import React, {useState} from 'react';
import { EditPosts } from './EditPosts';
import { useHttp } from '../hooks/http.hook';

export const Post = ({ posts }) => {

   const {loading} = useHttp();
  
   const [postId, setPostId] = useState(null);
   const [hiden, setHiden] = useState(false);
   console.log(postId)
   console.log(hiden)

   return (
      <div className="row"> 
         { posts.map( (post) => {
    
            // const openHandler = () => {
            //    setHiden(true)
            // }

            const closeHandler = () => {
               setHiden(false)
            } 

            return (
               <div className="col s12 m12" key={post._id}>
                  { hiden && <EditPosts closeHandler={closeHandler} postId={postId}/> }
                  <div className="card blue-grey darken-1">
                     <div className="card-content white-text">
                        <span className="card-title">{ post.name }</span>
                        <p>{ post.content }</p>
                     </div>
                     <div className="card-action">
                        <button 
                           className='btn blue accent-2 card-action__btn_margin-right'
                           // onClick={openHandler}
                           onClick={e => setPostId(e.target.id)}
                           id = {post._id}
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
            )
         })}
      </div>
   )
}