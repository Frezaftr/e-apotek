import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/userApi";
import { useAuth } from "../context/AuthContext";

function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user, login, loading } = useAuth(); // ⬅️ Ambil loading

  useEffect(() => {
    if (!loading && user) {
      navigate("/Produk");
    }
  }, [user, loading, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser(form);
      login(userData);
      window.dispatchEvent(new Event('userChanged')); // ⬅️ Tambahin ini bro
      navigate("/Produk");
    } catch (err) {
      alert(err.response?.data?.message || "Login gagal");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-800 to-indigo-900 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Masuk ke e-Apotek</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* form input */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition">
            Masuk
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Belum punya akun?{" "}
          <Link to="/SignUp" className="text-blue-700 hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
