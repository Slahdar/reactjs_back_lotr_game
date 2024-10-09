import { DataTypes } from "@sequelize/core";
import { sequelize } from "../bdd.js";
import Faction from "./faction.js";
import Region from "./region.js";
import Effect from "./effect.js";

const Creature = sequelize.define("creature", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	power: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	toughness: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	cost: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

// Association avec la table Faction
Creature.belongsTo(Faction, {
	foreignKey: {
		name: "factionId",
		allowNull: false,
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	},
});

// Association avec la table Region
Creature.belongsTo(Region, {
	foreignKey: {
		name: "regionId",
		allowNull: false,
		onDelete: "CASCADE",
		onUpdate: "CASCADE", 
	},
});

// Association avec la table Effect
Creature.belongsTo(Effect, {
	foreignKey: {
		name: "effectId",
		allowNull: true, 
		onDelete: "SET NULL",
		onUpdate: "CASCADE", 
	},
});

export default Creature;
