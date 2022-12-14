import { faCalendarDays } from '@fortawesome/free-regular-svg-icons'
import { useState, useContext } from 'react'
import { faBaby, faBed, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import './header.scss';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';


const Header = ({type}) => {
    
    const today = new Date();
    const twoDaysAway = new Date();
    twoDaysAway.setDate(today.getDate() + 2);

    const [dates, setDates] = useState([
        {
            startDate: new Date(today),
            endDate: new Date(twoDaysAway),
            key: 'selection',
            color: '#0071c2',
            showDateDisplay: true,
        }
    ])

    const [openDate, setOpenDate] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    const [destination, setDestination] = useState('');

    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })
    
    const handleOption = (name, operation) => {
        setOptions(prev => {return {
            ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
        };
    });
    };

    const navigate = useNavigate();

    const { searchDispatch } = useContext(SearchContext);
    const { user } = useContext(AuthContext);

    const handleSearch = () => {
        searchDispatch({type: "NEW_SEARCH", payload: {destination, dates, options}})
        navigate(`/hotels`, {state: {dates, options, destination}})
    }

    

  return (
    <div className='header'>
        <div className={type === "list" ? "headerContainer" : "headerContainer listMode"}>
            <div className='headerList'>
                <div className="headerListItem active">
                <FontAwesomeIcon icon={faBed} />
                <span> Stays </span>
                </div>
                <div className="headerListItem">
                <FontAwesomeIcon icon={faPlane} />
                <span> Flights </span>
                </div>
                <div className="headerListItem">
                <FontAwesomeIcon icon={faCar} />
                <span> Car rentals </span>
                </div>
                <div className="headerListItem">
                <FontAwesomeIcon icon={faBaby} />
                <span> Attractions </span>
                </div>
                <div className="headerListItem">
                <FontAwesomeIcon icon={faTaxi} />
                <span> Airport taxis </span>
                </div>
            </div>
            {type !== 'list' &&
            <div className='searchbar'>
                <h1 className="headerTitle"> A lifetime of discounts? It's genius </h1>
                <p className="headerDesc">
                    Get rewarded for your travels - unlock instant savings of 10% or more with a free premium account
                </p>
                <Link style={{textDecoration: 'none'}} to='/login'>
               {!user && <button className="headerBtn btnPrincipal"> Sign in / register </button>}
                </Link> 
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className='headerIcon' />
                        <input type="text" onChange={(e) => setDestination(e.target.value)}
                        placeholder='where are you going?'
                        className='headerSearchInput' />
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className='headerIcon'/>
                        <span onClick={() => setOpenDate(!openDate)}className='headerSearchText'> {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`} </span>
                        {openDate && <DateRange  editableDateInputs={true} onChange={item => setDates([item.selection])} moveRangeOnFirstSelection={true} ranges={dates}
                        className='date' minDate={new Date()} min={new Date()}  />}
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                        <span className='headerSearchText' onClick={() => setOpenOptions(!openOptions)}> {`${options.adult} adult - ${options.children} children - ${options.room} room` } </span>
                        {openOptions && <div className='options'>
                            <div className='optionItem'>
                                <span className="optionText"> Adult </span>
                                <div className="optionCounter">
                                <button className="optionCounterButton" disabled={options.adult < 1} onClick={() => handleOption("adult", "d")}> - </button>
                                <span className="optionCounterNumber"> {options.adult} </span>
                                <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}> + </button>
                                </div>
                            </div>
                            <div className='optionItem'>
                                <span className="optionText"> Children </span>
                                <div className="optionCounter">
                                <button disabled={options.children < 1} className="optionCounterButton" onClick={() => handleOption("children", "d")}> - </button>
                                <span className="optionCounterNumber"> {options.children} </span>
                                <button className="optionCounterButton" onClick={() => handleOption("children", "i")}> + </button>
                                </div>
                            </div>
                            <div className='optionItem'>
                                <span className="optionText"> Room </span>
                                <div className="optionCounter">
                                <button disabled={options.room < 1} className="optionCounterButton" onClick={() => handleOption("room", "d")}> - </button>
                                <span className="optionCounterNumber"> {options.room} </span>
                                <button className="optionCounterButton" onClick={() => handleOption("room", "i")}> + </button>
                                </div>
                            </div>
                        </div>
}
                    </div> 
                    <div className="headerSearchItem">
                        <button className="headerBtn" onClick={handleSearch} > Search </button>
                    </div>
                </div>
            </div>
}
        </div>
    </div>
  )
}

export default Header
