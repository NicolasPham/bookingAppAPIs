import './hotel.scss';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/Header/Header';
import SingleHotel from '../../components/SingleHotel/SingleHotel';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';

const Hotel = () => {
  return (
    <div className="hotel">
      <Navbar/>
      <Header/>
      <SingleHotel/>
      <MailList/>
      <Footer/>
    </div>
  )
}

export default Hotel