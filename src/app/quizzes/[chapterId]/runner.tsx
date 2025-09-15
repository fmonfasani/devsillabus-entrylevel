"use client";
import { useMemo, useState } from "react";

type MCQ = { type:"mcq"; question:string; options:string[]; answer:number };
type TF  = { type:"tf";  question:string; answer:boolean };
type Q = MCQ | TF;

export default function QuizRunner({ quiz, chapterId }:{
  quiz: { id:number; title:string; passingScore:number; questions?: Q[] };
  chapterId: number;
}) {
  const questions: Q[] = useMemo(() => (quiz.questions ?? []) as Q[], [quiz]);
  const [answers, setAnswers] = useState<any>({});
  const [result, setResult] = useState<null | {score:number; passed:boolean}>(null);

  function setAns(i:number, v:any){ setAnswers(a => ({...a, [i]: v})); }

  function grade() {
    let correct = 0;
    questions.forEach((q, i) => {
      if (q.type === "mcq" && answers[i] === (q as any).answer) correct++;
      if (q.type === "tf"  && String(answers[i]) === String((q as any).answer)) correct++;
    });
    const score = Math.round((correct / questions.length) * 100);
    setResult({ score, passed: score >= (quiz.passingScore ?? 70) });
  }

  return (
    <div className="mt-6 space-y-6">
      {questions.map((q, i) => (
        <div key={i} className="rounded border p-4">
          <div className="font-medium">{i+1}. {q.question}</div>
          {q.type === "mcq" ? (
            <div className="mt-2 space-y-2">
              {(q as any).options.map((opt:string, idx:number) => (
                <label key={idx} className="flex items-center gap-2">
                  <input type="radio" name={`q${i}`} onChange={()=>setAns(i, idx)} />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          ) : (
            <div className="mt-2 flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name={`q${i}`} onChange={()=>setAns(i, true)} /> Verdadero
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name={`q${i}`} onChange={()=>setAns(i, false)} /> Falso
              </label>
            </div>
          )}
        </div>
      ))}

      <button onClick={grade} className="rounded border px-4 py-2 hover:bg-gray-50">Calificar</button>

      {result && (
        <div className="rounded border p-4">
          <div>Puntaje: <b>{result.score}%</b></div>
          <div>{result.passed ? "Aprobado 🎉" : "No aprobado"}</div>
        </div>
      )}
    </div>
  );
}
