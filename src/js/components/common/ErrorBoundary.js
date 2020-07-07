import React from 'react';
import Oops from '../../../img/oops.png';

const style = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '50%',
};
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  //   static getDerivedStateFromError(error) {
  //     // Update state so the next render will show the fallback UI.
  //     return { hasError: true };
  //   }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.errorInfo) {
      // You can render any custom fallback UI
      return (
        <div style={style}>
          <img
            src={Oops}
            alt="errorImage"
            height="600px"
            width="600px"
          />
          <h2>Something went wrong.</h2>
          <details
            open
            style={{
              whiteSpace: 'pre-wrap',
              color: 'red',
              fontWeight: 500,
              fontSize: '18px',
            }}
          >
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
