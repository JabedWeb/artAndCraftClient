import React from 'react'
import PopularClassesSection from '../../components/PopularClasses/PopularClassesSection'
import PopularInstructorsSection from '../../components/PopularInstructorsSection/PopularInstructorsSection'
import Slider from './Slider'

const Home = () => {
  return (
    <>
        <Slider></Slider>
        <PopularClassesSection></PopularClassesSection>
        <PopularInstructorsSection></PopularInstructorsSection>
    </>
  )
}

export default Home