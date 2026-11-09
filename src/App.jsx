import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import { pageMetadata } from './data/sitePages';

const Services = lazy(() => import('./pages/Services'));
const Booking = lazy(() => import('./pages/Booking'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Reviews = lazy(() => import('./pages/Reviews'));

function PageHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, description, canonical } = pageMetadata(pathname);
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <PageHead />
      <Suspense fallback={<p className="shell route-loading" role="status">Cargando página…</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Booking" element={<Booking />} />
          <Route path="/Portfolio" element={<Portfolio />} />
          <Route path="/Reviews" element={<Reviews />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
