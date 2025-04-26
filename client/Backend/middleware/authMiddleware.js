import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded); // ✅ letakkan di sini
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token not valid' });
  }
};

export const isAdmin = (req, res, next) => {
  console.log('User from token:', req.user); // ✅ di dalam sini
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

export const isUser = (req, res, next) => {
  if (req.user && req.user.role === 'user') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as user' });
  }
};
