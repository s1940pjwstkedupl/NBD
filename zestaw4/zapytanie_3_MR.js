// Zadanie 3_MR

var fmap3 = function() { emit(this.job, { }); }
var fred3 = function(k, v) { return { };}

printjson(db.people.mapReduce(fmap3, fred3, { out: "test" }));
printjson(db.test.find().toArray().map((v) => v._id));

