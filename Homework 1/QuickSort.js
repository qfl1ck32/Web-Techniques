var numbers = [];
var n = 0;
var pivot;

var QSCode =
    `void interschimbare(int *a, int *b) {
	int aux = *a;
	*a = *b;
	*b = aux;
}

int partitie(int *v, int s, int d, int pivot) {
	int i = s - 1, j;
	for (register int j = s; j < d; ++j)
		if (v[j] < pivot)
			interschimbare(&v[++i], &v[j]);
	interschimbare(&v[i + 1], &v[d]);
	return (i + 1);
}

void QuickSort(int *v, int s, int d) {
	if (s < d) {
		int pi = partitie(v, s, d, v[d]);
		QuickSort(v, s, pi - 1);
		QuickSort(v, pi + 1, d);
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
    dummy.value = QSCode;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function addValues() {

    var inp = document.getElementById('input'),
        v = inp.value;

    numbers = v.match(/[-]?\d+/g).map(Number);


    document.getElementById('initialList').innerHTML = numbers;

    QuickSort(numbers, 0, numbers.length - 1);

    document.getElementById('sortedList').innerHTML = numbers;
    document.getElementById('doneOp').innerHTML = n;
    document.getElementById('bestCase').innerHTML = Math.floor(numbers.length * Math.log2(numbers.length));
    document.getElementById('averageCase').innerHTML = Math.floor(numbers.length * Math.log2(numbers.length));
    document.getElementById('worstCase').innerHTML = numbers.length * numbers.length;
    document.getElementById('numOfElements').innerHTML = numbers.length;

    n = 0;

    inp.value = "";
}

function createText() {
		var aux = QSCode.split('\n');
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

function partitie(v, s, d) {
    pivot = v[d];
    var i = s - 1,
        j = s;
    n += d - s;
    for (j; j < d; j++) {
        if (v[j] < pivot) {
            i++;
            interschimbare(v, i, j);
        }
    }
    interschimbare(v, i + 1, d);
    return (i + 1);
}


function QuickSort(v, s, d) {
    if (s < d) {
        n += 2;
        var pi = partitie(v, s, d);
        QuickSort(v, s, pi - 1);
        QuickSort(v, pi + 1, d);
    }
}
