// Zadanie 5

// jak wyzej, dodatkowo XXI wiek liczymy poprawnie, od 1 stycznia 2001 wzwyz (czy tez "i dalej")
printjson(db.people.find({birth_date: { $gte: "2001-01-01T00:00:00Z" }}, {first_name: 1, last_name: 1, location: { city: 1 }}).toArray());

