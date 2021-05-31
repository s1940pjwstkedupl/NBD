// Zadanie 4

// Zgodnie z informacja z wykladow nie zamieniam nic na liczby gdyz dane w postaci tekstowej powinny
// dac poprawny wynik. Niniejszym nie zamieniam i pozostaje sie modlic, ze tak jest w rzeczy samej.
printjson(db.people.find({"weight":{"$gte": "68", "$lt": "71.5"}}).toArray());

