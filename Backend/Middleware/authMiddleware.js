import jwt from 'jsonwebtoken';

export default function authMiddleware(req,res,next){
    try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify token (support either env var name)
    const secret = process.env.JWT_SECRET || process.env.jwt_secret;
    const decoded = jwt.verify(token, secret);
    console.log("decoded:",decoded);
    req.user = decoded; // attach user data to request object

    next(); // allow API to continue
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}


