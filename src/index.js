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
    yield takeLatest('ADD_TO_FAVORITES', postGIF);
    yield takeLatest('GET_FAVORITE_GIFS', getFavoriteGifs)
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

function* postGIF(action) {
    try {
        console.log('action.payload iside postGIF', action.payload);
        const response = yield axios({
            method: 'POST',
            url: '/api/favorite',
            data: action.payload
        })
        yield put({
            type: 'GET_FAVORITE_GIFS',
        })
    } catch (error) {
        console.log('something broke in the /api/favorite POST saga function')
        console.log(error)
    }
}

function* getFavoriteGifs(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/favorite',
            data: action.payload
        })
        yield put({
            type: 'SET_FAVORITE_GIFS',
            payload: response.data
        })
    } catch (error) {
        console.log('Error inside getFavoriteGifs');
    }
}

const favoriteGifs = (state = [], action) => {
    switch (action.type) {
        case 'SET_FAVORITE_GIFS':
            return action.payload;
        default:
            return state;
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
        favoriteGifs
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
