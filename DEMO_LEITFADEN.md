# 🎤 Demo-Leitfaden: IBM Bob DevSecOps Premium Package (5–7 Minuten)

> **Zielgruppe:** Banking & Enterprise IT (Entscheider, Architekten, Product Owner, Entwickler)
> **Kontext:** `GeldUeberweisungService` (Schlanker Instant-Payment Microservice)
> **Fokus:** Echte USPs & Mehrwert – kein Sales-BlaBla, sondern saubere technische Fakten.

---

## 🏛️ Das 30-Sekunden Projekt-Intro (Architektur & Kontext)

**Was du dem Publikum zeigst & sagst:**
> *"Wir schauen uns hier den `GeldUeberweisungService` an – einen typischen, schlanken Backend-Microservice für SEPA-Echtzeitüberweisungen.
> Die Architektur besteht aus vier simplen Bausteinen:
> 1. **API Endpunkt (`api.ts`):** Nimmt Überweisungsaufträge und Kontostandsabfragen von der Banking-App entgegen.
> 2. **Geschäftslogik (`geschaeftslogik.ts`):** Prüft Salden, Tageslimits und parst SEPA-XML-Nachrichten.
> 3. **Konten-Datenbank (`datenbank.ts`):** Verwaltet Kontostände und Buchungsdatensätze.
> 4. **Infrastruktur (`infra/datenbank_setup.tf`):** Bereitstellung der PostgreSQL-Datenbank per Terraform.
>
> Wir zeigen jetzt, wie das IBM Bob DevSecOps Package Entwicklern ermöglicht, Sicherheit, Supply-Chain-Risiken und Cloud-Infrastruktur direkt in der IDE zu managen – ohne Kontextwechsel."*

---

## ⏱️ Der 5–7 Minuten Ablaufplan

| Zeit | Phase & Thema | Was du tust (Klickpfad / Aktion) | Was du sagst (Kernbotschaft) |
| :--- | :--- | :--- | :--- |
| **0:00 – 1:30** | **1. Intro & Static Findings (Schild-Icon)** | 1. `GeldUeberweisungService` kurz mit den 4 Bausteinen vorstellen.<br>2. Oben im Bob-Panel auf das **Schild-Icon** klicken.<br>3. Die **Static Findings** zeigen (1 Critical, 4 High, 3 Medium in `package.json`). | *"Das ist unser GeldUeberweisungService für SEPA-Echtzeitüberweisungen. Oben im Bob Security Header sehen wir sofort den Live-Status: 8 Findings – aufgeteilt in Critical, High und Medium. Über 'Fix all with Bob' können wir sogar ganze Risikoklassen auf einmal bereinigen."* |
| **1:30 – 3:30** | **2. Killer-Feature: 'Fix with Bob' (Supply Chain)** | 1. Beim **Critical Finding (`fast-xml-parser`)** auf **'Fix with Bob'** klicken.<br>2. Prompt approven.<br>3. Zeigen, dass Bob die Version auf 5.7.0 hochzieht und im Hintergrund `npm test` mit 4/4 Tests grün ausführt! | *"Das ist der entscheidende USP: Klassische Scanner werfen Entwicklern nur seitenlange Warnungen vor die Füße. Bob repariert die verwundbare Library autonom auf Version 5.7.0 und führt sofort im Hintergrund unsere Unittests aus. Nur wenn die Tests grün bleiben, ist der Fix verifiziert – Zero Regressions."* |
| **3:30 – 5:30** | **3. Der AI-Vorsprung: Attack Surface Scan** | 1. Im Chat eingeben: `/attack-surface-scan`.<br>2. Die Ergebnisse zeigen (z.B. Ungeschützte Überweisung, Self-Transfer Money-Minting, unverschlüsseltes RDS in `datenbank_setup.tf`).<br>3. Auf **'Open this scan in the Security Dashboard'** klicken! | *"Warum reicht kein Standard-Copilot oder Linter? Statische Linter prüfen nur starre Regex-Muster. Bobs Attack Surface Scan versteht echte Datenflüsse und Fachlogik: Er deckt sofort auf, dass Überweisungen ungeschützt sind, dass Überweisungslimits umgangen werden können und dass die PostgreSQL-Infrastruktur unverschlüsselt ist."* |
| **5:30 – 6:30** | **4. Ops & Terraform** | 1. Auf das IaC-Finding (`infra/datenbank_setup.tf`) verweisen.<br>2. Zeigen: Unverschlüsselte DB.<br>3. Bobs automatisierte Behebung / Terraform-Skill erwähnen. | *"Auch das 'Ops' in DevSecOps ist voll integriert. Bob prüft Infrastructure-as-Code nach BSI- und CIS-Benchmarks und sichert Cloud-Ressourcen ab, bevor sie deployed werden."* |
| **6:30 – 7:30** | **5. Fazit & Q&A** | Zusammenfassung der USPs: 1) Closed-Loop Fix mit Tests, 2) SafeWrite Guardrail, 3) AI Attack Surface Modellierung, 4) Dashboard & DORA-Readiness. | *"DevSecOps ohne Kontextwechsel: Erkennen, autonomes Reparieren mit Testnachweis und AI-Guardrails in einer einzigen Plattform."* |

---

## 🎯 Die 4 unschlagbaren USPs (Spickzettel für den Vortrag)

1. **Closed-Loop Remediation (Erkennen + Reparieren + Testen):**
   * *Problem:* Linter und SonarQube erzeugen "Alert Fatigue" (Listen voller Fehler ohne Lösung).
   * *Bob Vorteil:* 1 Klick auf **"Fix with Bob"** behebt den Fehler und validiert ihn gegen die Testsuite.

2. **SafeWrite (AI schützt vor AI):**
   * *Problem:* Entwickler nutzen generative KI, die veraltete oder unsichere Libraries vorschlägt.
   * *Bob Vorteil:* SafeWrite fängt Datei-Schreibvorgänge von AI-Agenten im Speicher ab und erzwingt sichere Versionen, bevor sie im Git landen.

3. **Attack Surface Scan (Logik & Architektur vs. Regex):**
   * *Problem:* Statische Scanner prüfen nur starre Text-Muster.
   * *Bob Vorteil:* Baut ein semantisches Modell von Datenflüssen und Trust Boundaries auf (findet logische Berechtigungslücken wie ungeschützte Admin-Routen).

4. **DORA & BaFin Compliance out-of-the-box:**
   * *Problem:* Banken müssen für DORA (Digital Operational Resilience Act) lückenlose Sicherheitsnachweise für Software-Releases erbringen.
   * *Bob Vorteil:* Das Security Dashboard speichert 90 Tage Historie und exportiert vollständige HTML-Audit-Reports.

---

## ❓ FAQ & Antworten für kritische Fragen

* **Frage: "Können wir das nicht mit kostenlosen Open-Source-Tools selbst zusammenbauen?"**
  * *Antwort:* Einzelne Scanner (Trivy, Opengrep) kann man installieren – aber man hat dann nur Einzelergebnisse. Der massive Mehrwert liegt in der **Orchestrierung**: Multi-Engine-Korrelation in einem Panel, der **SafeWrite-In-Memory-Guardrail**, der **autonome Test-Loop beim Fixen** und die **AI-gestützte Bedrohungsmodellierung**. Das spart hunderten Entwicklern täglich Stunden an manueller Recherche.

* **Frage: "Dürfen Bank-Quellcodes überhaupt an KI-Modelle gesendet werden?"**
  * *Antwort:* Bob unterstützt konfigurierbares Scanning. Sensible Secrets (`.env`, Private Keys, Zertifikate) werden beim File Sweep Scan prinzipiell herausgefiltert und erreichen niemals das Modell.

* **Frage: "Was passiert bei False Positives?"**
  * *Antwort:* Findings können direkt im Dashboard oder über `.bob/.devsecignore` mit gitignore-Syntax dauerhaft unterdrückt werden.
