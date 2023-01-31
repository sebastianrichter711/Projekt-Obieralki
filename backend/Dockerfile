FROM python:3.11
WORKDIR /code
COPY requirements.txt .

# uzycie menadzera pakietow dla python'a 
# do instalacji potrzebnych pakietow 
RUN pip install -r requirements.txt

# skopiowanie folderu src do folderu 
# bazowego kontenera (ustawionego za pomoca WORKDIR)
COPY . .

# uruchomienie aplikacji app.py w jezyku python 
# po uruchomieniu kontenera
CMD [ "python", "app.py" ]