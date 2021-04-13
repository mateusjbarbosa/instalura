import React from 'react';

import user from '@testing-library/user-event';

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

  describe('when field is valid', () => {
    describe('and user is typing', () => {
      test('the value must be updated', () => {
        const onChangeMock = jest.fn();

        render(
          <TextField
            placeholder="E-mail"
            value=""
            onChange={onChangeMock}
            name="email"
            isTouched
          />
          ,
        );

        const inputEmail = screen.getByPlaceholderText(/e-mail/i);
        const emailValue = 'samemail@email.com';

        user.type(inputEmail, emailValue);

        expect(onChangeMock).toHaveBeenCalledTimes(emailValue.length);
      });
    });

    describe('when field is invalid', () => {
      test('displays the respective error message', () => {
        render(
          <TextField
            placeholder="E-mail"
            value="samemail@email.com"
            onChange={() => {}}
            name="email"
            isTouched
            error="O campo email é obrigatório"
          />
          ,
        );

        const inputEmail = screen.getByPlaceholderText(/e-mail/i);

        expect(inputEmail).toHaveValue('samemail@email.com');
        expect(screen.getByRole('alert')).toHaveTextContent('O campo email é obrigatório');
        expect(inputEmail).toMatchSnapshot();
      });
    });
  });
});
