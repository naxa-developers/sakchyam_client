import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount,shallow, configure } from 'enzyme';
import App from '../src/js/components/App';

configure({adapter: new Adapter()});
describe('First React component test with Enzyme', () => {
  it('renders without crashing', () => {
    const app = <App/>;
    // console.log(shallow(app).debug());
    mount(app);
  });
});
// describe('Second React component test with Enzyme', () => {
//   it('renders without crashing', () => {
//     mount(<TestComponent/>);
//   });
// });