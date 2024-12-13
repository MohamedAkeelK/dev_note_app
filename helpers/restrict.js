import jwt from "jsonwebtoken";
const TOKEN_KEY = process.env.TOKEN_KEY || "areallylonggoodkey";

const restrict = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    const decoded = jwt.verify(token, TOKEN_KEY); // Verify token
    req.user = decoded; // Attach user info to req object
    next(); // Proceed to the next middleware
  } catch (error) {
    console.log("Authorization Error:", error);
    res.status(403).json({ error: "Unauthorized" });
  }
};

export default restrict;
