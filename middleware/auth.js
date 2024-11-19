import passport from "passport";

const isAuthenticated = (req,res, next) => {
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('https://screen-wise.vercel.app/login');
  }
}

export default isAuthenticated;