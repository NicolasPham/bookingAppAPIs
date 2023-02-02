import React from "react";
import "./home.scss";

import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/Header/Header";

import { guestLove } from "../../constant/properties";
import PropertyList from "../../components/propertyList/PropertyList";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import City from "../../components/city/City";


const Home = () => {
  /****** Fetching data **********/

  /*****************************/
  return (
    <section className="home">
      <Navbar />
      <Header page={"home"} />

      <City />

      <div className="featuredContainer">
        <div className="browser">
          <h1>Browse by property type</h1>
          <PropertyList />
        </div>

        <div className="guestLove">
          <h1>Home guests love</h1>
          <div className="listItem">
            {guestLove.map((item, index) => (
              <article key={index}>
                <img src={item.img} alt="" />
                <div className="text">
                  <h1>{item.name}</h1>
                  <span className="price">Price start from ${item.price}</span>
                  <span>
                    <button>{item.rate}</button> - {item.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <MailList />
        <Footer />
      </div>
    </section>
  );
};

export default Home;
