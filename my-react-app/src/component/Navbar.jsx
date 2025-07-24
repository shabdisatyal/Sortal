import { Link } from 'react-router-dom';
import "../Pages/App.css";
import "../Pages/Visualize.jsx";
import { useState } from "react";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="Navbar">
      <b>
        <div className="Nav-items">
          <Link to="/">HOME</Link>
        </div>
        <div className="Nav-items">
          <Link to="/Alert">ALERT</Link>
        </div>
        {/* PROGRESS with dropdown */}
        <div 
          className="Nav-items dropdown"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <Link to="/Stats">PROGRESS</Link> 
          {dropdownOpen && (
            <div className="dropdown-content">
              <Link to="/Stats/Update">Update</Link>
              <Link to="/Stats/Analyze">Analyze</Link>
              <Link to="/Stats/Visualize">Visualize</Link>
              <Link to="/Stats/Draft">Draft</Link>
            </div>
          )}
        </div>

        <div className="Nav-items">
          <Link to="/Account">ACCOUNT</Link>
        </div>
      </b>
    </div>
  );
}

export default Navbar;
