import express from "express";
import cors from "cors";

import conn from "./config/conn.js";
import {
  Empresa,
  Usuario,
  Publicacao,
  Comentario,
  Curtida,
} from "./models/index.js";

import {
  empresaRouter,
  usuarioRouter,
  publicacaoRouter,
} from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true })); //body com imagem
app.use(express.json()); //body apenas com texto

conn
  .sync()
  .then()
  .catch((error) => console.error(error));

app.use("/api/empresas", empresaRouter);
app.use("/api/publicacoes", publicacaoRouter);

app.use("*", (req, res) => {
  res.status(404).json({ err: "Rota não encontrada" });
});

export default app;
