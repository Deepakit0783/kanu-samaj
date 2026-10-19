import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProfileCard from "../components/ProfileCard";

const Home = () => {

  const profiles = [
    {
      id: 1,
      name: "Neha Kumari",
      age: 25,
      city: "Delhi, India",
      education: "M.A.",
      profession: "Teacher",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500"
    },

    {
      id: 2,
      name: "Pooja Kumari",
      age: 27,
      city: "Bihar, India",
      education: "MBA",
      profession: "HR Manager",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"
    },

    {
      id: 3,
      name: "Deepak Kumar",
      age: 22,
      city: "Sitamarhi, India",
      education: "BCA",
      profession: "Software Devlopment Engineer",
      img: "/Deepak.jpg"
    },

    {
      id: 4,
      name: "Amit Kumar",
      age: 26,
      city: "Mumbai, India",
      education: "B.Ed",
      profession: "Teacher",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"
    }
  ];

  return (
    <>

      <Navbar />

      <Hero />

      {/* Search Section */}

      <section className="search-section">

        <div className="search-title">
          <span>🔍</span>

          <div>
            <h2>Find Your</h2>
            <h2>Perfect Partner</h2>
          </div>
        </div>

        <div className="search-box">

          <div>
            <label>I am looking for</label>

            <select>
              <option>Bride</option>
              <option>Groom</option>
            </select>
          </div>

          <div>
            <label>Age</label>

            <select>
              <option>22</option>
              <option>25</option>
              <option>28</option>
              <option>30</option>
            </select>
          </div>

          <div>
            <label>Location</label>

            <select>
              <option>Select City</option>
              <option>Delhi</option>
              <option>Bihar</option>
              <option>Mumbai</option>
            </select>
          </div>

          <div>
            <label>Education</label>

            <select>
              <option>Any</option>
              <option>Graduate</option>
              <option>Post Graduate</option>
            </select>
          </div>

        <a href="/profiles">
  <button className="search-btn">
    🔍 Search
  </button>
</a>

          

        </div>

      </section>


      {/* Featured Profiles */}

      <section className="profiles-section">

        <h2 className="section-title">
          Featured Profiles
        </h2>

        <div className="profiles-container">

          {profiles.map((profile) => (
<ProfileCard
  key={profile.id}
  id={profile.id}
  img={profile.img}
  name={profile.name}
  age={profile.age}
  city={profile.city}
  education={profile.education}
  profession={profile.profession}
/>

          ))}

        </div>

        <button className="all-profile-btn">
          View All Profiles
        </button>

      </section>

    </>
  );
};

export default Home;