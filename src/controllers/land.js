import Land from "../models/land.js";
import { Op } from "sequelize";

export async function getLands() {
    return await Land.findAll();
}

export async function getLandById(id) {
    return await Land.findByPk(id);
}

export async function findAndCountAllLandsByName(name) {
    return await Land.findAndCountAll({
        where: {
            name: {
                [Op.like]: `%${name}%`,
            },
        },
    });
}
