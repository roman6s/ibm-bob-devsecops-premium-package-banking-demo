# 🎤 Demo-Leitfaden: IBM Bob DevSecOps Premium Package (5–7 Minuten)

> **Zielgruppe:** Banking & Enterprise IT (Entscheider, Architekten, Product Owner, Entwickler)  
> **Kontext:** `GeldUeberweisungService` (Schlanker Instant-Payment Microservice)  
> **Fokus:** Echte USPs & Mehrwert – kein Sales-BlaBla, sondern saubere technische Fakten.

---

## ⏱️ Der 5–7 Minuten Ablaufplan

| Zeit | Phase & Thema | Was du tust (Klickpfad / Aktion) | Was du sagst (Kernbotschaft) |
| :--- | :--- | :--- | :--- |
| **0:00 – 1:30** | **Intro & Security Dashboard (Header-Icon)** | 1. `GeldUeberweisungService` kurz vorstellen.<br>2. Oben im Bob-Panel auf das **Schild-Icon** klicken.<br>3. Die **Static Findings** (8 Total: 1 Critical, 4 High, 3 Medium) & **Security Watch** zeigen.<br>4. Auf den **"Fix all with Bob"** Button hinweisen. | *"Das ist unser GeldUeberweisungService für SEPA-Echtzeitzahlungen. Direkt oben im Bob-Panel sehen wir über das Schild-Symbol den Live-Sicherheitsstatus: 8 aggregierte Findings (1 Critical, 4 High, 3 Medium) aus Code, Secrets, Dependencies und Infrastruktur. Über 'Fix all with Bob' können wir sogar ganze Risikoklassen auf einmal beheben."* |
| **1:30 – 3:00** | **Shift-Left im Code (Findings Details)** | 1. Datei `src/datenbank.ts` öffnen.<br>2. Auf das Finding zur SQL-Injection oder zum Secret klicken. | *"Security passiert bei Bob direkt beim Entwickeln. Statt vier separater Tools vereint Bob Trivy, Opengrep und KICS. Wir sehen die roten Wellenlinien und Erklärungen direkt an der betroffenen Code-Zeile."* |
| **2:30 – 4:30** | **USP #1: Agentic Remediation ("Fix with Bob")** | 1. Im Findings-Panel auf **"Fix with Bob"** bei der SQL-Injection klicken.<br>2. Bob analysiert, patcht den Code und führt die Unittests aus. | *"Klassische Scanner werfen nur 300 Warnungen ab und lassen Entwickler allein. Bob repariert den Code autonom und führt sofort unsere Unittests aus. Nur wenn die Tests grün bleiben, ist der Fix verifiziert – Zero Regressions."* |
| **4:30 – 5:45** | **USP #2: SafeWrite & AI Attack Surface Scan** | 1. SafeWrite erklären (in-memory Guardrail).<br>2. Im Bob Chat eingeben: `/attack-surface-scan`. | *"Warum nicht einfach Standard-Copilot? Copilot halluziniert oft unsichere Packages. Bob hat **SafeWrite**: Eine In-Memory-Barriere, die unsichere Dependencies vor dem Festplatten-Schreibvorgang abfängt. Zudem versteht `/attack-surface-scan` Datenflüsse und findet hier sofort unseren ungeschützten Admin-Endpunkt."* |
| **5:45 – 7:00** | **USP #3: Ops & Infrastructure-as-Code** | 1. `infra/datenbank_setup.tf` öffnen.<br>2. Zeigen: Unverschlüsselte DB.<br>3. Prompt / Fix via `/terraform-devops`. | *"Auch das 'Ops' ist integriert: In unserer Terraform-Datei war die Datenbank unverschlüsselt. Bob erkennt IaC-Fehlkonfigurationen, wendet BSI/CIS-Standards an und verlangt vor jedem `apply` ein Entwickler-Approval."* |
| **7:00+** | **Fazit & Q&A** | Zusammenfassung der 3 USPs zeigen. | *"DevSecOps ohne Kontextwechsel: Erkennen, autonomes Reparieren mit Testnachweis und AI-Guardrails in einer einzigen Plattform."* |

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
