import { DataTypes } from "@sequelize/core";
import { sequelize } from "../bdd.js";

const Effect = sequelize.define("effect", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	typeEffet: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.TEXT, 
		allowNull: true,
	},
	reference: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	value: {
		type: DataTypes.INTEGER,
		allowNull: true,
	}
});

export default Effect;
