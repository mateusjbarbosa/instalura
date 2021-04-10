import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Footer from '../../commons/Footer';
import Menu from '../../commons/Menu';
import Modal from '../../commons/Modal';
import SEO from '../../commons/SEO';

import Box from '../../layout/Box';

import FormRegister from '../../patterns/Forms/Register';

export const WebsitePageContext = React.createContext({
  toggleRegisterModal: () => {},
});

export default function WebsitePageWrapper({
  children,
  seoProps,
  pageBoxProps,
  menuProps,
}) {
  const [isModalOpen, setModalState] = useState(false);

  return (
    <WebsitePageContext.Provider
      value={{
        toggleRegisterModal: () => {
          setModalState(!isModalOpen);
        },
      }}
    >
      <SEO
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...seoProps}
      />

      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...pageBoxProps}
      >
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setModalState(false);
          }}
        >
          {(modalProps) => (
            <FormRegister propsDoModal={modalProps} />
          )}
        </Modal>

        {menuProps.display && (
          <Menu
            onSignUpClick={() => setModalState(true)}
          />
        )}
        {children}

        <Footer />
      </Box>
    </WebsitePageContext.Provider>
  );
}

WebsitePageWrapper.defaultProps = {
  seoProps: {},
  pageBoxProps: {},
  menuProps: {
    display: true,
  },
};

WebsitePageWrapper.propTypes = {
  seoProps: PropTypes.shape({
    headTitle: PropTypes.string,
  }),
  menuProps: PropTypes.shape({
    display: PropTypes.bool,
  }),
  pageBoxProps: PropTypes.shape({
    backgroundImage: PropTypes.string,
    backgroundRepeat: PropTypes.string,
    backgroundPosition: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
};
