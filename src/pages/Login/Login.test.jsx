
import React from 'react';
import { shallow } from 'enzyme';
import Login from './index';

describe('Login Component', () => {
  const history = {
    push: jest.fn(),
    replace: jest.fn(),
  };

  it('should render Login component', () => {
    shallow(<Login history={history} />);
  });

});
