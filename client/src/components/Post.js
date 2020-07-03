import React from 'react';

export const Post = ({ posts }) => {
   // console.log('Post({props}):',  posts)
   return (
      
      <div className="row">
         { posts.map( (post, index) => {
            return (
               <div className="col s12 m12" key={ index }>
                  <div className="card blue-grey darken-1">
                     <div className="card-content white-text">
                        <span className="card-title">{ post.name }</span>
                        <p>{ post.content }</p>
                     </div>
                     <div className="card-action">
                     {/* <a href="#">This is a link</a>
                     <a href="#">This is a link</a> */}
                     </div>
                 </div>
               </div>
            )
         })}
      </div>
   )
}