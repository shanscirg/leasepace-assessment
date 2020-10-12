import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/Search.css';


const Search = () => {

    const [city, setCity] = useState();
    const [cityInfo, setCityInfo] = useState([]);
    const [message, setMessage] = useState();

    const queryUrl = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

    const getHighlightedText = (cityName, searchedLetters) => {
        const parts = cityName.split(new RegExp(`(${searchedLetters})`, 'gi'));
        return <span> {parts.map((part, i) =>
            <span key={i} style={part.toLowerCase() === searchedLetters.toLowerCase() ? { backgroundColor: 'yellow' } : {}}>
                { part }
            </span>)
        }</span>;
    }

    useEffect(() => {
        city &&
            axios.get(queryUrl)
                .then(res => {
                    console.log(res.data)
                    const results = res.data.filter(obj => {
                        return obj.city.toLowerCase().includes(city.toLowerCase());
                    })
                    console.log(results);
                    setCityInfo(results);
                    setMessage();
                    if (!results.length) {
                        setMessage('We couldn\'t find that city. Please try again!');
                    }
                });
    }, [city])

    const handleInputChange = e => {
        setCity(e.target.value);
    }

    const numberWithCommas = x => {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <section className='city-section'>
            <div className='form-div'>
                <header>
                    <h1 className='title'>Search for a U.S. City!</h1>
                </header>
                <form onSubmit={e => e.preventDefault()}>
                    <label className='city-search' htmlFor='city'>
                        <input type='text' name='city' id='city' onChange={handleInputChange} placeholder='Enter city...'></input>
                    </label>
                    <i className="fa fa-search search-icon" />
                </form>
            </div>
            {message &&
                <p>{message}</p>
            }
            {cityInfo &&
                cityInfo.map(matchingCity => {
                    let cityName = getHighlightedText(matchingCity.city, city);
                    return (
                        <div className='results-div'>
                            <h2>{cityName}, {matchingCity.state}</h2>
                            <p>Population: {numberWithCommas(matchingCity.population)}</p>
                            <p>Growth from year 2000 to 2013: {matchingCity.growth_from_2000_to_2013}</p>
                            <p>Latitude: {matchingCity.latitude}</p>
                            <p>Longitude: {matchingCity.longitude}</p>
                        </div>
                    )
                })
            }
        </section>
    )
}

export default Search;