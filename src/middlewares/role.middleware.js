export const RoleMiddleware = function (roles) {
  return function (req, res, next) {
    if (!req.user?.role) {
      return res.status(403).json({ msg: "Forbidden" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Forbidden" });
    }
    next();
  };
};
