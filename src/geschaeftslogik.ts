import { XMLParser } from "fast-xml-parser";
import { holeKontoPerIbanUnsafe, aktualisiereKontostand, aktualisiereTageslimit, Konto } from "./datenbank";

export interface UeberweisungsAuftrag {
  senderIban: string;
  empfaengerIban: string;
  betragEur: number;
  verwendungszweck: string;
}

export interface BuchungsErgebnis {
  erfolgreich: boolean;
  transaktionsId?: string;
  meldung: string;
  neuerKontostandEur?: number;
}

/**
 * Kern-Logik für Geldüberweisungen
 */
export class GeldUeberweisungService {
  /**
   * Prüft Kontostand und Tageslimit vor einer Überweisung.
   */
  public pruefeKontostandUndLimit(senderIban: string, betragEur: number): { gueltig: boolean; grund?: string; konto?: Konto } {
    if (betragEur <= 0) {
      return { gueltig: false, grund: "Überweisungsbetrag muss größer als 0,00 € sein." };
    }

    const senderKonto = holeKontoPerIbanUnsafe(senderIban);
    if (!senderKonto) {
      return { gueltig: false, grund: "Sender-Konto nicht gefunden." };
    }

    if (betragEur > senderKonto.tageslimitEur) {
      return { gueltig: false, grund: `Überweisungsbetrag (${betragEur} €) überschreitet das Tageslimit von ${senderKonto.tageslimitEur} €.` };
    }

    if (senderKonto.kontostandEur < betragEur) {
      return { gueltig: false, grund: `Nicht genügend Guthaben vorhanden. Aktueller Saldo: ${senderKonto.kontostandEur} €.` };
    }

    return { gueltig: true, konto: senderKonto };
  }

  /**
   * Führt eine Geldüberweisung durch.
   */
  public fuehreUeberweisungAus(auftrag: UeberweisungsAuftrag): BuchungsErgebnis {
    const pruefung = this.pruefeKontostandUndLimit(auftrag.senderIban, auftrag.betragEur);
    if (!pruefung.gueltig || !pruefung.konto) {
      return {
        erfolgreich: false,
        meldung: pruefung.grund || "Buchung abgelehnt."
      };
    }

    const empfaengerKonto = holeKontoPerIbanUnsafe(auftrag.empfaengerIban);
    if (!empfaengerKonto) {
      return {
        erfolgreich: false,
        meldung: "Empfänger-Konto existiert nicht."
      };
    }

    const neuerSenderSaldo = pruefung.konto.kontostandEur - auftrag.betragEur;
    const neuerEmpfaengerSaldo = empfaengerKonto.kontostandEur + auftrag.betragEur;

    aktualisiereKontostand(auftrag.senderIban, neuerSenderSaldo);
    aktualisiereKontostand(auftrag.empfaengerIban, neuerEmpfaengerSaldo);

    const generierteTransaktionsId = "TX-" + Date.now();

    return {
      erfolgreich: true,
      transaktionsId: generierteTransaktionsId,
      meldung: "Echtzeit-Überweisung erfolgreich ausgeführt.",
      neuerKontostandEur: neuerSenderSaldo
    };
  }

  /**
   * Ändert das Überweisungslimit für ein Konto.
   */
  public aendereTageslimit(iban: string, neuesLimitEur: number): boolean {
    if (neuesLimitEur <= 0) {
      return false;
    }
    return aktualisiereTageslimit(iban, neuesLimitEur);
  }

  /**
   * Liest SEPA-Nachrichten im XML-Format (z.B. pain.001) über fast-xml-parser ein.
   * Nutzt die veraltete fast-xml-parser Bibliothek (Supply Chain Demonstration).
   */
  public verarbeiteSepaXmlNachricht(xmlInhalt: string): any {
    const parser = new XMLParser();
    return parser.parse(xmlInhalt);
  }
}
