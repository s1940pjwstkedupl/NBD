import requests

url='http://192.168.9.119:8098'

headers = {'User-Agent': 'Mozilla/5.0', 'Content-Type': 'application/json'}

# taka mała rozgrzeweczka:
x = requests.get(url + '/buckets?buckets=true', headers=headers)
print(x.headers)
print(x.text)

# Napisz program, który wrzuci do bazy dokument,
x.close()
x = requests.post(url + '/buckets/s1940/keys', data='Text', headers=headers)
print(x)
print ("Headers: {}".format(x.headers))

doc_location = x.headers['Location']
print("Dokument zapisany jako: {}".format(doc_location))

# pobierze go i wypisze,

x = requests.get(url + doc_location, headers=headers)
print("Pobrany dokument: {}".format(x.text))

# zmodyfikuje go,

#  co prawda nie ma nic o zapisie po zmodyfikowaniu (a w konktekście mam go lokalnie),
#  ale zakładam, że jednak chodizło o to, żeby użyc tego PUT

x = requests.put(url + doc_location, data='Text zmodyfikowany', headers=headers)
print("Zmodyfikowany dokument został zapisany")

# następnie pobierze i wypisze,

x = requests.get(url + doc_location, headers=headers)
print("Pobrany dokument po modyfikacji: {}".format(x.text))

# a na końcu usunie go

x = requests.delete(url + doc_location, headers=headers)
print ("Wynik próby usunięcia: {}".format(x.status_code))

# i spróbuje pobrać z bazy.

x = requests.get(url + doc_location, headers=headers)
print ("Wynik próby pobrania: {}".format(x.status_code))

