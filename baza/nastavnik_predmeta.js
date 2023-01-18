const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Nastavnik_predmeta = sequelize.define("nastavnik_predmeta",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    }
    })
    return  Nastavnik_predmeta;
};