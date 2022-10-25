import React from 'react'
import { useMediaQuery } from 'react-responsive';
import DesktopRegister from '../components/register/DesktopRegister';
import MobileRegister from '../components/register/MobileRegister'

function Register() {
  const DesktopOrTablet = useMediaQuery({
    query: '(min-width: 767px)'
  })
  const Mobile = useMediaQuery({
    query: '(max-width: 767px)'
  })
  return (
    <>
      {DesktopOrTablet && (<DesktopRegister />)}
      {Mobile && (<MobileRegister />)}
    </>
  )
}

export default Register
