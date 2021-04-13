import React from 'react';

import user from '@testing-library/user-event';

import {
  render,
  act,
  screen,
  waitFor,
} from '../../../../infra/test/testUtils';

import LoginForm from '.';

const onSubmit = jest.fn();

onSubmit.mockImplementation((event) => {
  event.preventDefault();
});

describe('<LoginForm />', () => {
  describe('when from fields are valid', () => {
    test('complete the sumission', async () => {
      await act(async () => render(
        <LoginForm onSubmit={onSubmit} />,
      ));

      expect(screen.getByRole('button')).toBeDisabled();

      const inputUser = screen.getByPlaceholderText('Usuário');

      user.type(inputUser, 'someusername');

      await waitFor(() => expect(inputUser).toHaveValue('someusername'));

      const inputPassword = screen.getByPlaceholderText('Senha');

      user.type(inputPassword, 'somepassword');

      await waitFor(() => expect(inputPassword).toHaveValue('somepassword'));

      expect(screen.getByRole('button')).not.toBeDisabled();

      user.click(screen.getByRole('button'));

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('when form fields are invalid', () => {
    test('displays the respective errors', async () => {
      render(<LoginForm onSubmit={onSubmit} />);

      const inputUser = screen.getByPlaceholderText('Usuário');

      inputUser.focus();
      inputUser.blur();

      await waitFor(() => screen.getByRole('alert'));

      expect(screen.getByRole('alert')).toHaveTextContent('Seu usuário precisa ter ao menos 3 caracteres');
    });
  });
});
