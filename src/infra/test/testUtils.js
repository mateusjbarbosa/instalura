import React from 'react';

import PropTypes from 'prop-types';

import { render } from '@testing-library/react';

import WebsiteGlobalProvider from '../../components/wrappers/WebsitePage/provider';

const AllTheProviders = ({ children, ...props }) => (

  // eslint-disable-next-line react/jsx-props-no-spreading
  <WebsiteGlobalProvider {...props}>
    {children}
  </WebsiteGlobalProvider>
);

AllTheProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

const customRender = (ui, options = {}) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const Provider = (props) => <AllTheProviders {...props} {...options.providerProps} />;

  return render(ui, { wrapper: Provider, ...options });
};

export * from '@testing-library/react';
export { customRender as render };
