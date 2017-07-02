import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import {routerMiddleware} from 'react-router-redux';
// import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers';

export default function configureStore(initialState: {}) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunk,
            //routerMiddleware(createHistory())
        )
    );
}
