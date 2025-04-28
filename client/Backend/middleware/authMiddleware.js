import jwt from 'jsonwebtoken';

// Middleware untuk proteksi route (user harus login)
export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded);

    req.user = {
      _id: decoded.id,        // Ambil dari decoded.id supaya cocok dengan kebutuhan _id
      role: decoded.role      // Tambahin role kalau kamu nanti mau pakai role di token
    };

    next();
  } catch (err) {
    console.error('JWT verify error:', err.message);
    res.status(401).json({ message: 'Token not valid' });
  }
};

// Middleware cek apakah user itu Admin
export const isAdmin = (req, res, next) => {
  console.log('User from token:', req.user);
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

// Middleware cek apakah user itu User biasa
export const isUser = (req, res, next) => {
  if (req.user && req.user.role === 'user') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as user' });
  }
};
