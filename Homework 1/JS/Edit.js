window.addEventListener('click', function(e) {
  var to_edit = document.getElementById("editbox");
  if (!to_edit.contains(e.target)) {
    to_edit.style.display = 'none';
  }
})

function changeToResponsive() {
  var navbarClass = document.getElementById("navbar");
  if (navbarClass.className === "navigation_bar") {
    navbarClass.className += " responsive";
  }
  else {
    navbarClass.className = "navigation_bar";
  }
}

function look(text) {
  let inp = document.getElementById('id');
  inp.value = text;
  let form = document.getElementById('form_main');
  form.submit();
}


function setVal() {
  let todel = document.getElementById('to_delete');
  todel.value = "1";
  return 1;
}

function preview() {

  const preview = document.getElementById('Avatar');
  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}