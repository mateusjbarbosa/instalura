import React from 'react';

import PropTypes from 'prop-types';

import MenuWrapper from './styles/MenuWrapper';

import Logo from '../../../theme/Logo';

import Button from '../Button';

import { Text } from '../../foundation/Text';

const links = [
  { text: 'Home', url: '/' },
  { text: 'Perguntas Frequentes', url: '/faq' },
  { text: 'Sobre', url: '/about' },
];

export default function Menu({ onSignUpClick }) {
  return (
    <MenuWrapper>
      <MenuWrapper.LeftSide>
        <Logo />
      </MenuWrapper.LeftSide>
      <MenuWrapper.CentralSide>
        {links.map((link) => (
          <li key={link.url}>
            <Text variant="smallestException" tag="a" href={link.url}>
              {link.text}
            </Text>
          </li>
        ))}
      </MenuWrapper.CentralSide>
      <MenuWrapper.RightSide>
        <Button type="button" ghost variant="secondary.main" href="/app/login">
          Entrar
        </Button>
        <Button type="button" variant="primary.main" onClick={onSignUpClick}>
          Cadastrar
        </Button>
      </MenuWrapper.RightSide>
    </MenuWrapper>
  );
}

Menu.propTypes = {
  onSignUpClick: PropTypes.func.isRequired,
};
