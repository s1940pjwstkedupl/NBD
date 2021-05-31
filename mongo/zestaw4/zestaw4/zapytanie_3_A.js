// Zadanie 3_A

// znajdujemy unikalne zawody
// moze nie jest to lista, ale z braku laku hashmapa udajaca mape moze byc jak sadze

printjson(db.people.aggregate([
	{ $group: { _id: "jobs", jobs: {$addToSet: "$job" }}}
]).toArray()[0].jobs);

