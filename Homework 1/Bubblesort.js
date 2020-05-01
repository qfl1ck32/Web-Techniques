var numbers = [];
var n = 0;
var pivot;

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
    if (button.className === "fas fa-arrow-up") {
        button.className = "fas fa-arrow-down";
        text.style.display = 'none';
    } else {
        button.className = "fas fa-arrow-up";
        text.style.display = 'inline';
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
