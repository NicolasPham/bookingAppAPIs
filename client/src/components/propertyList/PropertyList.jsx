import React, { useState } from 'react';
import './propertyList.scss';
import { useFetch } from '../../hooks/useFetch';

import { propertyType } from '../../constant/properties';
import { useNavigate } from 'react-router-dom';

const PropertyList = () => {

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

    const { data, loading } = useFetch("/hotels/countByType?types=hotel,aparment")

    const [type, setType] = useState("")
    const navigate = useNavigate();

    const browseType = (type) => {
        setType(type);
        navigate("/hotels", { state: { type, date, options } })

    }

    return (<>
        {
            loading ? "Loading please wait" : <section className='propList'>
          {propertyType.map((item, index) => (
              <article key={index} onClick={() => browseType(data[index].type)}>
                  <img src={item.img} alt="" />
                  <div className="text">
                      <h1>{data.length > 0 ? data[index].type : "Loading"}</h1>
                      <p>{data.length > 0 ? data[index].count : "Loading"} properties</p>
                  </div>
              </article>
          ))}
            </section>
        }
    </>)
}

export default PropertyList