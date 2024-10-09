import { DataTypes } from "@sequelize/core";
import { sequelize } from "../bdd.js";
import Effect from "./effect.js";

const Region = sequelize.define("region", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    effectId: {
        type: DataTypes.INTEGER, 
        allowNull: true,
        references: {
            model: Effect, 
            key: 'id'
        }
    }
});

// Association avec Effect
Region.belongsTo(Effect, {
    foreignKey: {
        name: "effectId",
        allowNull: true,
        onDelete: "SET NULL", 
        onUpdate: "CASCADE",
    }
});

export default Region;
