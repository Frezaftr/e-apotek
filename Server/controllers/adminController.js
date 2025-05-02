import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && admin.password === password) {
    const token = generateToken({ id: admin._id, role: 'admin' }); // ⬅️ include role
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token,
    });
  } else {
    res.status(401).json({ message: "Email atau password salah" });
  }
};
