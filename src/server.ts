import { app } from "./api";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[GeldUeberweisungService] Läuft auf Port ${PORT}`);
});
