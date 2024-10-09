import { getFactions, getFactionById } from "../controllers/faction.js";

export function factionRoutes(app) {
    // Route pour récupérer toutes les factions
    app.get("/factions", async (request, reply) => {
        const factions = await getFactions();
        reply.send(factions); // Renvoie liste des factions
    });

    // Route pour récupérer une faction par ID
    app.get("/factions/:id", async (request, reply) => {
        const faction = await getFactionById(request.params.id);
        if (!faction) {
            return reply.status(404).send({ error: "Faction non trouvée" });
        }
        reply.send(faction); // Renvoie la faction trouvée
    });
}
