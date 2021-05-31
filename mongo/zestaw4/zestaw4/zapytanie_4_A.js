// Zadanie 4_A

printjson(db.people.aggregate([
	{ $project: { nationality: true, bmi: {
		$divide: [ { $toDouble: "$weight" }, { $pow: [ {$toDouble: "$height"}, 2 ]}]
	}}},
	{ $group: { _id: "$nationality", bmiMin: { $min: "$bmi" }, bmiMax: { $max: "$bmi" }, bmiAvg: { $avg: "$bmi" } } }
]).toArray());

