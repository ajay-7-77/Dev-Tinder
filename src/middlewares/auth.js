const adminAuth = (req, res, next) => {
  const token = "abc";
  const isAuthorised = token === "abc";
  if(!isAuthorised){
      res.status(401).send("Unauthorise Request")
    } else{
        console.log("check auth")
      next();
    }
};

module.exports = {
    adminAuth
}