import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { faCircleArrowLeft, faCircleArrowRight, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/mailList'
import Navbar from '../../components/navbar/Navbar'
import Reserve from '../../components/reserve/Reserve'
import { AuthContext } from '../../context/AuthContext'
import { SearchContext } from '../../context/SearchContext'
import "./hotel.scss"
import useFetch from '../../hooks/useFetch'

const Hotel = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const { data, loading, error } = useFetch(`/hotels/find/${id}`)
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const {dates, options} = useContext(SearchContext);
    const [openModal, setOpenModal] = useState(false);
  
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
      console.log(diffDays);
      return diffDays;
    }
  
    const { user } = useContext(AuthContext)
    const days = dayDifference(dates[0].endDate, dates[0].startDate)
    const navigate = useNavigate();


    const photos = [
      {
        src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
      },
      {
        src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
      },
      {
        src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
      },
      {
        src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
      },
      {
        src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
      },
      {
        src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
      }
    ]

    const handleOpen = (i) => {
      setSlideNumber(i);
      setOpen(true);
    }

    const handleXClick = () => {
      setOpen(false);
    }

    const handlePrevious = (index) => {
      setSlideNumber(index-1)
      if(index<=0) {
        setSlideNumber(photos.length-1);
      }
    }

    const handleNext = (index) => {
        setSlideNumber(index+1);
        if(index >= photos.length-1) {
          setSlideNumber(0)
         }
      }

    const handleClick = () => {
      if (user) {
        setOpenModal(true);
      }
      else {
        navigate('/login');
      }
    }

    return (
    <div className="div">
    <Navbar />
    <Header type="list" />
      { loading ? "Wait... It's loading" : (
      <div className="hotelContainer">
        { open && 
        <div className="slider">
          <FontAwesomeIcon className="circleXmark" onClick={handleXClick} icon={faCircleXmark} />
          <FontAwesomeIcon className="circleArrowLeft" onClick={() => handlePrevious(slideNumber)} icon={faCircleArrowLeft} />
          <div className="sliderWrapper">
            <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
          </div>
          <FontAwesomeIcon className="circleArrowRight"onClick={() => handleNext(slideNumber)} icon={faCircleArrowRight} />
        </div> }
        <div className="hotelWrapper">
          <h1 className="hotelTitle"> {data.name} </h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span> {data.address} </span>
          </div>
          <span className="hotelDistance"> 
          Excellent location - {data.distance}m from center 
          </span>
          <span className="hotelPriceHighlight">
          Book a stay over {data.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">  
          {data.photos?.map((photo, i) => (
            <div className='hotelImgWrapper' key={i}>
              <img onClick={() => handleOpen(i)} src={photo} alt="hotel" className="hotelImg" />
            </div>
          ))} 
          </div>
          <div className="hotelDetails"> 
            <div className="hotelDetailsTexts"> 
              <h1 className="hotelTitle"> Stay in the heart of {data.city} </h1>
              <p className="hotelDesc"> {data.desc} </p>
            </div>
             <div className="hotelDetailsPrice"> 
              <h1> Perfect for a {days} nights </h1>
              {data.rating && <span> Located in israel are puncte de {data.rating} </span>}
              <h2> <b> {days * data.cheapestPrice * options.room}$ </b> ({days} nights) </h2>
              <button onClick={handleClick}> Reserve or book now </button>
          </div>
          </div>
        </div>
      </div> )}
          {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
      <MailList />
      <Footer />
    </div>
  )
}

export default Hotel