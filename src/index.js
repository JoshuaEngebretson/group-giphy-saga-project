import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeLatest, put } from 'redux-saga/effects'
import axios from 'axios';

function* rootSaga() {
    yield takeLatest('SAGA/GET_SEARCH', getSearch);
}

function* getSearch(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/giphy/search',
            params: {
                rating: action.payload.rating ,
                searchQuery: action.payload.searchQuery
            }
        })
        yield put({
            type: 'SET_SEARCH',
            payload: response.data
        })
    } catch (error) {
        console.log('something broke in the /api/giphy/search GET saga function')
        console.log(error)
    }
}

const searchGIFS = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH':
            return action.payload;
        default:
            return state;
    }
}

const sagaMiddleware = createSagaMiddleware();
const storeInstance = createStore(
    combineReducers({
        searchGIFS,
    }),
    applyMiddleware(sagaMiddleware, logger),
);
sagaMiddleware.run(rootSaga);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
