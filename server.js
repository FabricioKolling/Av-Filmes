const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com PostgreSQL
const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "cinema_critico",
    password: "SENHA_DO_PGADMIN",
    port: 5432
});

// 📌 Rota 1 — Listar filmes
app.get("/filmes", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM filmes ORDER BY id");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📌 Rota 2 — Obter média de notas
app.get("/filmes/:id/media", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            "SELECT AVG(nota) AS media FROM avaliacoes WHERE filme_id = $1",
            [id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📌 Rota 3 — Registrar nova avaliação
app.post("/avaliar", async (req, res) => {
    const { filme_id, nota, comentario } = req.body;

    try {
        await db.query(
            "INSERT INTO avaliacoes (filme_id, nota, comentario) VALUES ($1, $2, $3)",
            [filme_id, nota, comentario]
        );
        res.json({ message: "Avaliação registrada com sucesso!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
