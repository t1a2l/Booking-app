import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';

import './styles/index.scss';

registerServiceWorker();

const render = AppComponent => {
    ReactDOM.render(
        <AppComponent/>,
        document.getElementById('root')
    );
};

render(App);

// This is a workaround to HMR support because babel-plugin-dva-hmr is not available with create-react-app
if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;
        render(NextApp);
    });
}
