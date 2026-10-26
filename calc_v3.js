const n1Elem = document.getElementById("n1");
const n2Elem = document.getElementById("n2");
const calcolaBtn = document.getElementById("calcolaBtn")

const op = document.getElementById("operation");
const resElem = document.getElementById("result")
const error = document.getElementById("error")

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

//5 bottoni
for (const simbolo in operations) {
    const bottone = document.createElement("button")
    bottone.textContent = simbolo
    bottone.addEventListener("click", forOperation(bottone.textContent))
    contenitori[0].appendChild(bottone)
}

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

function executeComp(a, op, b) {
    return function () {
        try {
            valida(regole, n1Elem.value, n2Elem.value)
            const a = n1Elem.value
            const b = n2Elem.value

            resElem.textContent = ""
            const res = compute(scegliOperazione(op), a, b)
            resElem.textContent = formatta(a, op, b, res)
        } catch (err) {
            error.textContent = "Errore: " + err.message
        }
    }
}

//5
function forOperation(simbolo) {
    return function () {
        executeComp(n1Elem.value, simbolo, n2Elem.value)
    }
}

//6
function formatta(a, s, b, r) {
    return `${a} ${s} ${b} = ${r}`
}

calcolaBtn.addEventListener("click", forOperation(op.value))