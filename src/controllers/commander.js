import Commander from "../models/commander.js";
import { Op } from "sequelize";

export async function getCommanders() {
    return await Commander.findAll();
}

export async function getCommanderById(id) {
    return await Commander.findByPk(id);
}

export async function findAndCountAllCommandersByName(name) {
    return await Commander.findAndCountAll({
        where: {
            name: {
                [Op.like]: `%${name}%`,
            },
        },
    });
}
