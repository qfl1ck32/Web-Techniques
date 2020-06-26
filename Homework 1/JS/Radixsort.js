var numbers = [];
var n = 0;
var baza = 10;

var ids = ["Detalii", "Implementare", "Complexitati", "AnalizaComplexitatiiTimp"];

var current = "Detalii";

function dynamic_page() {

  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    document.getElementById("article").innerHTML = this.responseText;
  }
  xhttp.open("GET", "Pages/RadixSort/Detalii.txt", true);
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
    xhttp.open("GET", "Pages/RadixSort/" + ids[i] + ".txt", true);
    xhttp.send();
  }
}

var RSCode =
  `void CountSortR(vector <int> &numere, int n, int exponent, int baza) {
    int cifra, i;
    vector <int> frecventa(baza), temporar(n);

    for (i = 0; i < n; ++i) {
        cifra = (numere.at(i) / exponent) % baza;
        ++frecventa.at(cifra);
    }

    for (i = 1; i < baza; ++i)
        frecventa.at(i) += frecventa.at(i - 1);

    for (i = n - 1; i > -1; --i) {
        cifra = (numere.at(i) / exponent) % baza;
        temporar.at(frecventa.at(cifra) - 1) = numere.at(i);
        --frecventa.at(cifra);
    }

    for (i = 0; i < n; ++i)
        numere.at(i) = temporar.at(i);
}

void RadixSort(vector <int> &v, int n, int baza) {
    int m = *max_element(v.begin(), v.end());
    long long int exponent;
    for (exponent = 1; m / exponent > 0; exponent *= baza)
        CountSortR(v, n, exponent, baza);
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
    dummy.value = RSCode;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}


function Maxim(numb, N) {
  let current = numb[0];
  for(let i = 1; i < N; ++i)
    if (numb[i] > current)
      current = numb[i];
  return current;
}


function MaxDigits(numb) {
  let ans = 0;
  while (numb | 0) {
    ++ans;
    numb /= 10;
  }
  return ans;
}

function addValues() {

    var inp = document.getElementById('input'),
        v = inp.value;

    var inp2 = document.getElementById('input2'), 
      v2 = inp2.value;

    if (v2 != "")
      baza = parseInt(v2);

    numbers = v.match(/[-]?\d+/g).map(Number);

    document.getElementById('initialList').innerHTML = numbers;

    RadixSort(numbers, numbers.length, 10);

    let k = MaxDigits(numbers[numbers.length - 1]);

    document.getElementById('sortedList').innerHTML = numbers;
    document.getElementById('doneOp').innerHTML = n;
    document.getElementById('bestCase').innerHTML = (numbers.length + baza) * k;
    document.getElementById('averageCase').innerHTML = (numbers.length + baza) * k;
    document.getElementById('worstCase').innerHTML = (numbers.length + baza) * k;
    document.getElementById('numOfElements').innerHTML = numbers.length;

    n = 0;

    inp.value = "";
}

function createText() {
		var aux = RSCode.split('\n');
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

function CountSort(numere, N, exponent, Baza) {
  n = n + Baza + N;
  let cifra, i;
  let frecventa = [], temporar = [];

  for (let i = 0; i < Baza; ++i)
    frecventa[i] = 0;

  for (let i = 0; i < N; ++i)
    temporar[i] = 0;

  for (i = 0; i < N; ++i) {
    cifra = ((numere[i] / exponent) | 0) % Baza;
    ++frecventa[cifra];
  }

  for (i = 1; i < Baza; ++i)
    frecventa[i] += frecventa[i - 1];

  for (i = N - 1; i > -1; --i) {
    cifra = ((numere[i] / exponent) | 0) % Baza;
    temporar[frecventa[cifra] - 1] = numere[i];
    --frecventa[cifra];
  }

  for (i = 0; i < N; ++i)
    numere[i] = temporar[i];
}

function RadixSort(numere, N, Baza) {
  let m = Maxim(numere, N), exponent;
  for (exponent = 1; (m / exponent | 0) > 0; exponent *= baza)
    CountSort(numere, N, exponent, baza);
}