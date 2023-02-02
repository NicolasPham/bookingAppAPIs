import "./mailList.scss";

const MailList = () => {
  return (
      <section className="flex mail">
          
          <div className="container">
              <h1>Save Time, Save Money!</h1>
              <p>Sign up and we'll send the best deals to you</p>

              <div className="flex form">
                  <form action="">
                      <input type="text" placeholder="Your email" />
                      <button>Subcribe</button>
                  </form>
                  
              </div>
          </div>
    </section>
  )
}

export default MailList