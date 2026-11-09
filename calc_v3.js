const n1Elem = document.getElementById("n1");
const n2Elem = document.getElementById("n2");
const calcolaBtn = document.getElementById("calcolaBtn")

const op = document.getElementById("operation");
const resElem = document.getElementById("result")
const error = document.getElementById("error")

const aiutoElem = document.getElementById("aiuto")

const contenitori = document.getElementsByClassName("contenitore")

const LIMIT = 1000000
let interval



//JS OBJ = hashmap -> k,v
const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => {
        if (b === 0) throw new Error("Denominator is zero.");
        return a / b
    },
    '**': (a, b) => Math.pow(a, b),
    '%': (a, b) => {
        if (b === 0) throw new Error("Denominator is zero.");
        return a % b
    },
    'MAX': (a, b) => a > b ? a : b,
    'MIN': (a, b) => a < b ? a : b,
}

//4
const regole = [
    (t1, t2) => {
        if (t1 === "" || t2 === "") throw new Error("Inserire entrambi i numeri.")
    },
    (t1, t2) => {
        if (Math.abs(t1) > LIMIT || Math.abs(t2) > LIMIT) throw new Error("Numeri troppo grandi.")
    },
]


//3
function scegliOperazione(simbolo) {
    const v = operations[simbolo]
    if (v === undefined) throw new Error("Operazione non supportata: " + simbolo)
    return v
}

function compute(f, a, b) { return f(a, b) }

//4
function valida(regole, t1, t2) {
    for (const regola of regole) {
        regola(t1, t2)
    }
}

function executeOp(a, op, b) {
    try {
        valida(regole, n1Elem.value, n2Elem.value)
        const a = Number(n1Elem.value)
        const b = Number(n2Elem.value)

        resElem.textContent = ""
        const res = compute(scegliOperazione(op), a, b)
        resElem.textContent = formatta(a, op, b, res)
    } catch (err) {
        error.textContent = "Errore: " + err.message
    }
}

//5
function forOperation(simbolo) {
    return () => {
        executeOp(n1Elem.value, simbolo, n2Elem.value)
    }
}

//6
function formatta(a, s, b, r) {
    return `${a} ${s} ${b} = ${r}`
}

//5 bottoni
for (const simbolo in operations) {
    const bottone = document.createElement("button")
    bottone.textContent = simbolo
    bottone.addEventListener("click", forOperation(bottone.textContent))
    contenitori[0].appendChild(bottone)
}



//SEZIONE B
function update() {
    return executeOp(n1Elem.value, op.value, n2Elem.value)
}
calcolaBtn.addEventListener("click", update)
op.addEventListener("change", update)
n1Elem.addEventListener("input", update)
n2Elem.addEventListener("input", update)

document.addEventListener("keydown", keyManager(keyMap))

const keyMap = {
    Enter: update,
    Escape: () => {
        n1Elem.value = ""
        n2Elem.value = ""
        resElem.textContent = ""
        error.textContent = ""
    },
}

const helpMap = {
    "n1": "Inserire il primo numero",
    "n2": "Inserire il secondo numero",
    "operation": "Selezionare l'operazione da eseguire",
    "calcolaBtn": "Cliccare per calcolare il risultato",
}

function keyManager(keyMap) {
    return (e) => {
        const userAction = keyMap[e.key]
        if (userAction !== undefined) userAction()
    }
}

function gestoreTesto(helpMap, keyOf, show) {
    return (e) => {
        
    }
}