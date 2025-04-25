import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Komponen Avatar dengan inisial
const AvatarInitial = ({ name }) => {
  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    return words.length === 1 ? words[0][0] : words[0][0] + words[1][0];
  };

  return (
    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-semibold text-sm">
      {getInitials(name).toUpperCase()}
    </div>
  );
};

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => setOpen(!open);

  // Logout handler with event dispatch
  const handleLogout = () => {
    logout();
    window.dispatchEvent(new Event("userChanged")); // ⬅️ Dispatch event ke listener lain
    setOpen(false); // Tutup mobile menu juga
  };

  return (
    <nav className="bg-white shadow-md font-poppins sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-700 hover:text-emerald-500 transition duration-300"
        >
          e-Apotek
        </Link>

        <div className="hidden md:flex items-center space-x-6 text-blue-700 font-semibold">
          <Link to="/" className="hover:text-emerald-500 transition duration-300">
            Home
          </Link>
          <Link to="/produk" className="hover:text-emerald-500 transition duration-300">
            Produk
          </Link>

          {user ? (
            <>
              <Link to="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-blue-700 hover:text-emerald-500 transition" />
              </Link>

              <div className="relative group ml-4">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <AvatarInitial name={user.name} />
                  <span className="font-medium text-blue-700 group-hover:text-emerald-500 transition">
                    {user.name}
                  </span>
                </div>

                <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg transform scale-95 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all duration-200 ease-in-out z-10">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/SignIn"
                className="ml-4 px-3 py-1 bg-white border border-blue-700 text-blue-700 rounded hover:bg-emerald-500 transition"
              >
                Sign In
              </Link>
              <Link
                to="/SignUp"
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-emerald-500 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-emerald-600 focus:outline-none">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div className={`md:hidden ${open ? "block" : "hidden"} bg-emerald-50 px-4 pb-4 space-y-2 transition-all duration-300 ease-in-out`}>
        <Link to="/" onClick={toggleMenu} className="block text-emerald-600 font-medium hover:text-emerald-500 transition">
          Home
        </Link>
        <Link to="/produk" onClick={toggleMenu} className="block text-emerald-600 font-medium hover:text-emerald-500 transition">
          Produk
        </Link>

        {user ? (
          <>
            <Link to="/cart" onClick={toggleMenu} className="flex items-center space-x-2 text-emerald-600">
              <ShoppingCart size={20} />
              <span>Keranjang</span>
            </Link>
            <div className="flex items-center space-x-2 text-emerald-600">
              <AvatarInitial name={user.name} />
              <span>{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="block bg-red-500 text-white w-full py-1 rounded hover:bg-red-600 transition"
            >
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
