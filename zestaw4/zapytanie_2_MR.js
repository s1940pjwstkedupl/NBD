// Zadanie 2_MR

var fmap2 = function() { this.credit.forEach((e) => emit(e.currency, parseFloat(e.balance))); }
var fred2 = function(k, v) { return v.reduce((acc, v) => acc + v, 0.0); }
printjson(db.people.mapReduce(fmap2, fred2, { out: "test" }));
printjson(db.test.find().toArray());

