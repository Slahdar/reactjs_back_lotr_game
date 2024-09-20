import Game from "../models/games.js";

export async function createGame(userId) {
	if (!userId) {
		return { error: "L'identifiant du joueur est manquant" };
	}
	const datas = await Game.create({ creator: userId });
	console.log(datas.dataValues.id);
	return { gameId: datas.dataValues.id };
}
export async function joinGame(gameId, userId) {
	if (!userId) {
		return { error: "L'identifiant du joueur est manquant" };
	} else if (!gameId) {
		return { error: "L'identifiant de la partie est manquant" };
	}
	const game = await Game.findByPk(gameId);
	if (!game) {
		return { error: "La partie n'existe pas." };
	}
	if (game.dataValues.state != "pending") {
		return { error: "Cette partie n'est plus en attente." };
	}
	if (game.dataValues.player != null) {
		return { error: "Il y a déjà 2 joueurs dans cette partie !" };
	}
	await game.setPlayer2(userId);
	return game;
}
