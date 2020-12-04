var numbers = [];
var n = 0;

var ids = ["Detalii", "Implementare", "Complexitati", "AnalizaComplexitatiiTimp"];

var current = "Detalii";

function dynamic_page() {

  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    document.getElementById("article").innerHTML = this.responseText;
  }
  xhttp.open("GET", "Pages/BubbleSort/Detalii.txt", true);
  xhttp.send();

  for (let i = 0; i < ids.length; ++i) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    let text = this.responseText;
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById(ids[i]).onclick = function() {
          document.getElementById(current).className -= "current_page";
          current = ids[i];
          document.getElementById(current).className += "current_page";
          document.getElementById("article").innerHTML = text;
          if (ids[i] == "Implementare")
            createText();
        };
      }
    };
    xhttp.open("GET", "Pages/BubbleSort/" + ids[i] + ".txt", true);
    xhttp.send();
  }
}

var BSCode =
`void interschimbare(int *a, int *b) {
	int aux = *a;
	*a = *b;
	*b = aux;
}

void BubbleSort(int *numere, int n) {
    int i, j;
    bool schimbat;
        for (i = 0; i < n - 1; i += 1) {
                schimbat = false;
                for (j = 0; j < n - i - 1; j += 1)
                    if (numere[j] > numere[j+1]) {
                        interschimbare(numere[j], numere[j + 1]);
                        schimbat = true;
                        }
                if (schimbat == false)
                    break;
        }
}`;

function changeToResponsive() {
    var navbarClass = document.getElementById("navbar");
    if (navbarClass.className === "navigation_bar") {
        navbarClass.className += " responsive";
    } else {
        navbarClass.className = "navigation_bar";
    }
}

function hideShow(id) {
    var button = document.getElementById(id + 'Button');
    var text = document.getElementById(id);
    let message = document.getElementById(id + "Message");
    if (button.className === "fas fa-arrow-up") {
        button.className = "fas fa-arrow-down";
        text.style.display = 'none';
        message.innerHTML = message.innerHTML.slice(0, -1);
    } else {
        button.className = "fas fa-arrow-up";
        text.style.display = 'inline';
        message.innerHTML = message.innerHTML + ":";
    }
}

function copycode() {

    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = BSCode;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function addValues() {

    var inp = document.getElementById('input'),
        v = inp.value;

    numbers = v.match(/[-]?\d+/g).map(Number);


    document.getElementById('initialList').innerHTML = numbers;

    BubbleSort(numbers, numbers.length);

    document.getElementById('sortedList').innerHTML = numbers;
    document.getElementById('doneOp').innerHTML = n;
    document.getElementById('bestCase').innerHTML = numbers.length;
    document.getElementById('averageCase').innerHTML = numbers.length * numbers.length;
    document.getElementById('worstCase').innerHTML = numbers.length * numbers.length;
    document.getElementById('numOfElements').innerHTML = numbers.length;

    n = 0;

    inp.value = "";
}

function createText() {
		var aux = BSCode.split('\n');
    for (var i = 0; i < aux.length; i++) {
        var newline = document.createElement("div");
        newline.className = "line";
        var t2 = document.createElement("span");
        var t = document.createTextNode(aux[i]);
        t2.appendChild(t);
        newline.appendChild(t2);
        document.getElementsByClassName('code')[0].appendChild(newline);
    }
}


function interschimbare(v, a, b) {
    var aux = v[a];
    v[a] = v[b];
    v[b] = aux;
}

function BubbleSort(numere, len) {
  var i, j, schimbat;
  for (i = 0; i < len - 1; i++) {
    n++;
    schimbat = 0;
    for (j = 0; j < len - i - 1; j++) {
      n++;
      if (numere[j] > numere[j + 1]) {
        interschimbare(numere, j, j + 1);
        schimbat = 1;
      }
    }
    if (!schimbat)
    break;
  }
}
