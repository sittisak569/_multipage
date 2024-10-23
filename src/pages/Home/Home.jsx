import "./Home.css";
import best1 from "./best1.png";

function Home() {
  return (
    <div className="home-container">
      <div className="title1">
         <img src={best1} alt="My Image" style={{ maxWidth: '100%', height: 'auto' }}  />
      </div>
      <div className="tit1-1">
        <h3>
          <span className="highlight">Name :</span> sittisak sanitphon <br />
          <span className="highlight">Nickname :</span> Best <br />
          <span className="highlight">Age :</span> 19 <br />
          <span className="highlight">Educational Institution :</span> Sripathum University <br />
          <span className="highlight">Faculty :</span> Information Technology <br />
          <span className="highlight">Department :</span> Computer Science and Software Development Innovation
        </h3>
      </div>
      <div className="tit2-2">
        <h3>
        Hello, my name is best, I am from nakonsawan. I am 19 years old.
        </h3>
      </div>
    </div>
  );
}

export default Home;
