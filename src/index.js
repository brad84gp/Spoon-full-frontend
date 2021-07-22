import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';



import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import GroceryRootReducer from './React-Redux/GroceryRootReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, GroceryRootReducer)


const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
  ) 

const persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App />
    </PersistGate>
  </Provider>, 
  document.getElementById('root')
);
