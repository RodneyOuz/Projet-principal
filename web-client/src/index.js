import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {App} from './App';
import registerServiceWorker from './registerServiceWorker';
import {store} from "./store/store";

const Main = () =>
  <Provider store={store}>
    <App/>
  </Provider>;

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
