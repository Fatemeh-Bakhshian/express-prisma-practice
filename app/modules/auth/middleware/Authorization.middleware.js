const authorizCheck = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "Invalid data sent",
        message: "you do not have permission to perform this action",
      });
    }
    next();
  };
};

export default authorizCheck;
