import { useFetch } from "../../hooks/useFetch.js";
import { properties } from "../../constant/properties.js";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext.js";



const City = () => {
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ]);
      const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
      });

    const { data, loading } = useFetch(
        "/hotels/countByCity?cities=Toronto,Vancouver,Calgary"
    );

    const navigate = useNavigate();
    const { dispatch } = useContext(SearchContext);
    const handleSearch = (city) => {
        dispatch({ type: "NEW_SEARCH", payload: { city: destination, date: date, options: options } })
        navigate("/hotels", { state: { destination: city, date, options } });
        
    };
    

    return (<>
        {loading ? "Loading, please wait" : <div className="flex list">
            {properties.map((item, index) => (
                <article key={index} onClick={() => handleSearch(item.name)}>
                    <img src={item.img} alt="" />
                    <div className="text">
                        <h1>{item.name}</h1>
                        <h3>{data[index]} properties</h3>
                    </div>
                </article>
            ))}
        </div>}
    </>)
}

export default City
