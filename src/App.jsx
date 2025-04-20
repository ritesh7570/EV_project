// ...existing imports
import React, { useEffect, useState, useRef } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import EVTypePieChart from './components/EVTypePieChart';
import TopBrandsBarChart from './components/TopBrandsBarChart';
import EVYearTrendChart from './components/EVYearTrendChart';
import TopCitiesBarChart from './components/TopCitiesBarChart';
import EVSummaryCards from './components/EVSummaryCards';

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [evData, setEvData] = useState([]);
  const typingRef = useRef(null);
  const [topBrands, setTopBrands] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    fetch('/ev_data.json')
      .then(response => response.json())
      .then(data => {
        setEvData(data);
        setFilteredData(data);
        processTopBrands(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load data:", err);
        setLoading(false);
      });
  }, []);

  const processTopBrands = (data) => {
    const brandCount = {};
    data.forEach(ev => {
      const make = ev.Make;
      if (make) {
        brandCount[make] = (brandCount[make] || 0) + 1;
      }
    });

    const sorted = Object.entries(brandCount)
      .map(([make, count]) => ({ make, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setTopBrands(sorted);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = evData.filter(ev =>
      ev.Make.toLowerCase().includes(value) ||
      ev.City.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    const restartAnimation = () => {
      if (typingRef.current) {
        typingRef.current.classList.remove('typing-loop');
        void typingRef.current.offsetWidth;
        typingRef.current.classList.add('typing-loop');
      }
    };

    window.addEventListener('focus', restartAnimation);
    return () => window.removeEventListener('focus', restartAnimation);
  }, []);

  const handleContact = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const message = e.target.message.value;
    const mailtoLink = `mailto:ritesh0468@gmail.com?subject=Suggestion from ${name}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className={`dashboard-wrapper ${darkMode ? 'dark' : ''}`}>
      <Navbar />

      

      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-top-row">
            <h1 ref={typingRef} className="typing-loop">🔋 Hello, EV Enthusiast!</h1>
            <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>

          <div className="search-controls">
            <input
              type="text"
              placeholder="Search by brand or city..."
              value={search}
              onChange={handleSearch}
              className="search-input"
            />
            {search && (
              <button className="clear-search" onClick={() => setSearch('')}>
                ❌ Clear
              </button>
            )}
          </div>

          <p className="animated-subtitle">Welcome to the Electric Vehicle Dashboard</p>
          <p className="result-count">
            Showing {filteredData.length} result{filteredData.length !== 1 && 's'}
          </p>
      
        </div>
      </header>

      {loading ? (
        <div className="loader">🔄 Loading data...</div>
      ) : (
        <main className="dashboard-main">
          <section className="dashboard-section" id="summary" data-aos="fade-up">
            <EVSummaryCards evData={filteredData} />
          </section>

          <section className="dashboard-section" id="top-brands" data-aos="fade-up">
            <h2 className="section-title">Top 10 EV Brands</h2>
            <p className="chart-description">This chart shows the top 10 most registered EV brands across India.</p>
            <TopBrandsBarChart evData={filteredData} />
          </section>

          <section className="dashboard-section" id="type-chart" data-aos="fade-up">
            <h2 className="section-title">EV Types Distribution</h2>
            <p className="chart-description">Explore the distribution of EV </p>
            <EVTypePieChart evData={filteredData} />
          </section>

          <section className="dashboard-section" id="trend" data-aos="fade-up">
            <h2 className="section-title">EV Registration Trend</h2>
            <p className="chart-description">Check how EV registrations have evolved over the years.</p>
            <EVYearTrendChart evData={filteredData} />
          </section>

          <section className="dashboard-section" id="cities" data-aos="fade-up">
            <h2 className="section-title">Top Cities with EV Adoption</h2>
            <p className="chart-description">Cities leading the EV movement based on registration numbers.</p>
            <TopCitiesBarChart evData={filteredData} />
          </section>

          <section className="dashboard-section" id="contact" data-aos="fade-up">
            <h2 className="section-title">📬 Contact Us</h2>
            <form className="contact-form" onSubmit={handleContact}>
              <input type="text" name="name" placeholder="Your Name" required />
              <textarea name="message" placeholder="Your Message or Suggestion" rows="4" required></textarea>
              <button type="submit">Send Suggestion</button>
            </form>
          </section>
        </main>
      )}

      <footer className="dashboard-footer">
        <p>© 2025 EV Dashboard | Made with ⚡ by You</p>
      </footer>
    </div>
  );
}

export default App;
