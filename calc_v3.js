const n1Elem = document.getElementById("n1");
const n2Elem = document.getElementById("n2");
const calcolBtn = document.getElementById("calcolaBtn")

const op = document.getElementById("operation");
const resElem = document.getElementById("result")

let interval

//JS OBJ = hashmap -> k,v
const operations = {
    '+': (a,b) => a + b,
    '-': (a,b) => a - b,
    '*': (a,b) => a * b,
    '/': (a,b) => {
        if (b === 0) throw new Error("Denominator is zero.");
        return a/b
    },
    '**': (a,b) => a ** b,
    'MAX': (a,b) => a > b ? a:b,
    'MIN': (a,b) => a < b ? a:b,
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
    clearInterval (interval)
})


//eseguo quando html è renderizzatp
document.addEventListener("DOMContentLoaded", () => {
    //setTimeout | setInterval (metodi di temporizzazione)
    let i = 0
    setTimeout(() => console.log("pipoz"), 2000)
    interval = setInterval(() => console.log("pipoz" + i++), 6000)

    //clearTimeout()
    //clearInterval()
})

n1Elem.addEventListener("input", (e) => {
    let v = e.target.value
    if (v.length >= 10) {
        //n1Elem.disabled = true
        //n1Elem.readOnly = true
        n1Elem.value = v.slice(0,10)
    }
    console.log(typeof v)
})