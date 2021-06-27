// Zadanie 1

printjson(db.people.findOne({}));

// Zadanie 2

printjson(db.people.findOne({"nationality": "China", "sex":"Female"}));

// Zadanie 3

printjson(db.people.find({"nationality": "Germany"}).toArray());

// Zadanie 4

// Zgodnie z informacja z wykladow nie zamieniam nic na liczby gdyz dane w postaci tekstowej powinny
// dac poprawny wynik. Niniejszym nie zamieniam i pozostaje sie modlic, ze tak jest w rzeczy samej.
printjson(db.people.find({"weight":{"$gte": "68", "$lt": "71.5"}}).toArray());

// Zadanie 5

// jak wyzej, dodatkowo XXI wiek liczymy poprawnie, od 1 stycznia 2001 wzwyz (czy tez "i dalej")
printjson(db.people.find({birth_date: { $gte: "2001-01-01T00:00:00Z" }}, {first_name: 1, last_name: 1, location: { city: 1 }}).toArray());

// Zadanie 6

printjson(db.people.insert({"sex":"Male","first_name":"Jedrzej","last_name":"Dudkiewicz","job":"Yes","email":"s1940@pjwstk.edu.pl","location":{"city":"Warsaw","address":{"streetname":"Ulica","streetnumber":"1"}},"description":"Czlek-orkiestra","height":"180.00","weight":"80.00","birth_date":"1980-02-21T02:55:03Z","nationality":"Poland","credit":[{"type":"switch","number":"6759888939100098699","currency":"PLN","balance":"5117.06"}]}));
// printjson(db.people.find({first_name: "Jedrzej"}).toArray());

// Zadanie 7

printjson(db.people.remove({height: {$gt: "190.00"}}));

// Zadanie 8

printjson(db.people.update({"location.city": "Moscow"}, {$set: {"location.city": "Moskwa"}}, {multi:true}));
// printjson(db.people.find({"location.city": "Moskwa" }).toArray());

// Zadanie 9

// printjson(db.people.find({first_name: "Antonio"}).toArray());
printjson(db.people.update({first_name: "Antonio"}, {$set: {hobby: "pingpong"}}, {multi:true}));
// printjson(db.people.find({first_name: "Antonio"}).toArray());

// Zadanie 10

// printjson(db.people.find({job:"Editor"}).toArray().length);
printjson(db.people.update({job:"Editor"}, {$unset: {email: 1}}, {multi:true}));
// printjson(db.people.find({job:"Editor", email: { $exists: true }}).toArray().length);

