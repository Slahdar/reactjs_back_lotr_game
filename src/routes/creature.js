import { getCreatures, getCreatureById } from "../controllers/creature.js";

export function creatureRoutes(app) {
    // Route pour récupérer toutes les créatures
    app.get("/creatures", async (request, reply) => {
        const creatures = await getCreatures();
        reply.send(creatures); // Renvoie liste des créatures
    });

    // Route pour récupérer une créature par ID
    app.get("/creatures/:id", async (request, reply) => {
        const creature = await getCreatureById(request.params.id);
        if (!creature) {
            return reply.status(404).send({ error: "Créature non trouvée" });
        }
        reply.send(creature); // Renvoie la créature trouvée
    });
}
