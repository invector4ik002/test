import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PostsPage } from './pages/PostsPage';
import { PostsCreatePage } from './pages/PostsCreatePage';
import { AuthPage } from './pages/AuthPage';

export const useRoutes = ( isAuthenticated ) => {
   if (isAuthenticated) {
      return (
         <Switch>
            <Route path='/posts' exact>
               <PostsPage />
            </Route>
            <Route path='/edit/' >
               <PostsCreatePage />
            </Route>
            <Redirect to='/posts'/>
         </Switch>
      )
   }

   return (
      <Switch>
         <Route path='/' exact>
            <AuthPage />
         </Route>
         <Route path='/edit/' >
            <PostsCreatePage />
         </Route>
         <Redirect to='/' />
      </Switch>
   )
};