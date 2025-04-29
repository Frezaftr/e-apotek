import jwt from 'jsonwebtoken';

// Middleware untuk proteksi route (user harus login)
export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Cek apakah ada Authorization header dan Bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded);

    // Simpan data user dari token ke request object
    req.user = {
      _id: decoded.id || decoded._id,  // jaga-jaga jika pakai "id" atau "_id"
      role: decoded.role || 'user'     // default role jika tidak ada di token
    };

    next();
  } catch (err) {
    console.error('JWT verify error:', err.message);
    res.status(401).json({ message: 'Token not valid' });
  }
};

// Middleware cek apakah user adalah Admin
export const isAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') {
    return next();
  }
  res.status(403).json({ message: 'Not authorized as admin' });
};

// Middleware cek apakah user adalah User biasa
export const isUser = (req, res, next) => {
  if (req.user?.role === 'user') {
    return next();
  }
  res.status(403).json({ message: 'Not authorized as user' });
};
