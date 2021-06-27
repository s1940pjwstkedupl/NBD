// Zadanie 6

printjson(db.people.insert({"sex":"Male","first_name":"Jedrzej","last_name":"Dudkiewicz","job":"Yes","email":"s1940@pjwstk.edu.pl","location":{"city":"Warsaw","address":{"streetname":"Ulica","streetnumber":"1"}},"description":"Czlek-orkiestra","height":"180.00","weight":"80.00","birth_date":"1980-02-21T02:55:03Z","nationality":"Poland","credit":[{"type":"switch","number":"6759888939100098699","currency":"PLN","balance":"5117.06"}]}));
// printjson(db.people.find({first_name: "Jedrzej"}).toArray());

