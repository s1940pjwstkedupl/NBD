// Zadanie 10

// printjson(db.people.find({job:"Editor"}).toArray().length);
printjson(db.people.update({job:"Editor"}, {$unset: {email: 1}}, {multi:true}));
// printjson(db.people.find({job:"Editor", email: { $exists: true }}).toArray().length);

