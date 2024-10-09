import Faction from "../models/faction.js";
import { Op } from "sequelize";

export async function getFactions() {
    return await Faction.findAll();
}

export async function getFactionById(id) {
    return await Faction.findByPk(id);
}

export async function findAndCountAllFactionsByName(name) {
    return await Faction.findAndCountAll({
        where: {
            name: {
                [Op.like]: `%${name}%`,
            },
        },
    });
}
