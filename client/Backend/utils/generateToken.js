import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  if (!user || typeof user !== 'object') {
    throw new Error('Invalid user payload for token');
  }

  return jwt.sign(
    { id: user._id, role: user.role }, // <-- pastikan ada `role`
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

export default generateToken;
