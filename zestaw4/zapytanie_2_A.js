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

