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

1. Może wyszukiwać restauracje znajdujące się w lub w pobliżu podanej przez niego lokalizacji. Na stronie głównej użytkownik
   podaje lokalizację, następnie pokazuje się lista 10 wyników najbardziej zbliżonych do jego zapytania. Użytkownik wybiera jedną z nich, a następnie
   naciska przycisk "Znajdź restuaracje", by wyświetlić listę restauracji znajdujących się w pobliżu wybranej lokalizacji.
2. Użytkownik z uzyskanej listy wybiera jedną z restauracji i przechodzi do widoku z najważniejszymi informacjami dot. restauracji oraz listą dań przez nią
   oferowanych. Można przejść do szczegółów danej potrawy, klikając na jego nazwę, albo dodać ją do koszyka. W koszyku można zmieniać ilość zamawianych dań.
3. Na stronie z listą dań dla danej restauracji można wyszukiwać dania po podanej nazwie.
4. Niezalogowany użytkownik może sprawdzić koszyk na specjalnie dedykowanej stronie.
5. Może założyć konto w serwisie, pamiętając jednocześnie o tym, by jego adres e-mail składał się z @ oraz by jego hasło miało min. 8 znaków i zawierało co najmniej
   1 małą i dużą literę, 1 cyfrę oraz 1 znak specjalny.
6. Może zalogować się do portalu oraz zmienić hasło (możliwe także, gdy gdy jest się zalogowanym).

- **Zalogowany użytkownik**

1. Może zamawiać dania. W ramach zamówienia można zamawiać dania z konkretnej restauracji. Jeśli użytkownik zakończył kompletowanie koszyka, to może przejść
   do widoku podsumowania zamówienia, w którym podaje adres dostawy oraz formę płatności (karta płatnicza, BLIK, voucher).
   a) jeżeli zamówienie zostanie złożone poprawnie, to zostanie wyświetlony komunikat o poprawnym złożeniu zamówienia. Jeśli nie, to pojawi się informacja o niepoprawnym
   złożeniu zamówienia.
   b) jeżeli kwota za zamówienia jest większa lub równa minimalnej kwocie zamówienia dla danej restauracji (z wyłączeniem kosztów dostawy), jaką musimy zapłacić, aby otrzymać bezpłatny transport dań, to użytkownik nie będzie musiał płacić za dostawę - w przeciwnym razie za dostawę zapłaci tyle, ile życzy sobie restauracja.
2. Zalogowany użytkownik ma dostęp do panelu użytkownika, w którym może sprawdzić swoje dane osobowe, edytować je, usunąć konto, zmienić hasło lub przejść do strony
   z widokiem listy zrealizowanych oraz niezrealizowanych zamówień przez niego złożonych.
3. Możliwość wylogowania się z portalu.

- **Administrator**

1. Po zalogowaniu się w serwisie jako administrator, w nagłówku

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
