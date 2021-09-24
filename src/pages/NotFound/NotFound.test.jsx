
import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './index';

describe('NotFound Component', () => {
    const history = {
        push: jest.fn(),
        replace: jest.fn(),
    };

    it('should render NotFound component', () => {
        shallow(<NotFound history={history} />);
    });

});
