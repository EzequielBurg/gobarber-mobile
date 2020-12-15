import React from 'react';
import { render } from '@testing-library/react-native';

import SignIn from '../../pages/SignIn';

jest.mock('@react-navigation/native', () => {
  return { useNavigation: jest.fn() };
});

describe('SignIn Page', () => {
  it('should contains email/passord inputs', () => {
    const { getByPlaceholderText } = render(<SignIn />);

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
  });
});
