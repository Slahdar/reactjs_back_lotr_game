import { DataTypes } from "@sequelize/core";
import { sequelize } from "../bdd.js";
import Region from "./region.js";
import Effect from "./effect.js";

const Land = sequelize.define("land", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	powerBonus: {
		type: DataTypes.INTEGER,
		allowNull: true,
		defaultValue: 0,
	},
	toughnessBonus: {
		type: DataTypes.INTEGER,
		allowNull: true,
		defaultValue: 0,
	},
});

// Association avec la table Region
Land.belongsTo(Region, {
	foreignKey: {
		name: "regionId",
		allowNull: false,
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	},
});

// Association avec la table Effect
Land.belongsTo(Effect, {
	foreignKey: {
		name: "effectId",
		allowNull: true, 
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	},
});

export default Land;
