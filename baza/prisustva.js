const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Prisustva = sequelize.define("prisustva",{
        sedmica:Sequelize.STRING,
        predavanja:Sequelize.INTEGER,
        vjezbe:Sequelize.INTEGER,
        index:Sequelize.INTEGER
    })
    return Prisustva;
};
