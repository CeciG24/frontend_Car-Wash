import { Link } from "react-router-dom";
import IGlogo from "./../../assets/Instagram_logo.png";
import WhatsApp from "./../../assets/whatsapp-logo.png";
import FBLogo from "./../../assets/Logo_de_Facebook.png";
import TikTokLogo from "./../../assets/tiktok_logo.png";

function Footer() {
  return (
    <footer className="text-center p-3 bg-dark text-light">
      © {new Date().getFullYear()} LS 1713 Car Detailing | Todos los derechos reservados
      <p className="fw-bold">Síguenos en redes</p>

      <div className="d-flex justify-content-center gap-4">
        <Link className="navbar-brand fw-bold" to="https://www.instagram.com/ls1713_detail/">
          <img src={IGlogo} alt="Instagram" style={{ height: "40px", marginRight: "10px" }} />
          ls1713_detail
        </Link>
        <Link className="navbar-brand fw-bold" to="https://www.facebook.com/profile.php?id=61577260941858">
          <img src={FBLogo} alt="Facebook" style={{ height: "40px", marginRight: "10px" }} />
          LS 1713 Carwash 
        </Link>
        <Link className="navbar-brand fw-bold" to="https://wa.me/2215568660">
          <img src={WhatsApp} alt="WhatsApp" style={{ height: "40px", marginRight: "10px" }} />
          2215568660
        </Link>
        <Link className="navbar-brand fw-bold" to="https://www.tiktok.com/@ls.1713">
          <img src={TikTokLogo} alt="TikTok" style={{ height: "40px", marginRight: "10px" }} />
          ls.1713
        </Link>
      </div>
    </footer>
  );
}

export default Footer;