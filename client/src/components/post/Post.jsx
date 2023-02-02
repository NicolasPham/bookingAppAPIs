import { Link } from "react-router-dom";
import "./post.scss";

const Post = ({item}) => {
  return (
    <article>
      <div className="postWrapper">
        <section className="left">
          <img src={item.photos[0]} alt="" />
        </section>

        <section className="middle">
          <h1>{item.name}</h1>
          <span>{item.distance}</span>

          <span className="free">Free airport taxi</span>

          <span className="bold">{item.title}</span>
          {/* <span className="size">{item.desc}</span> */}

          <div className="cancel">
            <h2>Free cancellation</h2>
            <p>You can cancel later, so lock in this great price today!</p>
          </div> 
        </section>

        <section className="right">
            <div className="rating">
              <span>Execllent</span>
              <button>{item.rating || "0.0"}</button>
            </div>

            <div className="price">
              <h3>From ${item.cheapestPrice}</h3>
              <span>Includes taxes and fees</span>
              <button>
              <Link to={`/hotels/${item._id}`} className="link">
                See availability
              </Link>
                </button>
            </div>
        </section>
      </div> 
    </article>
  )
}

export default Post
