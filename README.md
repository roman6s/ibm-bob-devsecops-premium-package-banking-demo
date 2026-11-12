# GeldUeberweisungService (Banking DevSecOps Demo)

Ein schlanker, voll funktionsfähiger Microservice zur Demonstration des **IBM Bob DevSecOps Premium Package**.

## 📁 Projekt-Struktur

```
geld-ueberweisung-service/
├── src/
│   ├── api.ts              # Express API (Überweisungen, Kontostand, Admin-Limit)
│   ├── datenbank.ts        # Kontendaten & Abfragen (enthält Demo-SQLi & Secret)
│   ├── geschaeftslogik.ts  # Überweisungslogik & SEPA-XML Parsing (veraltetes fast-xml-parser)
│   └── server.ts           # Server Bootstrap
├── test/
│   └── service.test.ts     # Unittests für Buchungsablauf & Limits
├── infra/
│   └── datenbank_setup.tf  # Terraform Konfiguration (enthält unverschlüsselte DB)
├── Dockerfile              # Container-Definition (läuft als root)
├── DEMO_LEITFADEN.md       # 5–7 Minuten Präsentations-Leitfaden mit Klickpfaden & USPs
├── package.json            # Enthält verwundbare Abhängigkeiten (CVEs)
└── tsconfig.json           # TypeScript Konfiguration
```

## 🚀 Schnelleinstieg

```bash
# Abhängigkeiten installieren
npm install

# Tests ausführen
npm test

# Service starten
npm start
```

## 📖 Vortrags-Leitfaden

Siehe [`DEMO_LEITFADEN.md`](./DEMO_LEITFADEN.md) für den vollständigen Ablaufplan und die Klickpfade während der Präsentation.
