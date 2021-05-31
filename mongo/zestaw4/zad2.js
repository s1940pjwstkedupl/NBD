// Zadanie 1_A

// Srednia waga i wzrost osob z podzialem na plec

// ponizej proba - sa tylko dwie osoby i ich sredni wzrost to 163.xx, sprawdza sie, wobec czego puszczamy praktycznie to samo zapytania na calej bazie
//printjson(db.people.find({"location.city":"Moscow"}).toArray());
// printjson(db.people.aggregate([{$match: { "location.city": "Moscow"}}, {$group: { _id: "$sex", avgwght: { $avg: { $toDecimal: "$weight" }}, avghght: { $avg: { $toDecimal:  "$height" }}}}]).toArray());

printjson(db.people.aggregate([{$group: { _id: "$sex", avgwght: { $avg: { $toDecimal: "$weight" }}, avghght: { $avg: { $toDecimal:  "$height" }}}}]).toArray());

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

// Zadanie 2_A

// najpierw sprawdzamy dla jakiego kraju mamy malo wpisow
// printjson(db.people.aggregate([{$group: { _id: "$nationality", count: { $sum: 1} }}, {$sort: { count: 1 }}]).toArray());
// wyglada na to, ze burundi ma bardzo piekna reprezentacje, 4 osoby i sporo walut
// printjson(db.people.find({nationality:"Burundi"}).toArray());

// sprawdzamy, czy dziala
/*
printjson(
	db.people.aggregate([{$match: { nationality: "Burundi" }},
		{ $unwind: "$credit" } ,
		{ $group: { _id: "$credit.currency", total: { $sum: { $toDecimal: "$credit.balance" } } } },
		{ $sort: {  _id: 1 }}
	]).toArray()
);
*/

// wyglada na to, ze dziala jak zloto, puszczamy po calosci. sprawdzic z reki nie idzie, dopiero jak bedziemy robic mapReduce bedzie mozna sprawdzic

printjson(
	db.people.aggregate([
		{ $unwind: "$credit" } ,
		{ $group: { _id: "$credit.currency", total: { $sum: { $toDecimal: "$credit.balance" } } } },
		{ $sort: {  _id: 1 }}
	]).toArray()
);

// Zadanie 2_MR

var fmap2 = function() { this.credit.forEach((e) => emit(e.currency, parseFloat(e.balance))); }
var fred2 = function(k, v) { return v.reduce((acc, v) => acc + v, 0.0); }
printjson(db.people.mapReduce(fmap2, fred2, { out: "test" }));
printjson(db.test.find().toArray());

// Zadanie 3_A

// znajdujemy unikalne zawody
// moze nie jest to lista, ale z braku laku hashmapa udajaca mape moze byc jak sadze

printjson(db.people.aggregate([
	{ $group: { _id: "jobs", jobs: {$addToSet: "$job" }}}
]).toArray()[0].jobs);

// Zadanie 3_MR

var fmap3 = function() { emit(this.job, { }); }
var fred3 = function(k, v) { return { };}

printjson(db.people.mapReduce(fmap3, fred3, { out: "test" }));
printjson(db.test.find().toArray().map((v) => v._id));

// Zadanie 4_A

printjson(db.people.aggregate([
	{ $project: { nationality: true, bmi: {
		$divide: [ { $toDouble: "$weight" }, { $pow: [ {$toDouble: "$height"}, 2 ]}]
	}}},
	{ $group: { _id: "$nationality", bmiMin: { $min: "$bmi" }, bmiMax: { $max: "$bmi" }, bmiAvg: { $avg: "$bmi" } } }
]).toArray());

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

// Zadanie 5_A

// dla kobiet z polski w podziale na waluty srednia i laczna warto srodkow. czyli match plus zadanie 2


printjson(db.people.aggregate([
	// najpierw wyciagamy wszystkie polki:
	{ $match : { nationality: "Poland", sex: "Female" } },
	// a teraz odpalamy zadanie 2 powinno wszystko grac
	{ $unwind: "$credit" },
	{ $group: { _id: "$credit.currency", total: { $sum: { $toDecimal: "$credit.balance" } }, avg: { $avg: { $toDecimal: "$credit.balance" } } } }
]).toArray());


// Zadanie 5_MR

var fmap5 = function() { this.credit.forEach(e => { emit(e.currency, { cnt: 1, sum: parseFloat(e.balance) }); }); };
var fred5 = function(k, v) { return { cnt: v.reduce((acc, v) => acc + v.cnt, 0), sum: v.reduce((acc, v) => acc + v.sum, 0)}; };
var ffin5 = function(k, v) { return { sum: v.sum, avg: v.sum / v.cnt }; };

printjson(db.people.mapReduce(fmap5, fred5, { query: { nationality: "Poland", sex: "Female" }, finalize: ffin5, out: "test" }));
printjson(db.test.find().toArray());

