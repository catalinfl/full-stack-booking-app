import React from 'react'
import './featuredProperties.scss'
import useFetch from '../../hooks/useFetch';


const FeaturedProperties = () => {

  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");
  const photos = [
    'https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o='
  ]

  return (
    <div className="fp">
    { loading ? "Loading" : (
      <>
      {data.map((item) => ( 
      <div className="fpItem" key={item._id}>
      <img src={photos} alt="testPhoto" className="fpImg" />
      <span className="fpName"> {item.name} </span>
      <span className="fpCity"> {item.city} </span>
      <span className="fpPrice"> Starting from ${item.cheapestPrice} </span>
      {item.rating && <div className="fpRating">
        <button> {item.rating} </button>
        <span> Excellent </span>
      </div>
    }
    </div>
  ))}
    </>
    ) }
  </div>
  
)
 }

export default FeaturedProperties