const n1Elem = document.getElementById("n1");
const n2Elem = document.getElementById("n2");
const calcolBtn = document.getElementById("calcolaBtn")

const op = document.getElementById("operation");
const resElem = document.getElementById("result")

let interval

//JS OBJ = hashmap -> k,v
// tutte le op funzionano come devono
const operations = {
    '+': (a,b) => a + b,
    '-': (a,b) => a - b,
    '*': (a,b) => a * b,
    '/': (a,b) => {
        if (b === 0) throw new Error("Denominator is zero.");
        return a / b
    },
    '**': (a,b) => a ** b,
    '%': (a,b) => {
        if (b === 0) throw new Error("Denominator is zero.");
        return a % b
    },
    'MAX': (a,b) => a > b ? a:b,
    'MIN': (a,b) => a < b ? a:b,
    'AVG': (a,b) => Math.AVG(a,b),
}


function compute (f,a,b) {return f(a,b)}

calcolBtn.addEventListener ("click", function () {
    const a = Number(n1Elem.value)
    const b = Number(n2Elem.value)
    try {
        const res = compute(operations[op.value], a, b)
        resElem.textContent = res
    } catch (err) {
        resElem.textContent = err.message
    }
})