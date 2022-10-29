import React from 'react'
import { useMediaQuery } from 'react-responsive'
import DesktopLanding from '../components/LandingPage/DesktopLanding'
import MobileLanding from '../components/LandingPage/MobileLanding'

function Landpage() {
  const DesktopOrTablet = useMediaQuery({
    query: '(min-width: 1200px)'
  })
  const Mobile = useMediaQuery({
    query: '(max-width: 1200px)'
  })
  return (
    <>
    {DesktopOrTablet && (<DesktopLanding />)}
    {Mobile && (<MobileLanding />)}
    </>
  )
}

export default Landpage
