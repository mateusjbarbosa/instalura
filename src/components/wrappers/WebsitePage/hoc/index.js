import React from 'react';

import WebsitePageWrapper from '../index';

import WebsiteGlobalProvider from '../../provider';

export default function websitePageHOC(PageComponent, { pageWrapperProps }) {
  return (props) => (
    <WebsiteGlobalProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <WebsitePageWrapper {...pageWrapperProps}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <PageComponent {...props} />
      </WebsitePageWrapper>
    </WebsiteGlobalProvider>
  );
}
