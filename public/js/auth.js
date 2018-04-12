  module.exports = {
    isAuthenticated: function (req, res, next) {
      var user = firebase.auth().currentUser;
      if (user !== null) {
        console.log("module export");
        req.user = user;
        next();
      } else {
        res.redirect('/login');
      }
    },
  }