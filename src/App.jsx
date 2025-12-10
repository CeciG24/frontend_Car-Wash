
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Reviews from "./pages/Reviews";
import Booking from "./pages/Booking";
import Portfolio from "./pages/Portfolio";
export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Booking" element={< Booking/>} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/Portfolio" element={<Portfolio />} />
      </Routes>
    </Router>
  );
}
