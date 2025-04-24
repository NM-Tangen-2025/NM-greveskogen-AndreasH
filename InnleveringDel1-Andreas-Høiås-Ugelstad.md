# Plan for nettside for Tall ships races  

---

## Mål og målgruppe

Målet med denne kampanjen er å lage en nettside for Tall ships races som er et arrangement i Kristiansand, de ønsker at det skal bli økt engasjement og få en nettside som skal være en effektiv informasjonskanal til publikum.

Hovedmålene er som følger:

- Økt engasjement for Tall ships races
- Lage en effektiv informasjonskanal for publikum

Basert på oppgaven så kan jeg lage flere kjernefunksjonalitetskrav som jeg ser på som nødvendig for denne nettsiden, disse kravene er:

- Skalerbar og responsiv nettside som fungerer i flere formater
- Navbar og Footer for effektiv navigasjon mellom de forskjellige sidene
- Nyhetsartikkel visning som viser siste nytt om Tall ships races
- Eksterne linker til Tall ships races sine sosiale medier (Instagram, Facebook, tiktok)

Disse målene er mulig å oppnå og vil særlig hjelpe festivalen med å nå ut til ungdom, som er mye på nett. En moderne nettside gjør arrangementet mer attraktivt og tilgjengelig.

---

## Funksjonalitets‑ og sideoversikt

| Side / seksjon            | URL / metode              | Beskrivelse / ekstra krav |
| ------------------------- | ------------------------- | ------------------------- |
| **Forside**               | `/`                       | Teaser‑kort for nyheter, lenker videre |
| **Om**                    | `/om`                    | Informasjon om festivalen |
| **Nyheter**               | `/nyheter`               | Liste med nyhetskort |
| **Bilder / Galleri**      | `/bilder` eller `/galleri`| Grid‑galleri |
| **Skip**       | `/skip`               | Oversikt over alle skipene - grid |
| **Programoversikt**       | `/program`               | Programoversikt over hvor og når arrangementer skjer |

Alle sider har en felles **Navbar** for navigasjon og en **Footer** med kontaktinfo, relevante lenker og henvisning til personvern.

---

## Forside

Forsiden (`/`) er landingssiden som viser de tre siste nyhetene, lenker til skip og om, samt en kort introduksjon til festivalen. hentet fra endepunktet `https://fortunate-bear-715099df12.strapiapp.com/api/Nyhetsartikler?populate=*`/`

Det vil være lenker til relevante sosiale medier på bunn av siden i Footer - en "nice to have feature" hadde verdt å ha embedded instagram eller facebook, det vil jeg legge til hvis jeg har tid

---

## Nyheter / Nyhetsartikkel

`/nyheter` viser alle nyheter i kort‑layout hentet fra endepunktet `https://fortunate-bear-715099df12.strapiapp.com/api/Nyhetsartikler?populate=*`/`

---

## Skip

`/skip` viser en grid-oversikt over skip hentet fra `https://api.skolenm.tanvgs.no/ships/`. Hvert skip i grid-en vil vise navn og bilde. Bildet hentes via `https://api.skolenm.tanvgs.no/ships/{mmsi}/image`. På mobil (< 576 px) rendres listen vertikalt. Mulighet for å klikke inn på et skip for mer detaljert info fra `/ships/{mmsi}` kommer til å bli vurdert - dette legger jeg til på siden hvis jeg ser at jeg har tid til det

*Nice-to-have:* En kartvisning som viser skipenes posisjoner (basert på AIS-data hvis tilgjengelig fra API) kan legges til senere hvis tid tillater det, men er ikke en prioritet for MVP.

---

## programoversikt

`/program` viser arrangementer hentet fra `https://fortunate-bear-715099df12.strapiapp.com/arrangementer`, altså detaljer om arrangementene

Programoversikt kommer til å vise en oversikt over de forskjellige programmene under Tall ships races.

Denne siden kommer også til å bruke informasjon hentet fra lokasjoner endepunktet på `https://fortunate-bear-715099df12.strapiapp.com/lokasjoner`

---

## Teknologivalg

### Frontend

- **Next.js 19 (React 19)** – App Router, server components, image‑optimalisering.  
- **Bootstrap 5** – rask oppstart, suppleres med egen CSS hvor nødvendig.  
- **Versjonskontroll:** *Git* via **HTTPS**‑remote; Vercel utløser autodeploy på push.

### Backend

- **Next.js API Routes / Route Handlers**
  - Gjør integrasjon mot database / eksterne tjenester svært enkel.
  - API nøkkelen for `https://fortunate-bear-715099df12.strapiapp.com/` ligger lagret trygt i en .env fil

### Database (Nice‑to‑have)

1. **Supabase** – skybasert Postgres + auth.  
2. **MySQL** – selv‑hostet kontroll.  
3. **Spark‑database** – ekstra forbedring om tid tillater det (flyttet hit).

---

## API‑integrasjoner

| Endepunkt                               | Bruk   |
| --------------------------------------- | ------ |
| `https://api.skolenm.tanvgs.no/ships/`       | /skip siden |
| `https://api.skolenm.tanvgs.no/ais`    | /skip siden |
| `https://api.ungfestival.no/ships/{mmsi}`   | Forside (utdrag) + `/program` |
| `https://fortunate-bear-715099df12.strapiapp.com/api/nyhetsartikler` | Nyhetsartikkler for nyheter siden |
| `https://fortunate-bear-715099df12.strapiapp.com/api/Arrangementer` | arrangementer for program siden |
| `https://fortunate-bear-715099df12.strapiapp.com/api/Bilder` | Bilder for generel bruk på flere sider |
| `https://fortunate-bear-715099df12.strapiapp.com/api/Lokasjoner` | Brukes på arrangementer siden |

---

## Testing og kvalitetssikring

- **Responsivitet**: fast sjekk i innebygd debugger på **320 px** bredde + Chrome Lighthouse.  
- **Enhet / integrasjon**: Jest + React Testing Library hvor det gir verdi.  
- **Tilgjengelighet**: axe‑core og manuell tastaturnavigasjon.

---

## Brukervennlighet og design

Bootstrap 5 breakpoints sikrer responsivt design; videre finpuss med egen CSS for et ungdommelig uttrykk (friske farger, store bilder). Alle interaktive elementer har fokus‑stiler og aria‑tags.

---

## Tidsplan (MVP‑fokus)

| Fase                                  | Estimert tid |
| ------------------------------------- | ------------ |
| Repo‑oppsett (Vercel + Git HTTPS)     | 30 – 45 min  |
| Sider & routing (Forside, Om, …)      | 1 t 30 min   |
| API‑integrasjoner & state‑håndtering  | 45 min       |
| Feilhåndtering & fallback‑UI          | 15 min       |
| Privacy‑side + polish / testing       | 30 min       |

---

## Risikofaktorer & mitigasjon

| Risiko                     | Tiltak |
| -------------------------- | ------ |
| Kompleks Next‑konfigurasjon| Gjenbruk av velprøvd boilerplate |
| Tidsklemme                 | Stramt MVP‑scope; “Nice‑to‑have” (Database) kan droppes |

---

## Oppsummering

Med **Next.js + Bootstrap**, Git‑drevet arbeidsflyt og Vercel auto‑deploy er prosjektet høyst gjennomførbart innen tidsrammen. Min omfattende erfaring med Next‑backend og forhåndsplanlagte database‑funksjoner gjør eventuell databasestøtte rask å legge til. Robust `try … catch`‑håndtering gir god brukeropplevelse selv om API‑kall feiler, og en dedikert privacy‑side sikrer GDPR‑etterlevelse.
