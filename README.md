# twojejedzenie.pl - Aplikacja do zamawiania dań przez Internet

Projekt z przedmiotów: Pratyka Programowania Python, Projektowanie Aplikacji Internetowych, Organizacja i Rozwój Projektów Open Source

Autor: Sebastian **RICHTER**

Politechnika Śląska.

Wydział Automatyki, Elektroniki i Informatyki.

kierunek: Informatyka SSM, semestr 2.

specjalność: Oprogramowanie systemowe.

## Instrukcja uruchomienia aplikacji

- a) wyświetlenie mapy z OpenStreetMap

Aby poprawnie wyświetliła się mapa na stronie głównej należy wykonać następujące kroki:

1. Założyć konto w serwisie https://www.maptiler.com/
2. Po rejestracji przejść na stronę https://cloud.maptiler.com/maps/. Tam należy przejść do zakładki API Keys
   i skopiować wygenerowany klucz (przy nim będzie opis(description) "Default key").
3. W lokalizacji ordereatfront/src/components/maps należy utworzyć plik mapkey.js i w nim umieścić następujący kod źródłowy.

```js
const MAP_KEY = <YOUR_API_KEY>;

export default MAP_KEY;
```

- b) uruchomienie aplikacji

1. Zainstalować Dockera wraz z narzędziem Docker Desktop.
2. Przejść do folderu backend, otworzyć wiersz poleceń i wpisać komendę docker-compose up, aby uruchomić backend.
3. Przejść do folderu ordereatfront, otworzyć wiersz poleceń i wpisać komendę docker-compose up, aby uruchomić frontend. W razie problemów, wpisać w wierszu poleceń
   komendę npm install.
4. Gdy uruchomi się frontend i backend, otworzyć przeglądarkę internetową i wpisać w niej adres https://localhost:3000.

## Zasada działania aplikacji dla poszczególnych użytkowników

- **Niezalogowany użytkownik**

1. Może wyszukiwać restauracje znajdujące się w lub w pobliżu podanej przez niego lokalizacji. Na stronie głównej użytkownik
   podaje w wyszukiwarce lokalizację, następnie pokazuje się lista 10 wyników najbardziej zbliżonych do jego zapytania. Użytkownik wybiera jedną z nich, a następnie
   naciska przycisk "Znajdź restauracje", by wyświetlić listę restauracji znajdujących się w pobliżu wybranej lokalizacji.
2. Użytkownik z uzyskanej listy wybiera jedną z restauracji i przechodzi do widoku z najważniejszymi informacjami dot. lokalu (lokalizacja, koszt dostawy,
   czas oczekiwania na dostawę, minimalna kwota zamówienia za dania w celu złożenia zamówienia z wybranej restauracji) oraz listą dań przez nią
   oferowanych. Można przejść do szczegółów danej potrawy (takie jak: nazwa, cena, kategoria, opis), klikając na jego nazwę, albo dodać ją do koszyka poprzez
   przycisk "Dodaj do koszyka". W koszyku można zmieniać ilość zamawianych dań do momentu przejścia do podsumowania zamówienia. Aby przejść do złożenia zamówienia, należy posiadać konto w serwisie, być zalogowanym oraz mieć niepusty koszyk dań.
3. Na stronie z listą dań dla danej restauracji można wyszukiwać dania po podanej nazwie.
4. Niezalogowany użytkownik może sprawdzić zawartość koszyka także na specjalnie dedykowanej stronie.
5. Może założyć konto w serwisie, pamiętając jednocześnie o tym, by jego adres e-mail składniowo przypominał adres mailowy (w tym składał się ze znaku @) oraz by jego hasło miało min. 8 znaków i zawierało co najmniej 1 małą i dużą literę, 1 cyfrę oraz 1 znak specjalny.
6. Może zalogować się do portalu oraz zmienić hasło (zmiana hasła możliwa także, gdy jest się zalogowanym).

- **Zalogowany użytkownik**

1. Może zamawiać dania. W ramach zamówienia należy zamawiać dania z konkretnej restauracji. Jeśli użytkownik zakończył kompletowanie koszyka, to może przejść
   do widoku podsumowania zamówienia, w którym podaje adres dostawy oraz formę płatności (karta płatnicza, BLIK, voucher).

   a) jeżeli zamówienie zostanie złożone poprawnie, to zostanie wyświetlony komunikat o poprawnym złożeniu zamówienia. Jeśli nie, to pojawi się informacja o niepoprawnym
   złożeniu zamówienia.

   b) jeżeli sumaryczna kwota za dania jest większa lub równa minimalnej kwocie zamówienia dla danej restauracji (z wyłączeniem kosztów dostawy), jaką musimy zapłacić, aby otrzymać bezpłatny transport dań, to użytkownik nie będzie musiał płacić za dostawę - w przeciwnym razie za dostawę zapłaci tyle, ile życzy sobie restauracja.

2. Zalogowany użytkownik ma dostęp do panelu użytkownika (przejście poprzez ikonkę ludzika w headerze strony), w którym może sprawdzić swoje dane osobowe, edytować je, usunąć konto, zmienić hasło lub przejść do strony z widokiem listy zrealizowanych oraz niezrealizowanych zamówień przez niego złożonych.
3. Możliwość wylogowania się z portalu.
4. Możliwość korzystania z opcji dostępnych dla niezalogowanego użytkownika za wyjątkiem rejestracji i logowania.

- **Administrator**

1. Po zalogowaniu się w serwisie jako administrator, w nagłówku strony pojawi się dodatowy przycisk "Panel admina". Po jego kliknięciu pojawi się panel administracyjny,
   w którym może on zarządzać użytkownikami, restauracjami, daniami oraz zamówieniami (dodawanie (za wyjątkiem zamówień), edytowanie, wyświetlanie oraz usuwanie). W sytuacji,
   gdy pojawi się np. błąd w zamówieniu, możliwe jest wprowadzenie korekty.
2. Możliwość korzystania z wszystkich funkcjonalności systemu.

## API wykorzystane w projekcie

Dokumentacja API utworzona przy użyciu platformy FastAPI wraz z opisem niezbędnych parametrów oraz zwracanych kodów HTTP po uruchomieniu projektu backendu dostępna jest
pod adresem http://localhost:5000/docs

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
- środowisko do implementacji projektu: Visual Studio Code 1.74.3,
- system kontroli wersji Git,
- przeglądarka internetowa Microsoft Edge w wersji 109.0.1518.70 lub Mozilla Firefox w wersji 109.0.

## Licencja

Licensed under the [MIT License](LICENSE)
