const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt22","root","password",{host:"127.0.0.1",dialect:"mysql",logging:false});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

db.nastavnik = require(__dirname+'/nastavnik.js')(sequelize);
db.predmeti = require(__dirname+'/predmetibaza.js')(sequelize);
db.prisustva = require(__dirname+'/prisustva.js')(sequelize);
db.studenti = require(__dirname+'/studenti.js')(sequelize);
db.nastavnik_predmeta = require(__dirname+'/nastavnik_predmeta.js')(sequelize);
//predmeti = predmetibaza
//relacije
// Veza 1-n vise prisustva na studenta
// Veza 1-n vise prisustva moze imati jedno predavanje
db.prisustva.belongsTo(db.studenti);
db.studenti.hasMany(db.prisustva);
db.predmeti.hasMany(db.prisustva);

// Veza n-m nastavnik moze imati vise predmeta, a predmet vise nastavnika
db.nastavnikPredmeta = db.predmeti.belongsToMany(db.nastavnik,{through:{model:db.nastavnik_predmeta, unique: false},constraints: false});
db.nastavnik.belongsToMany(db.predmeti,{through:{model:db.nastavnik_predmeta, unique: false},constraints: false});



module.exports=db;