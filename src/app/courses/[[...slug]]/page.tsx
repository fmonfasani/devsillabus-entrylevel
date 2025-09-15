// app/courses/[[...slug]]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";

const COURSES = ["fullstack", "devops"] as const;
const LEVELS = ["entry", "mid", "senior", "expert", "staff"] as const;
const SUBPAGES = ["videos", "quiz", "lab", "peer-review", "english", "docs"] as const;
const WEEKS = Array.from({ length: 11 }, (_, i) => `week-${String(i).padStart(2, "0")}`) as const;

type Course = typeof COURSES[number];
type Level = typeof LEVELS[number];
type Sub = typeof SUBPAGES[number];
type Week = typeof WEEKS[number];

function isCourse(x: string): x is Course { return (COURSES as readonly string[]).includes(x); }
function isLevel(x: string): x is Level { return (LEVELS as readonly string[]).includes(x); }
function isWeek(x: string): x is Week { return (WEEKS as readonly string[]).includes(x); }
function isSub(x: string): x is Sub { return (SUBPAGES as readonly string[]).includes(x); }

// ----------------------- CONTENT REGISTRY (Week 0 fullstack/entry) -----------------------
type Content = {
  title: string;
  lesson?: {
    summary?: string[];
    objectives?: string[];
    checklist?: string[];
    schedule?: { day: string; activity: string; time: string }[];
  };
  videos?: { title: string; duration: string; url?: string; learn?: string[] }[];
  quiz?: {
    intro: string;
    instructions: string[];
    passScore: string;
    attempts: number;
    topics: string[];
    h5pPath?: string; // dónde montarás el quiz
  };
  lab?: {
    objective: string;
    rubric: { item: string; points: number }[];
    deliverables: string[];
    resources?: { title: string; href: string }[];
  };
  peer?: {
    checklist: string[];
    format: string[];
    scoringHint?: string;
  };
  english?: {
    vocabulary: { term: string; def: string; example: string }[];
    speaking: { level: string; lines: string[] }[];
    phrases?: string[];
  };
  docs?: {
    resources: { title: string; href: string }[];
    downloads?: { title: string; note?: string }[];
    validators?: { title: string; href: string }[];
  };
};

const REGISTRY: Partial<Record<Course, Partial<Record<Level, Partial<Record<Week, Content>>>>> > = {
  fullstack: {
    entry: {
      "week-00": {
        title: "Week 0 — Setup & First Website",
        lesson: {
          summary: [
            "Instalás VS Code, extensiones, Git y Node.",
            "Creás tu primera página HTML con CSS base (mobile-first).",
            "Publicás en un repo de GitHub y hacés deploy en subdominio.",
          ],
          objectives: [
            "Entorno listo y probado (VS Code, Git, Node).",
            "HTML semántico + CSS base separado.",
            "Deploy público en yourname.devsyllabus.com.",
          ],
          checklist: [
            "Repo con README.md y estructura organizada.",
            "3 secciones: About, Skills, Contact.",
            "Navegación interna + estilos consistentes.",
            "Validación HTML sin errores.",
            "Deploy accesible + enlace en el README.",
          ],
          schedule: [
            { day: "Monday", activity: "Videos 1–2 + setup", time: "2h" },
            { day: "Tuesday", activity: "HTML semántico + práctica guiada", time: "2h" },
            { day: "Wednesday", activity: "CSS base + responsive", time: "2h" },
            { day: "Thursday", activity: "Live Q&A + debugging", time: "1h" },
            { day: "Friday", activity: "Completar lab + pruebas móviles", time: "2h" },
            { day: "Saturday", activity: "Peer review (2 sitios)", time: "1h" },
            { day: "Sunday", activity: "Polish + entrega", time: "1h" },
          ],
        },
        videos: [
          {
            title: "Bienvenida & Roadmap",
            duration: "8 min",
            url: "https://www.youtube.com/embed/VIDEO_ID_WEEK0_INTRO",
            learn: ["Estructura del curso", "Entregables", "Cómo usar la plataforma"],
          },
          {
            title: "Setup Dev Environment",
            duration: "12 min",
            url: "https://www.youtube.com/embed/VIDEO_ID_SETUP",
            learn: ["VS Code + extensiones", "Git/Node instalados", "Pruebas básicas CLI"],
          },
          {
            title: "HTML/CSS en 20’",
            duration: "20 min",
            url: "https://www.youtube.com/embed/VIDEO_ID_HTML_CSS",
            learn: ["HTML semántico", "CSS base", "Demo en vivo"],
          },
          {
            title: "Git/GitHub + Deploy",
            duration: "15 min",
            url: "https://www.youtube.com/embed/VIDEO_ID_DEPLOY",
            learn: ["Repo, README, push", "Deploy a subdominio", "Buenas prácticas"],
          },
        ],
        quiz: {
          intro: "Quiz 0 — Fundamentos de HTML/CSS/Setup",
          instructions: [
            "12 preguntas (MCQ + V/F).",
            "Aleatorización de ítems y opciones.",
            "Sin límite de tiempo, a libro abierto.",
          ],
          passScore: "≥ 70%",
          attempts: 2,
          topics: [
            "Etiquetas semánticas y estructura",
            "Selectores y propiedades CSS",
            "Flujo Git básico (init, add, commit, push)",
            "Buenas prácticas de archivos",
          ],
          h5pPath: "/h5p/fullstack/entry/week-00/quiz0/",
        },
        lab: {
          objective: "Construir un portfolio mínimo y publicarlo.",
          rubric: [
            { item: "HTML semántico y accesible", points: 30 },
            { item: "CSS legible + mobile-first", points: 25 },
            { item: "Estructura/organización de archivos", points: 10 },
            { item: "Git workflow + README", points: 15 },
            { item: "Deploy funcional + validación HTML", points: 20 },
          ],
          deliverables: [
            "URL del deploy público.",
            "Repo GitHub con README.md (incluir enlace al deploy).",
            "Capturas o breve video (≤ 2 min) presentando el sitio (opcional +5).",
          ],
          resources: [
            { title: "HTML Validator", href: "https://validator.w3.org/" },
            { title: "CSS Color Picker", href: "https://htmlcolorcodes.com/" },
            { title: "Google Fonts", href: "https://fonts.google.com/" },
            { title: "Responsive Design Checker", href: "http://ami.responsivedesign.is/" },
          ],
        },
        peer: {
          checklist: [
            "Carga sin errores y responsive.",
            "HTML válido (validator).",
            "CSS limpio (espaciado/legibilidad).",
            "Navegación clara y textos en buen inglés.",
          ],
          format: [
            "Qué funciona: (2–3 puntos concretos).",
            "Qué mejorar: (1–2 puntos concretos).",
            "Issues técnicos: (enlaces/commits si aplica).",
            "Puntaje sugerido (0–100) + razones.",
          ],
          scoringHint: "Feedback útil documentado suma +5 pts al revisor.",
        },
        english: {
          vocabulary: [
            { term: "Tag", def: "Marcador de elemento HTML", example: "<h1> es un heading tag" },
            { term: "Attribute", def: "Información adicional en una etiqueta", example: 'class="button"' },
            { term: "Selector", def: "Objetivo de una regla CSS", example: ".button selecciona elementos con esa clase" },
            { term: "Semantic", def: "Significado, no solo presentación", example: "<header> vs <div>" },
          ],
          speaking: [
            {
              level: "Beginner",
              lines: [
                "Hello, my name is [Your Name].",
                "I am learning web development with DevSyllabus.",
                "This is my first website project.",
              ],
            },
            {
              level: "Practice phrases",
              lines: [
                "I am learning HTML and CSS.",
                "I want to become a full stack developer.",
                "I deployed my website today.",
              ],
            },
          ],
          phrases: ["What is the purpose of semantic HTML?", "How do you separate content and style?"],
        },
        docs: {
          resources: [
            { title: "Git Handbook (GitHub)", href: "https://docs.github.com/en/get-started/using-git" },
            { title: "MDN — HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
            { title: "MDN — CSS", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
          ],
          downloads: [{ title: "Starter template (HTML/CSS)", note: "Crea tu propia variante si lo preferís" }],
          validators: [
            { title: "HTML Validator", href: "https://validator.w3.org/" },
            { title: "Lighthouse (Chrome DevTools)", href: "chrome://inspect" },
          ],
        },
      },
    },
  },
};
// -----------------------------------------------------------------------------------------

export default function CoursesRouter({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug ?? [];

  // /courses
  if (slug.length === 0) {
    return (
      <Main title="Courses">
        <List title="Available courses">
          {COURSES.map((c) => (
            <li key={c}><Link href={`/courses/${c}`}>{c}</Link></li>
          ))}
        </List>
      </Main>
    );
  }

  // /courses/<course>
  if (slug.length === 1) {
    const [course] = slug;
    if (!isCourse(course)) return notFound();
    return (
      <Main title={`${course} · Levels`}>
        <List title="Levels">
          {LEVELS.map((lvl) => (
            <li key={lvl}><Link href={`/courses/${course}/${lvl}`}>{lvl}</Link></li>
          ))}
        </List>
      </Main>
    );
  }

  // /courses/<course>/<level>
  if (slug.length === 2) {
    const [course, level] = slug;
    if (!isCourse(course) || !isLevel(level)) return notFound();
    return (
      <Main title={`${course} · ${level} · Weeks`}>
        <List title="Weeks (00–10)">
          {WEEKS.map((w) => (
            <li key={w}><Link href={`/courses/${course}/${level}/${w}`}>{w}</Link></li>
          ))}
        </List>
      </Main>
    );
  }

  // /courses/<course>/<level>/week-<nn>
  if (slug.length === 3) {
    const [course, level, week] = slug;
    if (!isCourse(course) || !isLevel(level) || !isWeek(week)) return notFound();
    const data = REGISTRY[course]?.[level]?.[week];
    return (
      <Main title={`${course} · ${level} · ${week}`}>
        {data ? <WeekLanding data={data} course={course} level={level} week={week} /> : <Placeholder />}
        <List title="Subpages">
          {SUBPAGES.map((s) => (
            <li key={s}><Link href={`/courses/${course}/${level}/${week}/${s}`}>{s}</Link></li>
          ))}
        </List>
      </Main>
    );
  }

  // /courses/<course>/<level>/week-<nn>/<sub>
  if (slug.length === 4) {
    const [course, level, week, sub] = slug;
    if (!isCourse(course) || !isLevel(level) || !isWeek(week) || !isSub(sub)) return notFound();
    const data = REGISTRY[course]?.[level]?.[week];
    if (!data) return (
      <Main title={`${course} · ${level} · ${week} · ${sub}`}>
        <Placeholder />
        <p style={{ marginTop: 12 }}><Link href={`/courses/${course}/${level}/${week}`}>← Back to {week}</Link></p>
      </Main>
    );

    return (
      <Main title={`${course} · ${level} · ${week} · ${sub}`}>
        {sub === "videos" && <Videos data={data} />}
        {sub === "quiz" && <Quiz data={data} />}
        {sub === "lab" && <Lab data={data} />}
        {sub === "peer-review" && <Peer data={data} />}
        {sub === "english" && <English data={data} />}
        {sub === "docs" && <Docs data={data} />}
        <p style={{ marginTop: 12 }}><Link href={`/courses/${course}/${level}/${week}`}>← Back to {week}</Link></p>
      </Main>
    );
  }

  return notFound();
}

// ------------------------------ Components ---------------------------------
function WeekLanding({ data, course, level, week }: { data: Content; course: string; level: string; week: string }) {
  return (
    <section>
      <p style={{ margin: "0 0 12px 0" }}>{data.lesson?.summary?.join(" ")}</p>
      <Block title="Objectives">
        <ul>{data.lesson?.objectives?.map((o, i) => <li key={i}>{o}</li>)}</ul>
      </Block>
      <Block title="Checklist">
        <ul>{data.lesson?.checklist?.map((c, i) => <li key={i}>{c}</li>)}</ul>
      </Block>
      {data.lesson?.schedule && (
        <Block title="Weekly Schedule">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr><Th>Day</Th><Th>Activity</Th><Th>Time</Th></tr></thead>
            <tbody>
              {data.lesson.schedule.map((r, i) => (
                <tr key={i}><Td>{r.day}</Td><Td>{r.activity}</Td><Td>{r.time}</Td></tr>
              ))}
            </tbody>
          </table>
        </Block>
      )}
      <div style={{ marginTop: 8 }}>
        <Link href={`/courses/${course}/${level}/${week}/videos`}>▶ Videos</Link>{" · "}
        <Link href={`/courses/${course}/${level}/${week}/quiz`}>❓ Quiz</Link>{" · "}
        <Link href={`/courses/${course}/${level}/${week}/lab`}>🧪 Lab</Link>{" · "}
        <Link href={`/courses/${course}/${level}/${week}/peer-review`}>🤝 Peer Review</Link>{" · "}
        <Link href={`/courses/${course}/${level}/${week}/english`}>🗣️ English</Link>{" · "}
        <Link href={`/courses/${course}/${level}/${week}/docs`}>📚 Docs</Link>
      </div>
    </section>
  );
}

function Videos({ data }: { data: Content }) {
  return (
    <section>
      {data.videos?.map((v, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <h3 style={{ margin: "0 0 4px 0" }}>{v.title} <small style={{ fontWeight: 400 }}>({v.duration})</small></h3>
          {v.url && (
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: 8 }}>
              <iframe
                src={v.url}
                title={v.title}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          {v.learn && <ul style={{ marginTop: 6 }}>{v.learn.map((l, j) => <li key={j}>{l}</li>)}</ul>}
        </div>
      ))}
    </section>
  );
}

function Quiz({ data }: { data: Content }) {
  const q = data.quiz;
  if (!q) return <Placeholder />;
  return (
    <section>
      <h3 style={{ marginTop: 0 }}>{q.intro}</h3>
      <ul>
        {q.instructions.map((i, k) => <li key={k}>{i}</li>)}
        <li>Puntaje de aprobación: <strong>{q.passScore}</strong></li>
        <li>Intentos permitidos: <strong>{q.attempts}</strong></li>
      </ul>
      <Block title="Temas">
        <ul>{q.topics.map((t, k) => <li key={k}>{t}</li>)}</ul>
      </Block>
      {q.h5pPath && (
        <p>Abre el quiz: <code>{q.h5pPath}</code> (configura tu instancia H5P y embébelo aquí).</p>
      )}
    </section>
  );
}

function Lab({ data }: { data: Content }) {
  const l = data.lab;
  if (!l) return <Placeholder />;
  const total = l.rubric.reduce((a, b) => a + b.points, 0);
  return (
    <section>
      <h3 style={{ marginTop: 0 }}>Objetivo</h3>
      <p>{l.objective}</p>
      <Block title={`Rúbrica (${total} pts)`}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr><Th>Item</Th><Th style={{ textAlign: "right" }}>Pts</Th></tr></thead>
          <tbody>
            {l.rubric.map((r, i) => (
              <tr key={i}><Td>{r.item}</Td><Td style={{ textAlign: "right" }}>{r.points}</Td></tr>
            ))}
          </tbody>
        </table>
      </Block>
      <Block title="Entregables">
        <ul>{l.deliverables.map((d, i) => <li key={i}>{d}</li>)}</ul>
      </Block>
      {l.resources && (
        <Block title="Recursos">
          <ul>{l.resources.map((r, i) => <li key={i}><a href={r.href} target="_blank">{r.title}</a></li>)}</ul>
        </Block>
      )}
    </section>
  );
}

function Peer({ data }: { data: Content }) {
  const p = data.peer;
  if (!p) return <Placeholder />;
  return (
    <section>
      <Block title="Checklist">{p.checklist && <ul>{p.checklist.map((c, i) => <li key={i}>{c}</li>)}</ul>}</Block>
      <Block title="Formato de feedback">{p.format && <ul>{p.format.map((f, i) => <li key={i}>{f}</li>)}</ul>}</Block>
      {p.scoringHint && <p style={{ marginTop: 8 }}><em>{p.scoringHint}</em></p>}
    </section>
  );
}

function English({ data }: { data: Content }) {
  const e = data.english;
  if (!e) return <Placeholder />;
  return (
    <section>
      <Block title="Vocabulary">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr><Th>Term</Th><Th>Definition</Th><Th>Example</Th></tr></thead>
          <tbody>{e.vocabulary.map((v, i) => (<tr key={i}><Td>{v.term}</Td><Td>{v.def}</Td><Td>{v.example}</Td></tr>))}</tbody>
        </table>
      </Block>
      {e.speaking?.map((s, i) => (
        <Block key={i} title={`Speaking — ${s.level}`}>
          <ul>{s.lines.map((l, j) => <li key={j}>"{l}"</li>)}</ul>
        </Block>
      ))}
      {e.phrases && (
        <Block title="Practice prompts">
          <ul>{e.phrases.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </Block>
      )}
    </section>
  );
}

function Docs({ data }: { data: Content }) {
  const d = data.docs;
  if (!d) return <Placeholder />;
  return (
    <section>
      {d.resources && (
        <Block title="Resources">
          <ul>{d.resources.map((r, i) => <li key={i}><a href={r.href} target="_blank">{r.title}</a></li>)}</ul>
        </Block>
      )}
      {d.downloads && (
        <Block title="Downloads">
          <ul>{d.downloads.map((dl, i) => <li key={i}>{dl.title}{dl.note ? ` — ${dl.note}` : ""}</li>)}</ul>
        </Block>
      )}
      {d.validators && (
        <Block title="Validators & Tools">
          <ul>{d.validators.map((v, i) => <li key={i}><a href={v.href} target="_blank">{v.title}</a></li>)}</ul>
        </Block>
      )}
    </section>
  );
}

function Placeholder() {
  return <p>Placeholder — agrega contenido para esta semana/subpágina.</p>;
}

function Main({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, margin: "0 0 16px 0" }}>{title}</h1>
      {children}
    </main>
  );
}
function List({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 8 }}>
      <h2 style={{ fontSize: 18, margin: "0 0 8px 0" }}>{title}</h2>
      <ul style={{ display: "grid", gap: 8, paddingLeft: 18 }}>{children}</ul>
    </section>
  );
}
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 16, padding: 12, border: "1px solid #eee", borderRadius: 8 }}>
      <h3 style={{ margin: "0 0 8px 0" }}>{title}</h3>
      {children}
    </section>
  );
}
function Th({ children }: { children: React.ReactNode }) {
  return <th style={{ textAlign: "left", padding: "8px 6px", borderBottom: "1px solid #eee" }}>{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: "8px 6px", borderBottom: "1px solid #f3f3f3" }}>{children}</td>;
}
