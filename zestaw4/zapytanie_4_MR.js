// Zadanie 4_MR

var fmap4 = function() {
	var bmi = parseFloat(this.weight) / Math.pow(parseFloat(this.height), 2);
	emit(this.nationality, { cnt: 1, bmiMin: bmi, bmiMax: bmi, bmiSum: bmi });
};
var fred4 = function(k, v) {
	return {
		cnt: v.reduce((acc, o) => acc + o.cnt, 0),
		bmiMin: Math.min(...v.map((o) => o.bmiMin)),
		bmiMax: Math.max(...v.map((o) => o.bmiMax)),
		bmiSum: v.reduce((acc, o) => acc + o.bmiSum, 0) };
};
var ffin4 = function(k, v) {
	return { cnt: v.cnt, bmiMin: v.bmiMin, bmiMax: v.bmiMax, bmiAvg: v.bmiSum / v.cnt };
};
printjson(db.people.mapReduce(fmap4, fred4,
	{ finalize: ffin4, out: "test" }));
printjson(db.test.find().toArray());

