const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Autor = sequelize.define("studenti",{
        name:Sequelize.STRING,
        index:Sequelize.INTEGER
    })
    return Autor;
};
