# Aureo — e-commerce di orologi

Progetto completo React + Vite, JavaScript, CSS standard organizzato per area, React Router e Context API. Quattro orologi immaginari con pagine individuali, catalogo filtrabile e ordinabile, carrello persistente e layout responsive.

## 1. Avvio su Visual Studio Code

Prerequisiti: Node.js 22.12+ (qui verificato con Node 24), Git e Visual Studio Code. Apri questa cartella in VS Code e scegli **Terminale → Nuovo terminale**.

Il progetto è già creato: esegui soltanto questi comandi PowerShell:

```powershell
npm.cmd install
npm.cmd run dev
```

Apri l'indirizzo mostrato da Vite, normalmente `http://localhost:5173`. Arresta il server con Ctrl+C. Su macOS/Linux usa `npm` al posto di `npm.cmd`; su Windows `.cmd` evita il blocco degli script PowerShell senza modificare le impostazioni di sicurezza.

Per ricreare uno scheletro React in una **nuova cartella**, invece:

```powershell
npm.cmd create vite@latest aureo-watches -- --template react
cd aureo-watches
code .
```

Copia i file di questo progetto nello scheletro, sostituendo `package.json`, `index.html`, `vite.config.js` e la cartella `src`, quindi esegui `npm.cmd install` e `npm.cmd run dev`. Non eseguire lo scaffolding sopra la cartella già completata.

## 2. Primo commit e caricamento su GitHub

Su GitHub crea un repository vuoto chiamato `aureo-watches`, senza README, licenza o gitignore iniziali. Nel terminale aperto nella cartella del progetto:

```powershell
git init
git add .
git commit -m "Crea e-commerce Aureo con React"
git branch -M main
git remote add origin https://github.com/TUO_USERNAME/aureo-watches.git
git push -u origin main
```

Sostituisci `TUO_USERNAME` con il tuo username reale prima del comando `remote add`. Completa l'accesso GitHub nel browser quando Git Credential Manager lo richiede. Se Git richiede l'identità dell'autore, configura i tuoi dati **nel repository** e ripeti il commit:

```powershell
git config user.name "Il tuo nome"
git config user.email "La tua email GitHub o noreply"
```

Per gli aggiornamenti successivi:

```powershell
git add .
git commit -m "Descrivi la modifica"
git push
```

Il repository di questo progetto è [marcorpn96-wq/e-commerce](https://github.com/marcorpn96-wq/e-commerce). I comandi di inizializzazione qui sopra servono soltanto per creare un nuovo repository; per quello già collegato usa i comandi di aggiornamento. `.gitignore` esclude dipendenze, build e file di ambiente; `package-lock.json` è incluso nel repository.

Caricare il codice su GitHub non pubblica automaticamente il sito. Per un hosting statico usa `npm.cmd run build` e pubblica il contenuto di `dist`. `HashRouter` genera URL come `/#/prodotti/heritage-38`, compatibili con hosting statici senza regole di riscrittura; `base: './'` consente percorsi relativi degli asset.

## 3. Struttura

```text
e-commerce/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
├── README.md
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProductImage.jsx
│   ├── context/
│   │   ├── CartContext.jsx
│   │   └── cart.js
│   ├── data/
│   │   └── products.json
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   ├── styles/
│   │   ├── global.css
│   │   ├── home.css
│   │   ├── products.css
│   │   └── cart.css
│   └── utils/
│       └── format.js
└── tests/
    └── cart.test.js
```

## 4. Architettura e codice

Il codice completo è nei file del progetto. L'estensione `.jsx` segnala JavaScript con markup React, equivalente al ruolo di `App.js` nella richiesta.

- `main.jsx` monta React, router e provider del carrello.
- `App.jsx` compone header, route, footer e notifiche; aggiorna titolo, scroll e focus durante la navigazione.
- `products.json` è l'unica fonte per catalogo, descrizioni, prezzi numerici in euro e 13 specifiche per modello.
- `ProductCard.jsx` riutilizza immagine, link, prezzo formattato e aggiunta al carrello.
- `ProductDetail.jsx` legge lo slug dalla route, mostra fotografia ingrandibile, dettagli tecnici e prodotti correlati.
- `cart.js` contiene le trasformazioni pure dello stato; `CartContext.jsx` espone articoli, conteggio, totale e azioni ai componenti.
- `Cart.jsx` consente di aumentare/diminuire quantità da 1 a 10, rimuovere singoli modelli e svuotare il carrello. Il totale è calcolato dai prezzi del JSON, mai da prezzi salvati nel browser.
- `localStorage` salva soltanto ID e quantità. Dati non validi o modelli eliminati vengono scartati al ripristino; se lo storage non è disponibile il carrello funziona in memoria.
- `Contact.jsx` usa validazione HTML nativa e conferma esplicitamente la simulazione. Non invia email e non memorizza i dati.
- I CSS sono separati per responsabilità con breakpoint responsive, focus visibile e supporto a preferenze di movimento ridotto.

### Pagine

| URL dopo `#` | Pagina |
|---|---|
| `/` | Home |
| `/prodotti` | Catalogo con filtri e ordinamento |
| `/prodotti/heritage-38` | Heritage 38 — 4.850 € |
| `/prodotti/ocean-41` | Ocean 41 — 6.200 € |
| `/prodotti/monza-42` | Monza 42 — 8.450 € |
| `/prodotti/luna-36` | Luna 36 — 7.300 € |
| `/chi-siamo` | Filosofia del progetto |
| `/contatti` | Modulo dimostrativo |
| `/carrello` | Selezione e totale |
| Qualsiasi altro percorso | Pagina 404 |

## 5. Verifiche

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run preview
```

I test verificano aggiunte ripetute, quantità, rimozione, svuotamento, limite per modello e ripristino da dati corrotti. La build compila l'intero frontend. Per una verifica manuale: aggiungi due Heritage e un Ocean (totale 15.900 €), aggiorna la pagina e verifica che quantità e totale rimangano; rimuovi Ocean (9.700 €), poi svuota il carrello. Prova tutte le pagine, i filtri, lo zoom, la navigazione mobile e il modulo con campi vuoti, email invalida e dati validi.

## 6. Immagini e limiti della demo

Le foto ad alta risoluzione sono URL placeholder Unsplash: rappresentano orologi reali illustrativi, non i modelli immaginari del catalogo. Lo zoom mostra un ingrandimento della stessa fotografia, non ulteriori angolazioni autentiche. Per un catalogo reale sostituisci gli URL in `products.json` con fotografie autorizzate e coerenti con ciascun prodotto. Se una foto non si carica, appare un fallback con il nome del modello. Foto e Google Fonts richiedono una connessione; i font hanno alternative locali.

Nessun backend, autenticazione, inventario reale, pagamento o ordine. Il carrello è locale al browser e non viene sincronizzato tra dispositivi o schede già aperte. Prezzi, caratteristiche tecniche, impermeabilità e garanzia sono dati mock, non promesse commerciali. Per la produzione occorrono backend e verifica server di prezzi, scorte e pagamenti.

Riferimenti ufficiali: [Vite](https://vite.dev/guide/) e [React Router](https://reactrouter.com/start/declarative/installation).
