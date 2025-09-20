---

## EXTRA — Subdominios automáticos para estudiantes (Vercel)

**Objetivo:** que cada alumno tenga `https://<usuario>.devsyllabus.com` sin tocar DNS.

### Requisitos (profe una sola vez)
- **DNS (Namecheap):**
  - `www` → CNAME → `fmonfasani.github.io`
  - `@`   → URL Redirect (Unmasked) → `https://www.devsyllabus.com`
  - `*`   → CNAME → `cname.vercel-dns.com`  ✅ *wildcard*
- **Vercel (proyecto “student-sites”):**
  - Domains → agregar `*.devsyllabus.com` (puede figurar *Invalid*, sirve igual con tu DNS).

### Proyecto en Vercel (Next.js)
Crea **`middleware.ts`** en la raíz del repo (mismo nivel que `package.json`):
```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') ?? ''
  const sub = host.replace('.devsyllabus.com','').split(':')[0]
  if (sub && sub !== 'www') {
    return NextResponse.rewrite(new URL(`/sites/${sub}/index.html`, req.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/((?!_next|api|favicon.ico|assets).*)'] }
```

**Estructura estática:**
```
public/
  sites/
    student1/index.html   → https://student1.devsyllabus.com
    maria/index.html      → https://maria.devsyllabus.com
```

**Deploy:** commit & push → Vercel deploya.

### Flujo para el alumno
1) Fork del repo → crear `public/sites/<tu-usuario>/index.html`.
2) Abrir **PR**.
3) Al merge queda online en `https://<tu-usuario>.devsyllabus.com`.

**HTML mínimo de ejemplo:**
```html
<!doctype html><meta charset="utf-8">
<title>mi sitio</title>
<h1>Hola, soy &lt;tu-usuario&gt;</h1>
<p>Mi primer deploy en subdominio propio.</p>
```

### Verificación
```bash
nslookup -type=cname test.devsyllabus.com.   # debe apuntar a cname.vercel-dns.com
curl -I https://student1.devsyllabus.com     # 200/301 (Server: Vercel)
```

### (Opcional) CI que valida PRs
Crea `.github/workflows/validate-sites.yml`:
```yml
name: validate student sites
on: pull_request
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: check folders and files
        run: |
          set -e
          shopt -s nullglob
          for d in public/sites/*/; do
            name=$(basename "$d")
            [[ "$name" =~ ^[a-z0-9-]+$ ]] || { echo "❌ nombre inválido: $name"; exit 1; }
            test -f "$d/index.html" || { echo "❌ falta index.html en $d"; exit 1; }
          done
          echo "✅ OK"
```
