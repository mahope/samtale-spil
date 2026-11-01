# Backlog-berigelse 2. november 2026: Snakkespil

Udarbejdet 2026-11-01. Ingen produktkode er ændret. Issue-udkast ligger i `docs/backlog-berigelse-2026-11-02.issues.json`.

## Resumé

De tre største muligheder:

1. **Appsene er udgivet, men sitet siger "Kommer snart".** `APPS_LIVE` er `false` i `src/config/site.ts`, og https://snakkespil.dk/app/ viser teksten fem gange. Det er den billigste installationskanal (issue a, P1), og en installationsprompt på web (b) følger efter.
2. **Indholdsarbejdet fra `docs/butik-og-seo.md` er næsten gennemført; resten er små, men billige sider.** Otte planlagte sider findes ikke i sitemap (bryllupsdag, langdistance, livshistorie, polterabend, lege i bilen, konfirmation, fødselsdag, samtaleemner). Issue c og d tager de seks bedst begrundede, e tilføjer en side til arbejdspladser, som er en ny målgruppe med gratis kilder fra BFA og Videnskab.dk.
3. **Indtjening er ikke besluttet.** Koden og README har ingen indtægtsvej, og produktet er bevidst rent (ingen konti, cookies eller reklamer). To beslutningsissues (k, l) lægger mulighederne op til Mads med anbefaling: vent, derefter frivillig støtte.

## Nuværende tilstand

**Kode (repoet).** Next.js 16 statisk eksport, Capacitor-apps (dansk, 18+, engelsk Goodtalk), Cloudflare Worker (`/api/flag`, `/api/stats`), print-PDF'er pr. bunke, Plausible og Umami side om side. Seneste tilføjelser: sæsonsider (julelege, nytårslege, bryllupslege m.fl.), guides, dagens spørgsmål, generator, print.

**Live (curl med mobil User-Agent, 2026-11-01).**

| URL | Fund |
|---|---|
| `/` | 200, 148.718 bytes HTML, 19 script-tags, ca. 283 kB gzip JS i de refererede chunks. Title og description ok, canonical, Open Graph med billede og alt, JSON-LD: WebSite, Organization, WebApplication. Ingen `<img>`, ingen alt-problemer. |
| `/spoergsmaal/` | 200, title/description/canonical ok, ingen JSON-LD. |
| `/spoergsmaal/parforhold/` | 200, h1 "Spørgsmål til par: 80 samtalekort til jer to", 10 h2, kun BreadcrumbList, OG-billede og Twitter-kort pr. side. 131 kB HTML. |
| `/lege/julelege/`, `/guide/aktiv-lytning/` | 200, Breadcrumb; guide har Article. |
| `/app/` | 200, "Kommer snart" ×5 trods udgivne apps (issue a). |
| `/spoergsmaal/til-par/` | **404** (gættet adresse), 404-siden har kun to knapper (issue h). |
| `/sitemap.xml` | 71 URL'er med lastmod: 44 under `/spoergsmaal/`, 10 `/lege/`, 5 `/guide/`. `robots.txt` tillader alt. |
| Headers | Statiske chunks `max-age=31536000, immutable`; HTML og manifest `no-cache`; gzip; CSP håndhævet. Ingen cookiebanner (cookiefri analyse). |

Metadata, canonical og OG er i orden; der er ikke fundet fejl i SEO-grundlaget. Pladsen til forbedring ligger i flere sider, vægt og konvertering.

## Konkurrenter og niche

Det eksisterende dokument `docs/butik-og-seo.md` (2026-10-20) har en detaljeret tabel over butiksspil. Supplerende fund i denne runde:

- Danske fysiske konkurrenter koster 99 til 289 kr. (SNAK, Go' Samtale, Qvalitetstid; kilder i det dokument). Kartotek Copenhagen sælger et dansk familiesæt på 110 spørgsmål til 100 DKK.
- Søgning på "samtalekort gratis dansk par familie" gav ingen anden gratis, spilbar, dansk tjeneste. Gratis var kun et PDF-kort fra Røde Kors og en betalt app (ELSK fra SNAK, 1,99 USD). Det er et indicium, ikke bevis for, at ingen findes: søgningen var én enkelt forespørgsel.
- Arbejdsplads: BFA udgiver gratis dialogkort om psykologisk tryghed (ét kort, højst fem minutter). Ingen dansk gratis, digital kortbunke til teamet blev fundet i samme søgning.

## Søgeord og søgeintention

Alle søgevolumener i denne rapport stammer fra `docs/butik-og-seo.md` (OpenSEO/DataForSEO, Danmark, hentet af en tidligere kørsel). Jeg har ikke selv målt nye tal. For "samtalekort arbejdsplads" og "teambuilding spørgsmål": **ukendt**.

Intention: "spørgsmål til par/familie/venner" er listesøgninger, hvor brugeren vil se mange spørgsmål med det samme. Sitet har allerede 44 sider i den intention. Resten af dokumentets liste er sæson- og begivenhedssøgninger (bryllup, polterabend, konfirmation, bil), hvor sitet har et strukturelt forspring i form af spilbare bunker.

## Monetisering og konvertering

- **I dag:** ingen indtægt. Der er intet bidragslink, ingen annoncer, ingen affiliate (søgning i koden).
- **Frivillig støtte:** Buy Me a Coffee tager 5 % og kortgebyr ovenpå (tredjepartskilder, ikke platformens egen side); Ko-fi opgives som 0 % på donationer. Se k.
- **Affiliate:** Saxo kører program via Partner-ads (4 til 6 %) og Adtraction (4 %, 30 dages cookie) ifølge en tredjepartsartikel; tallene er uverificerede og kan have ændret sig. Danske brætspils- eller samtalekortprogrammer blev ikke fundet. Afvist for nu (se nedenfor).
- **B2B:** gratis side først (e), betalt pakke først efter data (l).
- **Konvertering til installation:** butikslinks (a) og installationsprompt (b) er de største huller.

## Teknik og drift

- Vægt: forsiden sender ca. 283 kB gzip JS (f).
- Structured data: kun Breadcrumb på bunke- og lege-sider (g).
- 404: ingen genveje (h).
- Analyse: eventnavne findes, men ingen oversigt over de mål, der skal oprettes i Plausible (j).
- ASO-tekster med søgeord ligger allerede i `docs/app-butikker.md`; der er ikke lavet et nyt ASO-issue.
- Sandboxen kunne ikke bruge Brave-søgning (tom respons med en Tor-side); søgning skete via WebSearch. Det præcise antal søgninger blev ikke logget (grænsen var højst 10); de brugte kilder står i Kilder, og konkurrentafsnittet bygger på få søgninger.

## Prioriteret plan

| Id | Titel | Prioritet | Størrelse | Forventet effekt |
|---|---|---|---|---|
| a | Slå butikslinks til på hjemmesiderne, pr. butik | P1 | S | Direkte installationsvej fra al webtrafik; størrelse ukendt |
| b | Tilbyd installation som app fra spilskærmen efter tre kort | P2 | M | Retention via PWA/app; måles med nye events |
| c | Tilføj sider til bryllupsdag, langdistance og livshistorie | P3 | M | Tre nye indekserbare sider; volumen fra 2026-10-20, ikke målt nu: 1.600 / 140 / 170 pr. md., men 1.600 for "bryllupsdag" er sandsynligvis bryllupsnavne og gaver (SERP ikke tjekket), så P3 som i kilden |
| d | Tilføj lege-siderne polterabend, lege i bilen og konfirmation | P3 | M | Sæsonbetonet; volumen fra 2026-10-20: 1.300 / 90 / 20 pr. md. Intentionen bag "polterabend ideer" (1.300) er aktiviteter og shop, ikke spørgsmål, så P3 som i kilden |
| e | Lav en side til arbejdspladser med 30 minutters samtaleøvelse | P2 | M | Ny målgruppe; volumen ukendt |
| f | Reducér JavaScript og HTML-vægt på forsiden | P2 | M | Hurtigere mobilindlæsning; mål −25 % JS |
| k | Beslut: frivillig støtte | P2 | S (beslutning) | Mulig første indtægt |
| g | Tilføj ItemList og CollectionPage som structured data | P3 | S | Lille, teknisk SEO |
| h | Ret 404-siden med genveje og aliasser | P3 | S | Redder gættede adresser |
| i | Gør det muligt at dele et kort som billede | P3 | M | Deling; effekt ukendt |
| j | Opret liste over analysemål | P3 | S | Gør konverteringer målbare |
| l | Beslut: arbejdspladsmateriale gratis eller betalt | P3 | S (beslutning) | Afklarer B2B |

Sæsonsiderne før jul er dækket af #42 og indgår ikke igen.

## Afviste idéer og hvorfor

- **FAQPage-schema:** Google viser FAQ-rich results kun for visse sites; ingen gevinst.
- **Ny ASO-opgave:** søgeord står allerede i `docs/app-butikker.md`, og butiksændringer er uden for opgaven.
- **Affiliate-links til bøger:** lav relevans for et gratis spilprodukt, ukendte vilkår, og risiko for at svække tilliden. Kan tages op, hvis Mads vil.
- **Annoncer:** forringer oplevelsen og kræver samtykkebanner, som sitet i dag ikke har.
- **Konti og e-mailliste:** bryder princippet om ingen konti; ikke nødvendigt for retention nu.
- **Flere "spørgsmål til X"-sider:** tidligere analyse viste ingen målbar efterspørgsel for svigerforældre, bedsteforældre, teenagere.
- **Premium-sæt bag betaling:** modsiger positioneringen "gratis"; afventer data (k).

## Åbne spørgsmål til Mads

1. Er både iOS- og Android-appen reelt tilgængelig i butikkerne nu? Issue a verificerer URL'erne, men iOS var under genindsendelse (#93).
2. Frivillig støtte: ja/nej og hvilken platform (k).
3. Skal arbejdspladssiden have et tilbud bag sig (l)?
4. Har du adgang til Plausible-/Umami-tal for besøg, søgeord (Search Console) og butiksinstallationer? Uden dem er prioriteringen her baseret på tidligere søgeordsdata og kodeobservationer.

## Kilder

- https://snakkespil.dk/ og de nævnte undersider: curl, mobil User-Agent, metadata, headers og vægt.
- `docs/butik-og-seo.md`, `docs/app-butikker.md`, `README.md`, `CLAUDE.md`, `CHANGELOG.md` i repoet: eksisterende analyse, søgevolumener, plan og tilstand.
- https://kartotekcopenhagen.com/products/conversation-cards-danish-familie: dansk konkurrentpris.
- https://apps.apple.com/us/app/id1544103655: ELSK fra SNAK (prisen 1,99 USD fra søgeresultatets sammendrag).
- https://www.rodekors.dk/sites/rodekors.dk/files/2021-11/Samtalekort%20-%20Lidt%20om%20dig%20og%20mig.pdf: gratis PDF-konkurrent.
- https://www.makeinfluence.com/en/academy/saxo-affiliate-program-how-denmarks-largest-online-bookshop-pays-creators: Saxo-affiliate (tredjepart, uverificeret).
- https://schoolmaker.com/blog/buy-me-a-coffee-pricing og https://app.unilink.us/blog/patreon-vs-buymeacoffee-vs-kofi-2026: gebyrer for støtteplatforme (tredjepart).
- https://www.arbejdsmiljoweb.dk/media/5gqg0u1z/bfa-psykologisk-tryghed-dialogkort-uden-talebobletekst-tryk-220224.pdf: BFA dialogkort.
- https://videnskab.dk/kultur-samfund/forskere-teambuilding-kan-vaere-spild-af-tid-personlige-samtaler-med-kollegerne-er-mere-givende/: teambuilding og personlige samtaler.
- https://www.appfollow.io/blog/app-store-optimization-title: tegngrænser for butikstekster (brugt til at bekræfte, at `docs/app-butikker.md` er i tråd; tredjepart).
