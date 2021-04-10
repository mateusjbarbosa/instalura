import React from 'react';

import PropTypes from 'prop-types';

import styled, { css } from 'styled-components';
import get from 'lodash/get';

import breakpointsMedia from '../../../theme/utils/breakpointsMedia';
import propToStyle from '../../../theme/utils/propToStyle';

import { TextStyleVariants } from '../../foundation/Text';

import Link from '../Link';

const ButtonGhost = css`
  color: ${({ theme, variant }) => get(theme, `colors.${variant}.color`)};
  background-color: transparent;
`;

const ButtonDefault = css`
  color: ${({ theme, variant }) => get(theme, `colors.${variant}.contrastText`)};
  background-color: ${({ theme, variant }) => get(theme, `colors.${variant}.color`)};
`;

const ButtonWrapper = styled.button`
  border: 0;
  cursor: pointer;
  padding: 12px 26px;
  font-weight: bold;
  opacity: 1;
  border-radius: 8px;

  ${TextStyleVariants.smallestException}

  ${(props) => {
    if (props.ghost) {
      return ButtonGhost;
    }
    return ButtonDefault;
  }}

  transition: opacity ${({ theme }) => theme.transition};
  border-radius: ${(props) => props.theme.borderRadius};
  
  &:hover,
  &:focus {
    opacity: .5;
  }

  ${breakpointsMedia({
    xs: css`
      ${TextStyleVariants.smallestException}
    `,
    md: css`
     ${TextStyleVariants.paragraph1}
    `,
  })}

  &:disabled {
    cursor: not-allowed;
    opacity: .2;
  }

  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `};

  ${propToStyle('margin')}
  ${propToStyle('display')}
`;

const Button = ({ href, ...props }) => {
  const isLink = Boolean(href);
  const componentTag = isLink ? Link : 'button';

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ButtonWrapper as={componentTag} href={href} {...props} />
  );
};

Button.defaultProps = {
  href: undefined,
};

Button.propTypes = {
  href: PropTypes.string,
};

export default Button;
