// setLastVisited.js
const setLastVisitedMiddleware = (req, res, next) => {
    // Skip middleware for static files
    if (req.path.startsWith('/images')) {
      return next();
    }
  
    const currentDate = new Date();
    const lastVisitedCookie = req.cookies.lastVisited;
  
    // Set the lastVisited cookie with the current timestamp
    res.cookie('lastVisited', currentDate.toISOString(), {
      expires: new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
  
    next();
  };
  
  export default setLastVisitedMiddleware;
  