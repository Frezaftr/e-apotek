const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role, // ⬅️ pastikan ini masuk ke token
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

