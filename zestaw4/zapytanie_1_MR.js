// Zadanie 1_MR

var fmap = function () { emit(this.sex, {cnt: 1, weight: parseFloat(this.weight), height: parseFloat(this.height)}); };
var fred = function(k, v) {
	return {
		cnt: v.reduce((acc, v) => acc + v.cnt, 0.0),
		weight: v.reduce((acc, v) => acc + v.weight, 0.0),
		height: v.reduce((acc, v) => acc + v.height, 0.0)
	};
};
var ffin = function(k, v) {
	return { avgwght: v.weight / v.cnt, avghght: v.height / v.cnt };
};
printjson(db.people.mapReduce(fmap, fred, { out: "test", finalize: ffin }));
printjson(db.test.find().toArray());

