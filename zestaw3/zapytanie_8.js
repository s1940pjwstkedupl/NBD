// Zadanie 8

printjson(db.people.update({"location.city": "Moscow"}, {$set: {"location.city": "Moskwa"}}, {multi:true}));
// printjson(db.people.find({"location.city": "Moskwa" }).toArray());

