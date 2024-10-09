import { getCommanders, getCommanderById } from "../controllers/commander.js";

export function commanderRoutes(app) {
    // Route pour récupérer tous les commandants
    app.get("/commanders", async (request, reply) => {
        const commanders = await getCommanders();
        reply.send(commanders); // Renvoie liste des commandants
    });

    // Route pour récupérer un commandant par ID
    app.get("/commanders/:id", async (request, reply) => {
        const commander = await getCommanderById(request.params.id);
        if (!commander) {
            return reply.status(404).send({ error: "Commandant non trouvé" });
        }
        reply.send(commander); // Renvoie le commandant trouvé
    });
}
