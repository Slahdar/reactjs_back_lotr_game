import { getRegions, getRegionById } from "../controllers/region.js";

export function regionRoutes(app) {
    // Route pour récupérer toutes les régions
    app.get("/regions", async (request, reply) => {
        const regions = await getRegions();
        reply.send(regions); // Renvoie liste des régions
    });

    // Route pour récupérer une région par ID
    app.get("/regions/:id", async (request, reply) => {
        const region = await getRegionById(request.params.id);
        if (!region) {
            return reply.status(404).send({ error: "Région non trouvée" });
        }
        reply.send(region); // Renvoie la région trouvée
    });
}
