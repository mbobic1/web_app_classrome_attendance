const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Predmetibaza = sequelize.define("predmet",{
        naziv:Sequelize.STRING,
        brojPredavanjaSedmicno:Sequelize.INTEGER,
        brojVjezbiSedmicno:Sequelize.INTEGER
    })
    return Predmetibaza;
};
