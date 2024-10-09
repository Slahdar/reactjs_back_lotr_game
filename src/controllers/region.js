import Region from "../models/region.js";
import { Op } from "sequelize";

export async function getRegions() {
    return await Region.findAll();
}

export async function getRegionById(id) {
    return await Region.findByPk(id);
}

export async function findAndCountAllRegionsByName(name) {
    return await Region.findAndCountAll({
        where: {
            name: {
                [Op.like]: `%${name}%`,
            },
        },
    });
}
