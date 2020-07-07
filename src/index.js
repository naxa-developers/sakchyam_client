import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './js/components/App';
// import './scss/local/fonts.scss';
import './css/bootstrap.min.css';
// import '../../css/slick-theme.css';
import './css/apexcharts.css';
import './css/slick.css';
import './scss/style.scss';
import store from './js/store';
import ErrorBoundary from './js/components/common/ErrorBoundary';

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root'),
);
