import React from 'react';

import { useRouter } from 'next/router';

import * as yup from 'yup';

import loginService from '../../../../services/login/loginService';

import Button from '../../../commons/Button';

import TextField from '../../../forms/TextField';

import useForm from '../../../../infra/hooks/forms/useForm';

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required('O usuário é obrigatório')
    .min(3, 'Seu usuário precisa ter ao menos 3 caracteres'),
  password: yup
    .string()
    .required('A senha é obrigatória')
    .min(8, 'Sua senha precisa ter ao menos 8 caracteres'),
});

export default function LoginForm() {
  const router = useRouter();

  const initialValues = {
    username: '',
    password: '',
  };

  const form = useForm({
    initialValues,
    onSubmit: (values) => {
      loginService.login({
        username: values.username,
        password: values.password,
      })
        .then(() => {
          router.push('/app/profile');
        });
    },
    async validateSchema(values) {
      return loginSchema.validate(values, {
        abortEarly: false,
      });
    },
  });

  return (
    <form id="RegisterForm" onSubmit={form.handleSubmit}>
      <TextField
        placeholder="Usuário"
        name="username"
        value={form.values.username}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        isTouched={form.touched.username}
        error={form.errors.username}
      />
      <TextField
        placeholder="Senha"
        name="password"
        type="password"
        value={form.values.password}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        isTouched={form.touched.password}
        error={form.errors.password}
      />

      <Button
        fullWidth
        type="submit"
        variant="primary.main"
        margin={{
          xs: '0 auto',
          md: 'initial',
        }}
        disabled={form.isFormDisabled}
      >
        Entrar
      </Button>
    </form>
  );
}
