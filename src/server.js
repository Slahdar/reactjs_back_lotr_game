import chalk from "chalk";
//pour fastify
import fastify from "fastify";
import fastifyBcrypt from "fastify-bcrypt";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyJWT from "@fastify/jwt";
//bdd
import { sequelize } from "./bdd.js";
import {
	getUserById,
	getUsers,
	loginUser,
	registerUser,
} from "./controllers/users.js";
import { createGame, joinGame } from "./controllers/games.js";
//Test de la connexion
try {
	sequelize.authenticate();
	console.log(chalk.grey("Connecté à la base de données MySQL!"));
} catch (error) {
	console.error("Impossible de se connecter, erreur suivante :", error);
}

/**
 * API
 * avec fastify
 */
const app = fastify();
//Ajout du plugin fastify-bcrypt pour le hash du mdp
await app
	.register(fastifyBcrypt, {
		saltWorkFactor: 12,
	})
	.register(cors, {
		origin: "*",
	})
	.register(fastifySwagger, {
		openapi: {
			openapi: "3.0.0",
			info: {
				title: "Documentation de l'API JDR LOTR",
				description:
					"API développée pour un exercice avec React avec Fastify et Sequelize",
				version: "0.1.0",
			},
		},
	})
	.register(fastifySwaggerUi, {
		routePrefix: "/documentation",
		theme: {
			title: "Docs - JDR LOTR API",
		},
		uiConfig: {
			docExpansion: "list",
			deepLinking: false,
		},
		uiHooks: {
			onRequest: function (request, reply, next) {
				next();
			},
			preHandler: function (request, reply, next) {
				next();
			},
		},
		staticCSP: true,
		transformStaticCSP: (header) => header,
		transformSpecification: (swaggerObject, request, reply) => {
			return swaggerObject;
		},
		transformSpecificationClone: true,
	})
	.register(fastifyJWT, {
		secret: "unanneaupourlesgouvernertous",
	});
/**********
 * Routes
 **********/
app.get("/", (request, reply) => {
	reply.send({ documentationURL: "http://localhost:3000/documentation" });
});
// Fonction pour décoder et vérifier le token
app.decorate("authenticate", async (request, reply) => {
	try {
		await request.jwtVerify();
	} catch (err) {
		reply.send(err);
	}
});
/**
 * gestion utilisateurs
 */
//connexion
app.post("/login", async (request, reply) => {
	reply.send(await loginUser(request.body, app));
});
//inscription
app.post("/register", async (request, reply) => {
	reply.send(await registerUser(request.body, app.bcrypt));
});
//récupération de la liste des utilisateurs
app.get("/users", async (request, reply) => {
	reply.send(await getUsers());
});
//récupération d'un utilisateur par son id
app.get("/users/:id", async (request, reply) => {
	reply.send(await getUserById(request.params.id));
});
/**
 * gestion des jeux
 */
//création d'un jeu
app.post(
	"/game",
	{ preHandler: [app.authenticate] },
	async (request, reply) => {
		reply.send(await createGame(request.body.userId));
	}
);
//rejoindre un jeu
app.patch(
	"/game/:gameId",
	{ preHandler: [app.authenticate] },
	async (request, reply) => {
		reply.send(await joinGame(request.params.gameId, request.body.userId));
	}
);

/**********
 * START
 **********/
const start = async () => {
	try {
		await sequelize
			.sync({ alter: true })
			.then(() => {
				console.log(chalk.green("Base de données synchronisée."));
			})
			.catch((error) => {
				console.error(
					"Erreur de synchronisation de la base de données :",
					error
				);
			});
		await app.listen({ port: 3000 });
		console.log(
			"Serveur Fastify lancé sur " + chalk.blue("http://localhost:3000")
		);
		console.log(
			chalk.bgYellow(
				"Accéder à la documentation sur http://localhost:3000/documentation"
			)
		);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};
start();
