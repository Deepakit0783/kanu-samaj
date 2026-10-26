import React from "react";

const SuccessStories = () => {

  const stories = [
    {
      id: 1,
      names: "Rahul & Priya",
      location: "Delhi, India",
      year: "2025",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=700",
      story:
        "Kanu Samaj Matrimonial ke through Rahul aur Priya ki mulaqat hui. Dono families ne ek dusre ko samjha aur aaj dono happily married hain."
    },
    {
      id: 2,
      names: "Amit & Neha",
      location: "Bihar, India",
      year: "2025",
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700",
      story:
        "Ek simple profile search se shuru hui baat ek khoobsurat rishte mein badal gayi. Amit aur Neha ne apne families ki sahmati se shaadi ki."
    },
    {
      id: 3,
      names: "Vikash & Pooja",
      location: "Mumbai, India",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=700",
      story:
        "Different cities mein rehne ke bawajood Kanu Samaj Matrimonial ne dono families ko connect kiya aur ek beautiful relationship ki shuruaat hui."
    },
    {
      id: 4,
      names: "Sanjay & Anjali",
      location: "Sitamarhi, Bihar",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=700",
      story:
        "Sanjay aur Anjali ne matrimonial platform par ek dusre ki profile dekhi. Baat-cheet ke baad families mili aur rishta shaadi tak pahunch gaya."
    }
  ];


  return (
    <div className="success-page">

      {/* Background Hearts */}
      <div className="success-bg-heart success-heart-one">
        ♥
      </div>

      <div className="success-bg-heart success-heart-two">
        ♥
      </div>


      {/* Header */}
      <div className="success-header">

        <span className="success-small-title">
          ❤️ Kanu Samaj Matrimonial ❤️
        </span>

        <h1>
          Our Success Stories
        </h1>

        <p>
          Kuch khoobsurat kahaniyan jo Kanu Samaj Matrimonial
          ke through ek naye rishte aur naye jeevan ki shuruaat bani.
        </p>

      </div>


      {/* Success Stats */}
      <div className="success-stats">

        <div className="success-stat-card">
          <span>💍</span>
          <h2>100+</h2>
          <p>Happy Marriages</p>
        </div>

        <div className="success-stat-card">
          <span>❤️</span>
          <h2>500+</h2>
          <p>Successful Matches</p>
        </div>

        <div className="success-stat-card">
          <span>👨‍👩‍👧‍👦</span>
          <h2>1000+</h2>
          <p>Registered Families</p>
        </div>

        <div className="success-stat-card">
          <span>🌸</span>
          <h2>50+</h2>
          <p>Cities Connected</p>
        </div>

      </div>


      {/* Stories */}
      <div className="success-section-title">

        <h2>
          💕 Beautiful Journeys
        </h2>

        <p>
          Real relationships, beautiful memories and new beginnings.
        </p>

      </div>


      <div className="success-grid">

        {stories.map((story) => (

          <div
            className="success-card"
            key={story.id}
          >

            {/* Image */}
            <div className="success-image">

              <img
                src={story.image}
                alt={story.names}
              />

              <span className="success-year">
                {story.year}
              </span>

            </div>


            {/* Content */}
            <div className="success-content">

              <div className="success-heart">
                ❤️
              </div>

              <h3>
                {story.names}
              </h3>

              <p className="success-location">
                📍 {story.location}
              </p>

              <p className="success-story-text">
                "{story.story}"
              </p>

              <div className="success-divider"></div>

              <span className="success-tag">
                💍 Happily Married
              </span>

            </div>

          </div>

        ))}

      </div>


      {/* Bottom CTA */}
      <div className="success-cta">

        <div className="success-cta-icon">
          ❤️
        </div>

        <h2>
          Aapki Story Kab Likhi Jayegi?
        </h2>

        <p>
          Apni profile banayein aur apne perfect life partner
          ki talaash aaj se shuru karein.
        </p>

        <div className="success-cta-buttons">

          <a href="/register">
            <button className="success-register-btn">
              👤 Create Profile
            </button>
          </a>

          <a href="/profiles">
            <button className="success-find-btn">
              🔍 Find Partner
            </button>
          </a>

        </div>

      </div>


      {/* Footer */}
      <div className="success-footer">

        <h3>
          ❤️ Rishton ki ek nayi shuruaat
        </h3>

        <p>
          Kanu Samaj Matrimonial
        </p>

        <span>
          🙏 Jai Baba Ganinath Ji Maharaj
        </span>

      </div>

    </div>
  );
};

export default SuccessStories;