import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Produk from './pages/Produk';
import Kontak from './pages/Kontak';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './index.css'; // atau './App.css' sesuai tempat kamu letakkan Tailwind


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-0 px-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/SignIn" element={<SignIn/>} />
          <Route path="/SignUp" element={<SignUp/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
