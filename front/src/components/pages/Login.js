import React from 'react';
import { useMediaQuery } from 'react-responsive';
import DesktopLogin from '../components/login/DesktopLogin';
import MobileLogin from '../components/login/MobileLogin';

function Login() {
  const DesktopOrTablet = useMediaQuery({
    query: '(min-width: 767px)'
  })
  const Mobile = useMediaQuery({
    query: '(max-width: 767px)'
  })
  return (
    <>
      {DesktopOrTablet && (<DesktopLogin />)}
      {Mobile && (<MobileLogin />)}
    </>
  )
}

export default Login
