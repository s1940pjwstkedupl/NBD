// Zadanie 9

// printjson(db.people.find({first_name: "Antonio"}).toArray());
printjson(db.people.update({first_name: "Antonio"}, {$set: {hobby: "pingpong"}}, {multi:true}));
// printjson(db.people.find({first_name: "Antonio"}).toArray());

