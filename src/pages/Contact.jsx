import React from "react";

const Contact = () => {
  return (
    <div className="contact-page">

      {/* Header */}
      <div className="contact-header">

        <div className="contact-heart">
          ❤️
        </div>

        <h1>Contact Kanu Samaj</h1>

        <p>
          Kanu Samaj Matrimonial se judi kisi bhi help, suggestion
          ya information ke liye humse contact karein.
        </p>

        <span className="available-badge">
          🟢 Available All Day
        </span>

      </div>


      {/* Main Contact Section */}
      <div className="contact-container">


        {/* Left Side */}
        <div className="contact-info">

          <h2>Let's Connect ❤️</h2>

          <p className="contact-intro">
            Aap apne jeevan saathi ki talaash, profile registration,
            partner search ya website se related kisi bhi sawal ke
            liye humse directly contact kar sakte hain.
          </p>


          {/* Name */}
          <div className="contact-card">

            <div className="contact-icon">
              👤
            </div>

            <div>
              <span>Contact Person</span>
              <h3>Deepak Kumar</h3>
            </div>

          </div>


          {/* Phone */}
          <div className="contact-card">

            <div className="contact-icon">
              📞
            </div>

            <div>
              <span>Phone</span>

              <h3>
                +91 70044 76330
              </h3>

              <a href="tel:+917004476330">
                Call Now
              </a>
            </div>

          </div>


          {/* WhatsApp */}
          <div className="contact-card">

            <div className="contact-icon">
              💬
            </div>

            <div>
              <span>WhatsApp</span>

              <h3>
                +91 70044 76330
              </h3>

              <a
                href="https://wa.me/917004476330"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>

          </div>


          {/* Email */}
          <div className="contact-card">

            <div className="contact-icon">
              📧
            </div>

            <div>
              <span>Email</span>

              <h3>
                deepakit0783@gmail.com
              </h3>

              <a href="mailto:deepakit0783@gmail.com">
                Send Email
              </a>
            </div>

          </div>


          {/* Location */}
          <div className="contact-card">

            <div className="contact-icon">
              📍
            </div>

            <div>
              <span>Location</span>

              <h3>
                Sitamarhi, Bihar, India
              </h3>
            </div>

          </div>


          {/* Instagram */}
          <div className="contact-card">

            <div className="contact-icon">
              📸
            </div>

            <div>
              <span>Instagram</span>

              <h3>
                @ss_deepak
              </h3>

              <a
                href="https://www.instagram.com/ss_deepak/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow on Instagram
              </a>
            </div>

          </div>

        </div>


        {/* Right Side */}
        <div className="contact-form">


          <div className="form-top-icon">
            💌
          </div>

          <h2>Send Us a Message</h2>

          <p>
            Aapka message hamare liye important hai.
            Neeche apni details aur message bhejein.
          </p>


          {/* Name */}
          <div className="form-group">

            <label>Your Name</label>

            <input
              type="text"
              placeholder="Enter your name"
            />

          </div>


          {/* Email */}
          <div className="form-group">

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
            />

          </div>


          {/* Mobile */}
          <div className="form-group">

            <label>Mobile Number</label>

            <input
              type="tel"
              placeholder="Enter your mobile number"
            />

          </div>


          {/* Message */}
          <div className="form-group">

            <label>Your Message</label>

            <textarea
              rows="6"
              placeholder="Write your message here..."
            ></textarea>

          </div>


          <button className="contact-submit">
            💌 Send Message
          </button>


          {/* Quick Contact */}
          <div className="quick-contact">

            <a
              href="tel:+917004476330"
              className="call-btn"
            >
              📞 Call
            </a>

            <a
              href="https://wa.me/917004476330"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              💬 WhatsApp
            </a>

          </div>

        </div>

      </div>


      {/* Bottom Message */}
      <div className="contact-bottom">

        <div className="bottom-heart">
          ❤️
        </div>

        <h2>
          Rishton ko jodiye, dilon ko milaiye
        </h2>

        <p>
          Kanu Samaj Matrimonial ka uddeshya samaj ke parivaron
          ko ek trusted platform par jodna aur jeevan saathi ki
          talaash ko simple banana hai.
        </p>

        <h3>
          🙏 Jai Baba Ganinath Ji Maharaj
        </h3>

      </div>

    </div>
  );
};

export default Contact;