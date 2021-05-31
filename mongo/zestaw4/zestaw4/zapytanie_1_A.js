// Zadanie 1_A

// Srednia waga i wzrost osob z podzialem na plec

// ponizej proba - sa tylko dwie osoby i ich sredni wzrost to 163.xx, sprawdza sie, wobec czego puszczamy praktycznie to samo zapytania na calej bazie
//printjson(db.people.find({"location.city":"Moscow"}).toArray());
// printjson(db.people.aggregate([{$match: { "location.city": "Moscow"}}, {$group: { _id: "$sex", avgwght: { $avg: { $toDecimal: "$weight" }}, avghght: { $avg: { $toDecimal:  "$height" }}}}]).toArray());

printjson(db.people.aggregate([{$group: { _id: "$sex", avgwght: { $avg: { $toDecimal: "$weight" }}, avghght: { $avg: { $toDecimal:  "$height" }}}}]).toArray());

