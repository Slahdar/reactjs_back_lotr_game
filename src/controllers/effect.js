import Effect from "../models/effect.js";
import { Op } from "sequelize";

export async function getEffects() {
    return await Effect.findAll();
}

export async function getEffectById(id) {
    return await Effect.findByPk(id);
}

export async function findAndCountAllEffectsByType(type) {
    return await Effect.findAndCountAll({
        where: {
            type_effect: {
                [Op.eq]: type,
            },
        },
    });
}
