const QUESTIONS = [
  {
    t: "¿Qué etiqueta HTML se usa para crear un enlace?",
    a: ["<a>", "<link>", "<href>", "<url>"],
    c: 0
  },
  {
    t: "¿Qué selector CSS selecciona un elemento con id \"principal\"?",
    a: ["#principal", ".principal", "principal", "*principal"],
    c: 0
  },
  {
    t: "¿Cuál es la sintaxis correcta para declarar una función llamada sumar?",
    a: ["function sumar(a,b) { return a+b; }", "func sumar(a,b) { return a+b; }", "function: sumar(a,b) { return a+b; }", "def sumar(a,b): return a+b"],
    c: 0
  }
];

const quizDiv = document.getElementById("quiz");
QUESTIONS.forEach((q,i)=>{
  const d = document.createElement("div");
  d.className = "q";
  d.innerHTML = `<p><b>Q${i+1}.</b> ${q.t}</p>` + q.a.map((opt,j)=>{
    return `<div><label><input type="radio" name="q${i}" value="${j}"> ${opt}</label></div>`;
  }).join("");
  quizDiv.appendChild(d);
});

const SCORE_KEY = "fs01Score";
try {
  const prev = localStorage.getItem(SCORE_KEY);
  if (prev !== null) {
    document.getElementById("result").innerHTML = `<p>Último puntaje: <b>${prev}%</b></p>`;
  }
} catch (e) {
  /* ignore */
}

document.getElementById("finish").addEventListener("click", ()=>{
  let ok = 0;
  QUESTIONS.forEach((q,i)=>{
    const sel = document.querySelector(`input[name="q${i}"]:checked`);
    if (sel && +sel.value === q.c) ok++;
  });
  const pct = Math.round(100 * ok / QUESTIONS.length);
  const cls = pct>=80 ? "ok" : "bad";
  document.getElementById("result").innerHTML = `<p>Correctas: ${ok}/${QUESTIONS.length}. Score: <b class="${cls}">${pct}%</b></p>`;
  try {
    localStorage.setItem(SCORE_KEY, pct);
  } catch (e) {
    /* ignore */
  }
});
