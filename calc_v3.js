const n1Elem = document.getElementById("n1");
const n2Elem = document.getElementById("n2");
const calcolBtn = document.getElementById("calcolaBtn")

const op = document.getElementById("operation");
const resElem = document.getElementById("result")
const message = document.getElementById("messaggio")

const contenitori = document.getElementsByClassName("contenitore")

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
    'MAX': (a,b) => a > b ? a:b,
    'MIN': (a,b) => a < b ? a:b,
}

//4
const regole = [
    function notUndef(a,b) {return a!==undefined && b!==undefined},
    function tooBig(a,b) {return a<1000 && b<1000},
    function isSatanic(a,b) {return a!==666 && b!==666}
]

//3
function scegliOperazione(simbolo) {
    let f = operations[simbolo]
    if (!f) throw new Error("Operazione non supportata: "+simbolo)
        return f
}

function compute (f,a,b) {return f(a,b)}

//4
function valida(regole, t1, t2) {
    for (let i=0; i<regole.length; i++) {
        const r = regole[i]
        if (!r(t1,t2)) throw new Error("Regola violata: "+ r.name)
        }
}

//5
function perOperazione(simbolo) {
    return function () {
        const a = Number(n1Elem.value)
        const b = Number(n2Elem.value)
        
        message.textContent = ""
        try {
            const f = scegliOperazione(simbolo)
            resElem.textContent = formatta(a, simbolo, b, compute(f, a, b))
        } catch (err) {
            resElem.textContent = ""
            message.textContent = "Errore: " + err.message
        }
    }
}


//5 creo bottoni
for (const simbolo in operations) {
    const bottone = document.createElement("button")
    bottone.textContent = simbolo
    bottone.addEventListener("click", perOperazione(simbolo))
    contenitori[0].appendChild(bottone)
}

//6
function formatta(a,s,b,r) {
    return `${a} ${s} ${b} = ${r}`
}



calcolBtn.addEventListener ("click", function () {
    perOperazione(op.value)()
})