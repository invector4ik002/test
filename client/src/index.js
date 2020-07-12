import React from 'react';
import {render} from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';


import './index.css';
import App from './App';
import { rootReduser } from './redux/rootReduser';

const store = createStore(rootReduser, compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

render(app,document.getElementById('root')
);

