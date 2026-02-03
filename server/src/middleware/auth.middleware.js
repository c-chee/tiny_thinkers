const jwt = require("jsonwebtoken"); // Imports the jwt (jsonwebtoken) library, used to verify logins

// Midddleware function export
// Note: next -> function that moves to the next step in the req chain
// module.exports = (req, res, next) => {
//     const authHeader = req.headers.authorization; // reads the authorization HTTP header

//     // If there is not token from the user, block the req
//     // 401 = Unauthorized
//     if (!authHeader) {
//         return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1]; // Splits the token by the spaces so that it takes only the token part

//     // --- Token Verification ---
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifies token by checking for my JWT_SECRET token

//         req.user = decoded; // { id, email } attaches the user info to the req

//         next(); // This essentially tell tells the auth is a succcess and it can proceed to the next route
//     } catch (err) {
//         return res.status(401).json({ message: "Invalid token" }); // Invalid token res
//     }
// };

// Protect routes
module.exports = (req, res, next) => {
    const token = req.cookies?.token; // read cookie

    if (!token) {
        return res.status(401).redirect('/login'); // redirect to login if no token
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).redirect('/login');
    }
};
