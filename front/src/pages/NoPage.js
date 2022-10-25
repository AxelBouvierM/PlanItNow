import React from 'react';
import { useMediaQuery } from 'react-responsive';
import DesktopError from '../components/404/Desktop404'
import MobileError from '../components/404/Mobile404'

function NoPage() {
  const DesktopOrTablet = useMediaQuery({
    query: '(min-width: 767px)'
  })
  const Mobile = useMediaQuery({
    query: '(max-width: 767px)'
  })

	return (
		<>
      {DesktopOrTablet && <DesktopError />}
      {Mobile && <MobileError />}
    </>
		)
};

export default NoPage;
