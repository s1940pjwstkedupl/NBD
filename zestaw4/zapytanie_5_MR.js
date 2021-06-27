// Zadanie 5_MR

var fmap5 = function() { this.credit.forEach(e => { emit(e.currency, { cnt: 1, sum: parseFloat(e.balance) }); }); };
var fred5 = function(k, v) { return { cnt: v.reduce((acc, v) => acc + v.cnt, 0), sum: v.reduce((acc, v) => acc + v.sum, 0)}; };
var ffin5 = function(k, v) { return { sum: v.sum, avg: v.sum / v.cnt }; };

printjson(db.people.mapReduce(fmap5, fred5, { query: { nationality: "Poland", sex: "Female" }, finalize: ffin5, out: "test" }));
printjson(db.test.find().toArray());

