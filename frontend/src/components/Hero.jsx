import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {

  const navigate = useNavigate();

  return (
    <section className="hero">

      {/* Left Content */}
      <div className="hero-content">

        <p className="small-title">
          💗 Kanu Samaj Matrimonial 💗
        </p>

        <h1>
          Apne Jeevan Sathi
          <br />
          <span>Ki Talash Yahan Se</span>
          <br />
          Shuru Karein
        </h1>

        <p className="hero-text">
          Kanu Samaj ke liye ek trusted aur secure matrimonial
          platform. Apne sapno ke jeevan saathi ko yahan paayein.
        </p>

        <div className="hero-buttons">

          {/* Register Page */}
          <button
            className="create-btn"
            onClick={() => navigate("/register")}
          >
            👤 Create Profile
          </button>

          {/* Profiles Page */}
          <button
            className="find-btn"
            onClick={() => navigate("/profiles")}
          >
            🔍 Find Partner
          </button>

        </div>

      </div>

      {/* Right Image */}
      <div className="hero-image">

        <img
          src="/kanu-couple.png"
          alt="Kanu Samaj Couple"
        />

      </div>

    </section>
  );
};

export default Hero;