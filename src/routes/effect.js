import { getEffects, getEffectById } from "../controllers/effect.js";

export function effectRoutes(app) {
    // Route pour récupérer tous les effets
    app.get("/effects", async (request, reply) => {
        const effects = await getEffects();
        reply.send(effects); // Renvoie liste des effets
    });

    // Route pour récupérer un effet par ID
    app.get("/effects/:id", async (request, reply) => {
        const effect = await getEffectById(request.params.id);
        if (!effect) {
            return reply.status(404).send({ error: "Effet non trouvé" });
        }
        reply.send(effect); // Renvoie l'effet trouvé
    });
}
