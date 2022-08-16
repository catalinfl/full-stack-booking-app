import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import '../../css/navbar.css'
import '../../css/header.css'
import '../../css/home.css'
import Featured from '../../components/featured/Featured'
import PropertyList from '../../components/propertyList/PropertyList'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'

const Home = () => {
  return (
    <div>
    <Navbar />
    <Header />
    <div className="homeContainer"> 
      <Featured />
      <h1 className="homeTitle"> Browse by property type </h1>
      <PropertyList />
      <h1 className='homeTitle'> Homes guests love </h1>
      <FeaturedProperties />
     </div>
    </div>
  )
}

export default Home