import Creature from "../models/creature.js";
import { Op } from "sequelize";

export async function getCreatures() {
    return await Creature.findAll();
}

export async function getCreatureById(id) {
    return await Creature.findByPk(id);
}

export async function findAndCountAllCreaturesByName(name) {
    return await Creature.findAndCountAll({
        where: {
            name: {
                [Op.like]: `%${name}%`,
            },
        },
    });
}
