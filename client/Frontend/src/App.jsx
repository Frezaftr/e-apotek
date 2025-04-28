import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Produk from './pages/Produk';
import Kontak from './pages/Kontak';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import { Toaster } from 'react-hot-toast';
import Cart from './pages/Cart';
import CheckoutPage from './pages/CheckoutPage';
import DetailTransaksiPage from './pages/DetailTransaksiPage';
import History from './pages/History';

import './index.css';

const AppContent = () => {
  const location = useLocation();

  //halaman yang tidak ingin tampilkan navbar
  const hideNavbarPaths = ['/LoginAdmin', '/admin/dashboard'];
  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className="pt-0 px-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/LoginAdmin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />  
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/detail-transaksi/:id" element={<DetailTransaksiPage />} />
          <Route path="/history" element={< History />} />
        </Routes>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
