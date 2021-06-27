// Zadanie 5_A

// dla kobiet z polski w podziale na waluty srednia i laczna warto srodkow. czyli match plus zadanie 2


printjson(db.people.aggregate([
	// najpierw wyciagamy wszystkie polki:
	{ $match : { nationality: "Poland", sex: "Female" } },
	// a teraz odpalamy zadanie 2 powinno wszystko grac
	{ $unwind: "$credit" },
	{ $group: { _id: "$credit.currency", total: { $sum: { $toDecimal: "$credit.balance" } }, avg: { $avg: { $toDecimal: "$credit.balance" } } } }
]).toArray());


