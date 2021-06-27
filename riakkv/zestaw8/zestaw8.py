# -*- coding: utf-8 -*-
import requests

url='http://192.168.9.119:8098'

# Ponieważ nie ma ani słowa w zadaniu 8 o typie dokumentu, to używam text/plain. Zakładam, że nic się nie stanie.
headers = {'User-Agent': 'Mozilla/5.0', 'Content-Type': 'text/plain'}
def prt(r):
    print("---------------------------\nStatus: {}\nHeaders: {}\n".format(x.status_code, x.headers))

# Napisz program, który wrzuci do bazy dokument,
x = requests.post(url + '/buckets/s1940/keys', data='Text', headers=headers)
prt(x)

doc_location = x.headers['Location']
print("Dokument zapisany jako: {}".format(doc_location))

# pobierze go i wypisze,

x = requests.get(url + doc_location, headers=headers)
prt(x)
print("Pobrany dokument: {}".format(x.text))

# zmodyfikuje go,

#  co prawda nie ma nic o zapisie po zmodyfikowaniu (a w konktekście mam go lokalnie),
#  ale zakładam, że jednak chodizło o to, żeby użyc tego PUT

x = requests.put(url + doc_location, data='Text zmodyfikowany', headers=headers)
prt(x)
print("Zmodyfikowany dokument został zapisany")

# następnie pobierze i wypisze,

x = requests.get(url + doc_location, headers=headers)
prt(x)
print("Pobrany dokument po modyfikacji: {}".format(x.text))

# a na końcu usunie go

x = requests.delete(url + doc_location, headers=headers)
prt(x)
print ("Wynik próby usunięcia: {}".format(x.status_code))

# i spróbuje pobrać z bazy.

x = requests.get(url + doc_location, headers=headers)
prt(x)
print ("Wynik próby pobrania: {}".format(x.status_code))

