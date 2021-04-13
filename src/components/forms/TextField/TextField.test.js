import React from 'react';

import { render, screen } from '../../../infra/test/testUtils';

import TextField from '.';

describe('<TextField />', () => {
  test('renders component', () => {
    render(
      <TextField
        placeholder="Nome"
        value="test"
        onChange={() => {}}
        name="name"
      />
      ,
    );

    const textField = screen.getByPlaceholderText(/nome/i);

    expect(textField).toMatchSnapshot();
  });
});
