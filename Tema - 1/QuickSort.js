function changeToResponsive() {
  var navbarClass = document.getElementById("navbar");
  if (navbarClass.className === "navigation_bar") {
    navbarClass.className += " responsive";
  }
  else {
    navbarClass.className = "navigation_bar";
  }
}

function hideShow(id) {
  var button = document.getElementById(id + 'Button');
  var text = document.getElementById(id);
  if (button.className === "fas fa-arrow-up") {
    button.className = "fas fa-arrow-down";
    text.style.display = 'none';
  }
  else {
    button.className = "fas fa-arrow-up";
    text.style.display = 'block';
  }
}
