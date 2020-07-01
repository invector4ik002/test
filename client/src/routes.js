import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PostsPage } from './pages/PostsPage';
import { PostsEditPage } from './pages/PostsEditPage';
import { AuthPage } from './pages/AuthPage';

export const useRoutes = ( isAuthenticated ) => {
   if (isAuthenticated) {
      return (
         <Switch>
            <Route path='/posts' exact>
               <PostsPage />
            </Route>
            <Route path='/edit/:id'>
               <PostsEditPage />
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
         <Redirect to='/' />
      </Switch>
   )
};