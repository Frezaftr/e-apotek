import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => setOpen(!open);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <nav className="bg-blue-600 bg-white shadow-md font-poppins sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-700 hover:text-emerald-500 transition duration-300">
          e-Apotek
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-blue-700 font-semibold">
          <Link to="/" className="hover:text-emerald-500 transition duration-300">Home</Link>
          <Link to="/produk" className="hover:text-emerald-500 transition duration-300">Produk</Link>
          <Link to="/kontak" className="hover:text-emerald-500 transition duration-300">Kontak</Link>

          {user ? (
            <div className="flex items-center space-x-3">
              <User className="text-emerald-600" />
              <span>{user.name}</span>
              <button onClick={handleLogout} className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/SignIn" className="ml-4 px-3 py-1 bg-white border border-blue-700 text-blue-700 rounded hover:bg-emerald-500 transition">
                Sign In
              </Link>
              <Link to="/SignUp" className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-emerald-500 transition">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-emerald-600 focus:outline-none">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${open ? "block" : "hidden"} bg-emerald-50 px-4 pb-4 space-y-2 transition-all duration-300 ease-in-out`}>
        <Link to="/" onClick={toggleMenu} className="block text-emerald-600 font-medium hover:text-emerald-500 transition">
          Home
        </Link>
        <Link to="/produk" onClick={toggleMenu} className="block text-emerald-600 font-medium hover:text-emerald-500 transition">
          Produk
        </Link>
        <Link to="/kontak" onClick={toggleMenu} className="block text-emerald-600 font-medium hover:text-emerald-500 transition">
          Kontak
        </Link>

        {user ? (
          <>
            <div className="flex items-center space-x-2 text-emerald-600">
              <User size={20} />
              <span>{user.name}</span>
            </div>
            <button onClick={handleLogout} className="block bg-red-500 text-white w-full py-1 rounded hover:bg-red-600 transition">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/SignIn" onClick={toggleMenu} className="block text-emerald-600 font-medium hover:text-emerald-500 transition">
              Sign In
            </Link>
            <Link to="/SignUp" onClick={toggleMenu} className="block text-white bg-emerald-600 px-3 py-1 rounded hover:bg-emerald-700 transition">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
