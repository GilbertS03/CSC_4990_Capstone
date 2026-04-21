import { NavLink } from "react-router-dom";
import "../../theme.css";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-custom">
      <div className="footer-links">
        <NavLink className="footer-link" to="/about" end>
          About Us
        </NavLink>
        <NavLink className="footer-link" to="/contact" end>
          Contact Us
        </NavLink>
      </div>
      <div className="footer-copy">
        © {new Date().getFullYear()} WoMM Lab System
      </div>
    </footer>
  );
}

export default Footer;
