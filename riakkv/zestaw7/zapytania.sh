
export url='http://192.168.9.119:8098'
export buck="$url/buckets/s1940"

getloc() {
	grep -E '^Location:' "$1" | cut -f2 -d' '
}

# 1.	Umieść w bazie (nazwa bucketa ma być Twoim numerem indeksu poprzedzonym literą „s”) 5 wartości, gdzie każda z nich ma być dokumentem json mającym 4 pola co najmniej dwóch różnych typów. 

cmd_1() {

export doc1='{"k1": 1, "k2": 1, "k3": 1, "k4": "v1"}'
export doc2='{"k1": 2, "k2": 2, "k3": 2, "k4": "v2"}'
export doc3='{"k1": 3, "k2": 3, "k3": 3, "k4": "v3"}'
export doc4='{"k1": 4, "k2": 4, "k3": 4, "k4": "v4"}'
export doc5='{"k1": 5, "k2": 5, "k3": 5, "k4": "v5"}'

for x in $(seq 1 5) ; do
	curl -i -o wynik1_$x.txt -XPOST -H 'content-type: application/json' --data "'$(eval echo \$doc$x)'" $buck/keys
done
}

# 2.	Pobierz z bazy jedną z dodanych przez Ciebie wartości. 

cmd_2() {
	dos2unix wynik1_1.txt
	curl -i -o wynik2.txt -XGET -H 'content-type: application/json' $url/$(getloc wynik1_1.txt)
}
# 3.	Zmodyfikuj jedną z wartości – dodając dodatkowe pole do dokumentu.

cmd_3() {
	# prawie to samo co niżej, tylko bez komentarzy
	dos2unix wynik1_1.txt
	loc=$(getloc wynik1_1.txt)
	val=$(curl -XGET -H 'content-type: application/json' $url/$loc)
	val=$(echo $val | gawk '{$4=$4" \"k5\": 5," ;print $0}')
	echo val=$val
	curl -i -o wynik3.txt --data "$val" -XPUT -H 'content-type: application/json' $url/$loc
	cat wynik4.txt
	curl -XGET -H 'content-type: application/json' $url/$loc
}

# 4.	Zmodyfikuj jedną z wartości – usuwając jedną pole z wybranego dokumentu.
cmd_4() {
	# prawie to samo co niżej, tylko bez komentarzy
	dos2unix wynik1_4.txt
	loc=$(getloc wynik1_4.txt)
	val=$(curl -XGET -H 'content-type: application/json' $url/$loc)
	val=$(echo $val | gawk '{$3="";$4=""; ;print $0}')
	echo val=$val
	curl -i -o wynik4.txt --data "$val" -XPUT -H 'content-type: application/json' $url/$loc
	cat wynik4.txt
	curl -XGET -H 'content-type: application/json' $url/$loc
}
# 5.	Zmodyfikuj jedną z wartości – zmieniając wartość jednego z pól.  
cmd_5() {
	# będziemy modyfikować wartość k1 w doc3 - będziemy dodawać za każdym razem 1
	# ponieważ działam pod cygwinem, dos2unix jest konieczne
	dos2unix wynik1_3.txt
	# pobieramy Location pod którym zapisany jest dokument
	loc=$(getloc wynik1_3.txt)
	# pobieramy wartość bez nagłówków
	val=$(curl -XGET -H 'content-type: application/json' $url/$loc)
	# zwiększamy pole o 1 - jak się zmieni dokumenet to nie zadziała, ale cóż
	val=$(echo $val | gawk '{$2=($2+1)",";print $0}')
	# wypisujemy w celach debugowych
	echo val=$val
	# wsadzamy wartość z powrotem przy użyciu PUT
	curl -i -o wynik5.txt --data "$val" -XPUT -H 'content-type: application/json' $url/$loc
	# i wypisujemy sobie co też tam w wynik5.txt się znalazło
	cat wynik5.txt
	# ponieważ dostajemy No Content, pobierzemys obie dokument raz jeszcze, żeby zobaczyć, czy sie zmieniło
	curl -XGET -H 'content-type: application/json' $url/$loc
}

# 6.	Usuń jeden z dokumentów z bazy. 
cmd_6() {
    # usuwanie dokument doc5
	dos2unix wynik1_5.txt
	loc=$(getloc wynik1_5.txt)
	curl -i -o wynik6.txt -XDELETE $url/$loc
	cat wynik6.txt
}

# 7.	Spróbuj pobrać z bazy wartość, która nie istnieje w tej bazie. 

cmd_7() {
    # pobranie przed chwilą usuniętej wartości
	dos2unix wynik1_5.txt
	loc=$(getloc wynik1_5.txt)
	curl -i -o wynik7.txt -XGET $url/$loc
	cat wynik7.txt
}

# 8.	Dodaj do bazy 1 dokument json (zawierający 1 pole), ale nie specyfikuj klucza. 

cmd_8() {
	# w zasadzie nie ma co robić, bo od początku robię to samo, ale proszę bardzo:
	curl -i -o wynik8.txt -XPOST -H 'content-type: application/json' --data '{"a": 1}' $buck/keys
	dos2unix wynik8.txt
    cat wynik8.txt
}

# 9.	Pobierz z bazy element z zadania 8. 

cmd_9() {
	loc=$(getloc wynik8.txt)
	curl -i -o wynik9.txt -XGET $url/$loc
	dos2unix wynik9.txt
	cat wynik9.txt
}

# 10.	Usuń z bazy element z zadania 8. 

cmd_10() {
	loc=$(getloc wynik8.txt)
	curl -i -o wynik10.txt -XDELETE $url/$loc
	dos2unix wynik10.txt
	cat wynik10.txt
}

#### WYKONANIE KOMENDY cmd_<PIERWSZY ARGUMENT SKRYPTU>

eval cmd_$1

