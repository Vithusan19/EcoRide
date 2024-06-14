import React from "react";
import vehicle1 from "../assets/1.jpg";
import "../styles/Readmore.css";

const Readmore = () => {
  return (
    <div className="Readmore">
      <div>
        <h2>Carpooling From Malabe to Kirulapone</h2>
      </div>
      <div className="first-read">
        <div className="image">
          <img alt="img" src={vehicle1} />
        </div>
        <div className="des">
          <h2> Malabe - 7.15 AM</h2>

          <h2>Kirulapone - 8.30 AM </h2>
          <div className="des-text">
            <h3>Route Plan:</h3>
            <p className="para-text">
              <strong>
                Start at 7:15 am from Malabe &gt; Palawatta &gt; Chandrika
                Kumarathunga Mawatha &gt; Beddagana &gt; Pitakotte &gt; Nugedoga
                &gt; High Level Road &gt; Kirulapone &gt; Reach at 8.30am
                Colombo 6 (Near Kirulapone). Leave at 6.00pm. Reach back at
                7.00pm.
              </strong>
            </p>
            <div className="list">
              <ul>
                <li>
                  <strong>Vehicle Number: CAF-6228</strong>
                </li>
                <li>
                  <strong>Vehicle Model: Suzuki WagonR</strong>
                </li>
                <li>
                  <strong>Driver Name: Mr. Sadheera Gunawardena</strong>
                </li>
                <li>
                  <strong>Driver Gender:Male</strong>
                </li>
                <li>
                  <strong>Seat Cost: Rs. 4000</strong>
                </li>
                <li>
                  <strong>Air Condition: AC</strong>
                </li>
                <li>
                  <strong>No.Of Seats: 4</strong>
                </li>
                <li>
                  <strong>Preference: Dont Smoke</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="button-container">
        <button className="requ-but">Request Ride</button>
      </div>
    </div>
  );
};

export default Readmore;
