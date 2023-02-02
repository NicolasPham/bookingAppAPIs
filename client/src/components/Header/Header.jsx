import React, { useContext, useState } from "react";

import "./header.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { listItem } from "../../constant/listItem";

// Date picker
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

const Header = ({ page }) => {
  //////////////////////////////////////////////
  const handleActive = (e) => {
    console.log(e);
  };

  //------Date---------
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  //------Options---------
  const [destination, setDestination] = useState("");
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [openOptions, setOpenOptions] = useState(false);

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  //? HandleSearch
  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { city: destination, date: date, options: options } })
    navigate("/hotels", { state: { destination, date, options } });
  };

  //////////////////////////////////////////////
  return (
    <section className="flex-column al-center jc-center header">
      <div className="flex jc-center al-center headerList">
        {listItem.map((item, index) => (
          <div
            className="flex al-center headerItem"
            key={index}
            onClick={handleActive}
          >
            <FontAwesomeIcon icon={item.icon} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {page === "home" && (
        <>
          <div className="headerContent">
            <h1>A lifetime of discounts? It's Genius</h1>
            <p>
              Get rewarded for your travels - unlock instant savings of 10% or
              more with a free Nicolas Booking account
            </p>
            <button>Sign in / Register</button>
          </div>
          <div className="flex al-center headerSearch">
            <div className="searchItem">
              <FontAwesomeIcon icon={faBed} className="icon" />
              <input
                type="text"
                placeholder="Where are you going?"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="searchItem">
              <FontAwesomeIcon icon={faCalendarDays} className="icon" />
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
            </div>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
              />
            )}
            <div className="searchItem">
              <FontAwesomeIcon icon={faPerson} className="icon" />
              <span onClick={() => setOpenOptions(!openOptions)}>
                {`${options.adult} adult - ${options.children} children - ${options.room} room`}
              </span>

              {openOptions && (
                <div className="flex-column options">
                  <div className="item">
                    <span>Adult</span>
                    <div className="adjust">
                      <button
                        disabled={options.adult <= 1}
                        onClick={() => handleOptions("adult", "d")}
                      >
                        -
                      </button>
                      <span>{options.adult}</span>
                      <button onClick={() => handleOptions("adult", "i")}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="item">
                    <span>Children</span>
                    <div className="adjust">
                      <button
                        disabled={options.children <= 0}
                        onClick={() => handleOptions("children", "d")}
                      >
                        -
                      </button>
                      <span>{options.children}</span>
                      <button onClick={() => handleOptions("children", "i")}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="item">
                    <span>Room</span>
                    <div className="adjust">
                      <button
                        disabled={options.room <= 1}
                        onClick={() => handleOptions("room", "d")}
                      >
                        -
                      </button>
                      <span>{options.room}</span>
                      <button onClick={() => handleOptions("room", "i")}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="searchItem">
              <button onClick={handleSearch}>Search</button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Header;
