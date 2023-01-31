# twojejedzenie.pl - Aplikacja do zamawiania dań przez Internet

Projekt z przedmiotów: Pratyka Programowania Python, Projektowanie Aplikacji Internetowych, Organizacja i Rozwój Projektów Open Source

Autor: Sebastian **RICHTER**

Politechnika Śląska.

Wydział Automatyki, Elektroniki i Informatyki.

kierunek: Informatyka SSM, semestr 2.

specjalność: Oprogramowanie systemowe.

## Instrukcja uruchomienia aplikacji

1. Zainstalować Dockera wraz z narzędziem Docker Desktop.
2. Przejść do folderu backend, otworzyć wiersz poleceń i wpisać komendę docker-compose up, aby uruchomić backend.
3. Przejść do folderu ordereatfront, otworzyć wiersz poleceń i wpisać komendę docker-compose up, aby uruchomić frontend.
4. Gdy uruchomi się frontend i backend, otworzyć przeglądarkę internetową i wpisać w niej adres https://localhost:3000.

## Zasada działania aplikacji dla poszczególnych użytkowników

- **Niezalogowany użytkownik**
- Może wyszukiwać restauracje znajdujące się w lub w pobliżu podanej przez niego lokalizacji. Na stronie głównej użytkownik
  podaje lokalizację, następnie pokazuje się lista 10 wyników najbardziej zbliżonych do jego zapytania. Użytkownik wybiera jedną z nich, a następnie
  naciska przycisk "Znajdź restuaracje", by wyświetlić listę restauracji znajdujących się w pobliżu wybranej lokalizacji.
- Po wyborze

- **Zalogowany użytkownik**

- **Administrator**

## API wykorzystane w projekcie

Dokumentacja API utworzona przy użyciu platformy FastAPI po uruchomieniu projektu backendu dostępna jest pod adresem http://localhost:5000/docs

![alt text](doc/apicz1.png)
![alt text](doc/apicz2.png)
![alt text](doc/apicz3.png)
![alt text](doc/apicz4.png)

## Technologie

- frontend: React.js 18.2.0,
- menedżer pakietów npm w wersji 9.3.1,
- backend: Python 3.11, Flask 2.2.2, FastAPI 0.89.1, SQLAlchemy 2.0.0
  (lista wszystkich użytych pakietów Pythona dostępna w pliku requirements.txt w folderze backend)
- baza danych: PostgreSQL 11,
- konteneryzacja projektu: Docker 20.10.21 wraz z Docker Desktop 4.15.0
- testowanie API: SwaggerUI/Postman 10.9.0,
- środowisko do tworzenia projektu: Visual Studio Code 1.74.3,
- system kontroli wersji Git,
- przeglądarka internetowa Microsoft Edge w wersji 109.0.1518.70 lub Mozilla Firefox w wersji 109.0.

## Licencja

Licensed under the [MIT License](LICENSE)
