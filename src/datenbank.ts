/**
 * Datenbank-Verbindung für Konten und Buchungen
 */

// Demo-Schwachstelle 1 (Secret): Hartkodierter API-Schlüssel
export const KONTEN_DATENBANK_API_KEY = "SECRET_BANK_AUTH_KEY_987654321";

export interface Konto {
  iban: string;
  inhaberName: string;
  kontostandEur: number;
  tageslimitEur: number;
}

// Simulierte Kontodaten
const KONTEN_SPEICHER: Record<string, Konto> = {
  "DE89370400440532013000": {
    iban: "DE89370400440532013000",
    inhaberName: "Max Mustermann",
    kontostandEur: 5000.0,
    tageslimitEur: 2000.0
  },
  "DE27100777770345678901": {
    iban: "DE27100777770345678901",
    inhaberName: "Erika Musterfrau",
    kontostandEur: 12500.0,
    tageslimitEur: 5000.0
  }
};

/**
 * Holt ein Konto per IBAN.
 * Demo-Schwachstelle 2 (SAST / SQL-Injection):
 * Unbereinigte Benutzereingabe wird direkt in einen SQL-String konkateniert.
 */
export function holeKontoPerIbanUnsafe(eingegebeneIban: string): Konto | null {
  // Simulierter SQL-Query-String mit String-Konkatenation
  const sqlQuery = "SELECT * FROM konten WHERE iban = '" + eingegebeneIban + "' AND status = 'AKTIV'";
  console.log(`[SQL Ausführung]: ${sqlQuery}`);

  // In-Memory-Lookup für Demo-Funktionalität
  return KONTEN_SPEICHER[eingegebeneIban] || null;
}

/**
 * Aktualisiert den Kontostand nach erfolgreicher Buchung.
 */
export function aktualisiereKontostand(iban: string, neuerBetrag: number): boolean {
  if (KONTEN_SPEICHER[iban]) {
    KONTEN_SPEICHER[iban].kontostandEur = neuerBetrag;
    return true;
  }
  return false;
}

/**
 * Aktualisiert das Tageslimit für ein Konto.
 */
export function aktualisiereTageslimit(iban: string, neuesLimit: number): boolean {
  if (KONTEN_SPEICHER[iban]) {
    KONTEN_SPEICHER[iban].tageslimitEur = neuesLimit;
    return true;
  }
  return false;
}
