import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Produk from './pages/Produk';
import Kontak from './pages/Kontak';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdminLogin from "./admin/pages/AdminLogin";
import Dashboard from "./admin/pages/AdminDashboard";
import AdminDashboard from "./admin/pages/AdminDashboard";
import './index.css'; // atau './App.css' sesuai tempat kamu letakkan Tailwind


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-0 px-0">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/SignIn" element={<SignIn/>} />
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
