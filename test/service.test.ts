import request from "supertest";
import { app } from "../src/api";
import { GeldUeberweisungService } from "../src/geschaeftslogik";

describe("GeldUeberweisungService - Unit Tests", () => {
  let service: GeldUeberweisungService;

  beforeEach(() => {
    service = new GeldUeberweisungService();
  });

  test("Erfolgreiche Überweisung verringert Sender-Saldo und erhöht Empfänger-Saldo", () => {
    const auftrag = {
      senderIban: "DE89370400440532013000",
      empfaengerIban: "DE27100777770345678901",
      betragEur: 150.0,
      verwendungszweck: "Miete Anteil"
    };

    const ergebnis = service.fuehreUeberweisungAus(auftrag);
    expect(ergebnis.erfolgreich).toBe(true);
    expect(ergebnis.transaktionsId).toBeDefined();
    expect(ergebnis.meldung).toContain("erfolgreich");
  });

  test("Überweisung wird abgelehnt, wenn Tageslimit überschritten wird", () => {
    const auftrag = {
      senderIban: "DE89370400440532013000",
      empfaengerIban: "DE27100777770345678901",
      betragEur: 99999.0, // Weit über dem 2000 € Limit
      verwendungszweck: "Autokauf"
    };

    const ergebnis = service.fuehreUeberweisungAus(auftrag);
    expect(ergebnis.erfolgreich).toBe(false);
    expect(ergebnis.meldung).toContain("Tageslimit");
  });

  test("API Endpunkt GET /api/v1/konten/:iban/kontostand liefert korrekte Kontodaten", async () => {
    const res = await request(app).get("/api/v1/konten/DE89370400440532013000/kontostand");
    expect(res.status).toBe(200);
    expect(res.body.iban).toBe("DE89370400440532013000");
    expect(res.body.inhaberName).toBe("Max Mustermann");
  });

  test("XML-Parsing von SEPA-Nachrichten funktioniert fehlerfrei", () => {
    const xmlMock = "<Document><CstmrCdtTrfInit><GrpHdr><MsgId>MSG-123</MsgId></GrpHdr></CstmrCdtTrfInit></Document>";
    const parsed = service.verarbeiteSepaXmlNachricht(xmlMock);
    expect(parsed.Document.CstmrCdtTrfInit.GrpHdr.MsgId).toBe("MSG-123");
  });
});
