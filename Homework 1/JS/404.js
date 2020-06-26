function changeToResponsive() {
  var navbarClass = document.getElementById("navbar");
  if (navbarClass.className === "navigation_bar") {
    navbarClass.className += " responsive";
  }
  else {
    navbarClass.className = "navigation_bar";
  }
}

setTimeout(function() {
  window.location = "/home";
}, 2000);