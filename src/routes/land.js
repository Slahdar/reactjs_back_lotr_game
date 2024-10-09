import { getLands, getLandById } from "../controllers/land.js";

export function landRoutes(app) {
    // Route pour récupérer tous les terrains
    app.get("/lands", async (request, reply) => {
        const lands = await getLands();
        reply.send(lands); // Renvoie liste des terrains
    });

    // Route pour récupérer un terrain par ID
    app.get("/lands/:id", async (request, reply) => {
        const land = await getLandById(request.params.id);
        if (!land) {
            return reply.status(404).send({ error: "Terrain non trouvé" });
        }
        reply.send(land); // Renvoie le terrain trouvé
    });
}
