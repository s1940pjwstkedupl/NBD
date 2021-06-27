mongo --eval 'db.dropDatabase();' nbd
mongoimport --file=cwiczenia2.json --db nbd --jsonArray -c people
