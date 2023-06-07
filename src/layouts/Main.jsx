import Header from '../shared/Header/Header'
import Footer from '../shared/Footer/Footer'
import { Outlet } from 'react-router-dom'
import PopularClassesSection from '../components/PopularClasses/PopularClassesSection'
import PopularInstructorsSection from '../components/PopularInstructorsSection/PopularInstructorsSection'

const Main = () => {
  return (
    <div>
        <Header></Header>
        <PopularClassesSection></PopularClassesSection>
        <PopularInstructorsSection></PopularInstructorsSection>
        <Outlet></Outlet>
        
        <Footer></Footer>
    </div>
  )
}

export default Main