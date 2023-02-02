import './singleHotel.scss';
/**************** Font Awesome *****************/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faArrowRight,
  faLocationDot, faXmark
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from 'react';
import {useFetch} from '../../hooks/useFetch.js'
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext.js';



const SingleHotel = () => {
/***************************************************/
const location = useLocation();
const path = location.pathname.split('/')[2];
    const { data, loading } = useFetch(`/hotels/${path}`)

    const { user } = useContext(AuthContext);
    const [authorize, setAuthorize] = useState(false);
    const navigate = useNavigate();

    const handleReserve = () => {
        if (!user) return navigate('/login');

        setAuthorize(!authorize);
    }

    const imgList = data.photos || ["Loading", "Loading", "Loading"]

const [showImg, setShowImg] = useState(false);
const [imgIndex, setImgIndex] = useState(0);

const handleShowImg = (i) => {
    setShowImg(true);
    setImgIndex(i);
}

const handleSlide = (direction) => {
    let newImgIndex;
    
    if (direction === "l") {
        newImgIndex = imgIndex === 0 ? imgList.length-1 : imgIndex-1;
    } else {
        newImgIndex = imgIndex === imgList.length-1 ? 0 : imgIndex+1;
    }
    setImgIndex(newImgIndex);
}

    /**** useContext ***/
    const { date, options } = useContext(SearchContext)

    const Milisecond_perday = 24 * 60 * 60 * 1000;
    const dayDifference = (date1, date2) => {
        if (!date1 && !date2) return 1;
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDiff / Milisecond_perday) + 1;
    }

    const days = date[0] ? dayDifference(date[0].endDate, date[0].startDate) : 1;

/***************************************************/
  return (<>
    {loading ? "Loading" : <section className="flex-column single">
          {authorize && <span style={{ color: "green", fontSize: 20 }}>You have been authorized to reserve</span>}
        <header>
            <div className="flex-column content">
                <h1>{data.name}</h1>
                <div className="flex address">
                    <span><FontAwesomeIcon icon={faLocationDot} /></span>
                    <span>{data.address}</span>
                </div>
                <p>Exellent location - {data.distance}m from the airport</p>
            </div>
              <button onClick={handleReserve}>Reserve or Book Now!</button>
        </header>
        <div className="img">
              {imgList.map((item, index) => (
                <img key={index} src={item} alt="" onClick={() => handleShowImg(index)} />
            ))}
        </div>

        {showImg && <div className="showImg">
            <FontAwesomeIcon icon={faXmark} className="close" onClick={() => setShowImg(false)} />
            <div className="singleImg">
                <FontAwesomeIcon icon={faArrowLeft} className="arrow" onClick={() => handleSlide("l")}/>
                  <img src={imgList[imgIndex]} alt="" />
                <FontAwesomeIcon icon={faArrowRight} className="arrow" onClick={() => handleSlide("r")}/>
            </div>
        </div>}
    
        <div className="flex info">
            <div className="content">
                <h1>{data.title}</h1>
                <p>{data.desc}</p>
            </div>

            <div className="flex-column price">
                  <h2>Perfect for {days}-night stay</h2>
                <p>Located in the real heart of Toronto, this property has an excellent location score of 9.8!</p>
                  <p><b>${data.cheapestPrice * days * options.room}</b> ({days} nights - {options.room} room(s))</p>
                  <button onClick={handleReserve}>Reserve or Bool Now!</button>
            </div>
        </div>
    </section>}
    </>)
}

export default SingleHotel
