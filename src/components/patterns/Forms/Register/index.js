import React, { useState } from 'react';

import { Lottie } from '@crello/react-lottie';

import errorAnimation from './animations/error.json';
import sucessAnimation from './animations/sucess.json';

import Button from '../../../commons/Button';
import TextField from '../../../forms/TextField';
import Box from '../../../layout/Box';
import Grid from '../../../layout/Grid';
import { Text } from '../../../foundation/Text';

const formStates = {
  DEFAULT: 'DEFAULT',
  LOADING: 'LOADING',
  DONE: 'DONE',
  ERROR: 'ERROR',
};

function FormContent() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    name: '',
  });

  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(formStates.DEFAULT);

  const userDTO = {
    username: userInfo.username,
    name: userInfo.name,
  };

  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(event) {
    const fieldName = event.target.getAttribute('name');

    setUserInfo({
      ...userInfo,
      [fieldName]: event.target.value,
    });
  }

  const isFormInvalid = userInfo.username.length === 0 || userInfo.name.length === 0;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        setIsFormSubmited(true);
        setSubmissionStatus(formStates.LOADING);

        fetch('https://instalura-api.vercel.app/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDTO),
        })
          .then((serverResponse) => {
            if (serverResponse.ok) {
              return serverResponse.json();
            }

            throw new Error('Não foi possível cadastrar o usuário');
          })
          .then(() => {
            setSubmissionStatus(formStates.DONE);
          })
          .catch((error) => {
            setSubmissionStatus(formStates.ERROR);
            setErrorMessage(error.message);
          });
      }}
    >

      <Text
        variant="title"
        tag="h1"
        color="tertiary.main"
      >
        Pronto para saber da vida dos outros?
      </Text>
      <Text
        variant="paragraph1"
        tag="p"
        color="tertiary.light"
        marginBottom="32px"
      >
        Você está a um passo de saber tudoo que está
        rolando no bairro, complete seu cadastro agora!
      </Text>

      <div>
        <TextField
          placeholder="Nome"
          name="name"
          value={userInfo.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <TextField
          placeholder="Usuário"
          name="username"
          value={userInfo.username}
          onChange={handleChange}
        />
      </div>

      <Button
        variant="primary.main"
        type="submit"
        disabled={isFormInvalid}
        fullWidth
      >
        Cadastrar
      </Button>

      {isFormSubmited && submissionStatus === formStates.DONE && (
        <Box
          display="flex"
          justifyContent="start"
        >
          <Lottie
            width="75px"
            height="75px"
            config={{ animationData: sucessAnimation, loop: false, autoplay: true }}
          />
          <Text
            variant="paragraph1"
            tag="p"
            color="tertiary.main"
          >
            Usuário criado com sucesso
          </Text>
        </Box>
      )}

      {isFormSubmited && submissionStatus === formStates.ERROR && (
        <Box
          display="flex"
          justifyContent="start"
        >
          <Lottie
            width="75px"
            height="75px"
            config={{ animationData: errorAnimation, loop: false, autoplay: true }}
          />
          <Text
            variant="paragraph1"
            tag="p"
            color="tertiary.main"
          >
            {errorMessage}
          </Text>
        </Box>
      )}
    </form>
  );
}

// eslint-disable-next-line react/prop-types
export default function FormRegister({ props }) {
  return (
    <Grid.Row
      marginLeft={0}
      marginRight={0}
      flex={1}
      justifyContent="flex-end"
    >
      <Grid.Col
        display="flex"
        paddingRight={{ md: '0' }}
        flex={1}
        value={{ xs: 12, md: 5, lg: 4 }}
      >
        <Box
          boxShadow="-10px 0px 24px rgba(7, 12, 14, 0.1)"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          flex={1}
          padding={{
            xs: '16px',
            md: '85px',
          }}
          backgroundColor="white"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        >
          <FormContent />
        </Box>
      </Grid.Col>
    </Grid.Row>
  );
}
