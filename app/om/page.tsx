import Link from 'next/link';

export default function OmPage() {
  return (
    <div className="container py-5"> {/* Main container with vertical padding */}
      <h1 className="display-5 fw-bold mb-4">Om Tall Ships Races Kristiansand 2025</h1>

      <p className="lead mb-4">
        Tall Ships Races Kristiansand 2025 markerer den spennende avslutningen på det internasjonale seilskip-regattaet The Tall Ships Races 2025. Arrangementet finner sted i Kristiansand havn fra onsdag 30. juli til lørdag 2. august 2025.
      </p>

      <p className="mb-4">
        Etter 10 års fravær er Kristiansand igjen vertshavn for denne storslåtte seilskipsfestivalen, organisert av <a href="https://sailtraininginternational.org/" target="_blank" rel="noopener noreferrer">Sail Training International</a>. Vi inviterer til en gratis folkefest for alle aldre, fylt med åpne skip, konserter, familieaktiviteter og en unik maritim atmosfære langs bryggene.
      </p>

      <hr className="my-5" /> {/* Divider */}

      <section className="mb-5">
        <h2 className="mb-3">Arrangementets Plassering i Ruten</h2>
        <p>The Tall Ships Races 2025 seiles over fire etapper mellom 4. juli og 9. august, og går gjennom Den engelske kanal og Nordsjøen:</p>
        <ul>
          <li>Le Havre (Frankrike)</li>
          <li>Dunkirk (Frankrike)</li>
          <li>Aberdeen (Skottland)</li>
          <li>Kristiansand (Norge) - <strong>Siste etappe: 30. juli – 2. august 2025</strong></li>
        </ul>
        <p>Kristiansand er stolt over å være den avsluttende vertshavnen for regattaen.</p>
      </section>

      <section className="mb-5">
        <h2 className="mb-3">Cruise-in-Company</h2>
        <p>
          Som en del av etappe 3, kjent som "Cruise-in-Company", vil en flåte av skip seile i roligere tempo langs den vakre Sørlandskysten. Dette gir mannskap og trainees en unik mulighet til å oppleve kystkulturen. Havner som besøkes under Cruise-in-Company inkluderer:
        </p>
        <ul>
          <li>Sirevåg</li>
          <li>Farsund</li>
          <li>Båly</li>
          <li>Kristiansand</li>
          <li>Arendal</li>
        </ul>
      </section>

      <hr className="my-5" /> {/* Divider */}

      <section className="mb-5">
        <h2 className="mb-3">Høydepunkter & Program</h2>
        <p>Festivalområdet i Kristiansand havn vil syde av liv. Noen av høydepunktene inkluderer:</p>
        <ul>
          <li><strong>Åpne Skip:</strong> Gratis omvisning om bord på de fleste av de deltakende seilskipene. Opplev historien og livet om bord på nært hold.</li>
          <li><strong>Konserter & Kultur:</strong> Nyt live musikk og maritime forestillinger på bryggekanten.</li>
          <li><strong>Familieaktiviteter:</strong> Egne områder med aktiviteter, verksteder og underholdning for barn og unge.</li>
          <li><strong>Matmarked:</strong> Smak på lokale delikatesser og internasjonale retter.</li>
          <li><strong>Crew Parade:</strong> Se mannskapene fra de ulike skipene marsjere gjennom byens gater i en fargerik parade.</li>
          <li><strong>Nettverk & Trainee-muligheter:</strong> Lær mer om mulighetene for å bli ungdomstrainee på fremtidige seilaser med Sail Training International.</li>
        </ul>
        <p>
          For en detaljert tidsplan og oversikt over alle arrangementer, se <Link href="/program">Program-siden</Link>.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="mb-3">Deltakende Skip (Utvalg)</h2>
        <p>
          Mellom 6 og 10 internasjonale seilskip forventes å ankomme Kristiansand, inkludert flere imponerende Class A-skip. Mens den endelige listen bekreftes nærmere arrangementet, er her eksempler på skip som ofte deltar i Tall Ships Races:
        </p>
        <ul>
          <li>Alexander von Humboldt II (Tyskland)</li>
          <li>Belem (Frankrike)</li>
          <li>Christian Radich (Norge)</li>
          <li>Eendracht (Nederland)</li>
          <li>Gulden Leeuw (Nederland)</li>
          {/* Legg til flere skip her etter hvert som de bekreftes */}
        </ul>
        <p>
          For en oppdatert oversikt over skipene som kommer til Kristiansand, besøk <Link href="/skip">Skip-siden</Link>.
        </p>
      </section>

      <hr className="my-5" /> {/* Divider */}

      <section className="mb-5">
        <h2 className="mb-3">Praktisk Informasjon</h2>
        <div className="row">
          <div className="col-md-6 mb-3">
            <h5 className="fw-bold">Sted</h5>
            <p>Kristiansand havn (Kvadraturen), Kristiansand, Norge.</p>
          </div>
          <div className="col-md-6 mb-3">
            <h5 className="fw-bold">Dato</h5>
            <p>Onsdag 30. juli – Lørdag 2. august 2025.</p>
          </div>
          <div className="col-md-6 mb-3">
            <h5 className="fw-bold">Pris</h5>
            <p>Gratis adgang til festivalområdet og åpne skip.</p>
          </div>
          <div className="col-md-6 mb-3">
            <h5 className="fw-bold">Transport & Parkering</h5>
            <p>Offentlig transport (buss/tog til Kristiansand stasjon) anbefales. Begrenset parkering i sentrum. Parkering ved Sørlandssenteret med shuttlebuss kan være et alternativ (sjekk oppdatert info nærmere arrangementet).</p>
          </div>
          <div className="col-md-6 mb-3">
            <h5 className="fw-bold">Overnatting</h5>
            <p>For hoteller og andre overnattingsmuligheter, se <a href="https://www.visitnorway.com/places-to-go/southern-norway/kristiansand/" target="_blank" rel="noopener noreferrer">Visit Kristiansand</a>.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3">Viktige Lenker</h2>
        <ul>
          <li><a href="https://www.tallshipsraceskristiansand.no/" target="_blank" rel="noopener noreferrer">Offisiell nettside: Tall Ships Races Kristiansand</a></li>
          <li><a href="https://sailtraininginternational.org/event/tall-ships-races-2025/" target="_blank" rel="noopener noreferrer">Sail Training International (Global arrangør)</a></li>
          <li><a href="https://en.portofkristiansand.no/aktuelt/nyheter/tall-ships-races-2025-i-kristiansand-er-du-klar" target="_blank" rel="noopener noreferrer">Kristiansand Havn - Nyheter om TSR</a></li>
          <li><a href="https://sailtraininginternational.org/sailtraining/vessel-entries/" target="_blank" rel="noopener noreferrer">Vessel Entries & Details (Sail Training International)</a></li>
        </ul>
      </section>
    </div>
  );
}