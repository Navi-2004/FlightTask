import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "../css/HomeScreen.css";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

const HomeScreen = () => {
  const userId = localStorage.getItem("userId");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = 2000; // 3 seconds

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, []);
  if (isLoading) return <Loading />;
  return (
    <div>
      <Navbar />
      {userId ? (
        <Link to={`/profile/${userId}`} className="link">
          <h3 className="profile" readOnly>
            P
          </h3>
        </Link>
      ) : (
        <Link to="/login" className="link">
          <h3 className="profile" readOnly>
            P
          </h3>
        </Link>
      )}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Explore the World with AeroBook</h1>
          <p style={{ marginBottom: 2.5 + "em", marginTop: 2 + "em" }}>
            Your journey begins here. Find the perfect flights at unbeatable
            prices.
            <br />
          </p>
          <Link
            to="/flight"
            className="cta-button link"
            style={{ marginTop: 2 + "em" }}
          >
            Start Your Adventure
          </Link>
        </div>
        {/* Add an image or illustration representing travel */}
        <img src="images/home.jpg" alt="Travel" className="hero-image" />
      </section>
      <section className="about-us-section">
        <div>
          <img
            src="images/about.gif"
            alt="Our Team"
            className="about-us-image"
          />
        </div>

        <div className="about-us-content">
          <h2>About Us</h2>
          <p>
            AeroBook is dedicated to providing a seamless and enjoyable travel
            experience. With a passion for connecting people to their dream
            destinations, we offer a wide range of flights at competitive
            prices.
          </p>
          <p>
            Our mission is to make travel accessible to everyone, whether it's
            for business, leisure, or adventure. We prioritize customer
            satisfaction, transparency, and reliability in every booking.
          </p>
          <p>
            Explore the world with confidence, knowing that YourFlightBooking is
            here to make your journey memorable. Join us in making every flight
            a new adventure!
          </p>
        </div>
      </section>

      <section class="unique-features-section">
        <h2>Discover Our Unique Features</h2>

        <div class="container">
          <div class="feature">
            <div class="feature-icon">
              <img src="images/earth.gif" alt="Map Icon" />
            </div>
            <div class="feature-content">
              <h3 class="feature-title">Interactive Destination Maps</h3>
              <p class="feature-description">
                Explore your destination with our interactive maps. View
                attractions, hotels, and more, all in one place.
              </p>
            </div>
          </div>

          <div class="feature">
            <div class="feature-icon">
              <img src="images/cashback.gif" alt="Payment Icon" />
            </div>
            <div class="feature-content">
              <h3 class="feature-title">Fast & Secure Payments</h3>
              <p class="feature-description">
                Enjoy seamless and secure transactions. Our fast payment system
                ensures a hassle-free booking experience.
              </p>
            </div>
          </div>

          <div class="feature">
            <div class="feature-icon">
              <img src="images/rain.gif" alt="Weather Icon" />
            </div>
            <div class="feature-content">
              <h3 class="feature-title">Real-time Weather Integration</h3>
              <p class="feature-description">
                Stay informed about the weather at your destination. Plan your
                trip better with up-to-date weather forecasts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2 style={{ marginTop: 3 + "em" }}>How It Works</h2>
        <div class="containerstep">
          <div class="timeline">
            <ul>
              <li>
                <div class="timeline-content step" id="step1">
                  <div class="step-content">
                    <h2>Explore Flights</h2>
                    <p>
                      Users can view available flights easily. Explore a wide
                      range of destinations, airlines, and travel options. Find
                      the perfect flight that suits your preferences and budget.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div class="timeline-content step" id="step2">
                  <div class="step-content">
                    <h2>Search & Select</h2>
                    <p>
                      Search for desired flights and select the best option. Use
                      advanced search filters to narrow down your choices.
                      Compare prices, flight durations, and amenities to make an
                      informed decision.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div class="timeline-content step" id="step3">
                  <div class="step-content">
                    <h2>Book Securely</h2>
                    <p>
                      Book the selected flight securely using our reliable
                      system. Enjoy a seamless booking process with multiple
                      payment options. Your personal and payment information is
                      kept safe and secure.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div class="timeline-content step" id="step4">
                  <div class="step-content">
                    <h2>Earn Points</h2>
                    <p>
                      Users earn points for each booking. Join our loyalty
                      program and accumulate points with every flight
                      reservation. Redeem your points for discounts, upgrades,
                      or exclusive travel perks.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div class="timeline-content step" id="step5">
                  <div class="step-content">
                    <h2>Cashback Reward</h2>
                    <p>
                      After 10 bookings, get a cashback of 2000 for the next
                      transaction. Enjoy the benefits of being a loyal customer.
                      Save on your future travel expenses and make the most out
                      of your booking experience.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeScreen;
