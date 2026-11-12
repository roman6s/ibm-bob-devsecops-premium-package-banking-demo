import express, { Request, Response } from "express";
import { GeldUeberweisungService, UeberweisungsAuftrag } from "./geschaeftslogik";
import { holeKontoPerIbanUnsafe } from "./datenbank";

export const app = express();
app.use(express.json());

const ueberweisungService = new GeldUeberweisungService();

/**
 * 1. Reguläre Überweisung durchführen
 */
app.post("/api/v1/ueberweisungen", (req: Request, res: Response) => {
  const { senderIban, empfaengerIban, betragEur, verwendungszweck } = req.body;

  if (!senderIban || !empfaengerIban || typeof betragEur !== "number") {
    return res.status(400).json({ fehler: "Ungültige Überweisungsparameter." });
  }

  const auftrag: UeberweisungsAuftrag = {
    senderIban,
    empfaengerIban,
    betragEur,
    verwendungszweck: verwendungszweck || "SEPA-Überweisung"
  };

  const ergebnis = ueberweisungService.fuehreUeberweisungAus(auftrag);

  if (!ergebnis.erfolgreich) {
    return res.status(422).json(ergebnis);
  }

  return res.status(200).json(ergebnis);
});

/**
 * 2. Kontostand abfragen
 */
app.get("/api/v1/konten/:iban/kontostand", (req: Request, res: Response) => {
  const iban = req.params.iban;
  const konto = holeKontoPerIbanUnsafe(iban);

  if (!konto) {
    return res.status(404).json({ fehler: "Konto nicht gefunden." });
  }

  return res.status(200).json({
    iban: konto.iban,
    inhaberName: konto.inhaberName,
    kontostandEur: konto.kontostandEur,
    tageslimitEur: konto.tageslimitEur
  });
});

/**
 * 3. Demo-Schwachstelle 3 (Architektur / Logik-Lücke):
 * Ungeschützter Admin-Endpunkt ohne Token-Prüfung oder Rollen-Validierung.
 * Jeder Aufrufer kann das Tageslimit eines beliebigen Kontos beliebig erhöhen.
 * (Wird durch den Bob AI Attack Surface Scan "/attack-surface-scan" als Trust-Boundary-Lücke erkannt).
 */
app.post("/api/v1/admin/tageslimit-erhoehen", (req: Request, res: Response) => {
  const { iban, neuesLimitEur } = req.body;

  if (!iban || typeof neuesLimitEur !== "number") {
    return res.status(400).json({ fehler: "IBAN und neues Limit erforderlich." });
  }

  const erfolgreich = ueberweisungService.aendereTageslimit(iban, neuesLimitEur);

  if (!erfolgreich) {
    return res.status(400).json({ fehler: "Limit konnte nicht geändert werden." });
  }

  return res.status(200).json({
    status: "LIMIT_ERHOEHT",
    iban: iban,
    neuesTageslimitEur: neuesLimitEur
  });
});
