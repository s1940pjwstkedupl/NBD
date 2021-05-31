#!/bin/bash

reinit_database() {
	mongo --eval 'db.dropDatabase();' nbd
	mongoimport --file=../cwiczenia2.json --db nbd --jsonArray -c people
}

set -aeu
mkdir zestaw3
(
cd zestaw3
gawk  '/^[/][/] Zadanie/{num=$3;print $0>"zapytanie_"num".js";next}{print $0>"zapytanie_"num".js"}' ../zad1.js
for x in * ; do
	echo RUNNING $x
	reinit_database
	mongo nbd "$x" >> "wyniki${x/zapytanie/}on"
done
)

