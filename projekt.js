/*jshint esversion: 8 */

import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('GET');

  res.type('json');
  res.send(funGet());
});

app.post('/', (req, res) => {
  console.log('POST');

  res.send(funPost(req.body));
});

app.delete('/', (req, res) => {
  console.log('DELETE');

  res.send(funDelete(req.body));
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));


  function funGet() {
    let data = fs.readFileSync('weather.json');
    return JSON.parse(data);
  }

  function funPost(body) {
    let exists = false;
    let num = 0;
    let json_body = JSON.stringify(body);
    let json_file = fs.readFileSync('weather.json', 'utf8');
    let file = JSON.parse(json_file);
    for (let i in file) {
      if (file[i].location == body.location) {
        exists = true;
        num = i;
        break;
      }
    }
    if (exists) {
      file[num] = body;
    } else {
      file.push(body);
    }
    json_file = JSON.stringify(file);
    fs.writeFile('weather.json', json_file, function(err) {
    if (err) throw err;
    });
    console.log('Added new entry');
    return `New entry has been added successfully`;
  }

  function funDelete(body) {
    let json_file = fs.readFileSync('weather.json', 'utf8');
    let file = JSON.parse(json_file);
    for (let i in file) {
      if (file[i].location == body.location) {
        file.splice(i, 1);
        break;
      }
    }
    json_file = JSON.stringify(file);
    fs.writeFile('weather.json', json_file, function(err) {
    if (err) throw err;
    });
    console.log('Deleted entry');
    return `Entry has been deleted successfully`;
  }


export {funGet, funPost, funDelete};


/*
Pracujesz w przedsiębiorstwie analizującym zjawiska meteorologiczne. Otrzymujesz zadanie przygotowania prostego mechanizmu zapisywania danych na temat aktualnej pogody. Informacje na temat aktualnej pogody są dostarczane o nieregularnych porach, jednak zawsze w tym samym formacie. Pojedyncze żądanie dodania pogody składa się z następujących informacji:

location: lokalizację
temperature: temperaturę w st. C
humidity: wilgotność powietrza w %
pressure: ciśnienie w hPa

np.

location: Warszawa
temperature: 18,5
humidity: 35
pressure: 1000

    Wykorzystując środowisko Node.js, API fs i framework express przygotuj prosty web server, który będzie posiadał ścieżkę / z trzema metodami:
        GET - zwracającą listę aktualnie zapisanych informacji o pogodzie w formacie JSON,
        POST - doda lub zaktualizuje (jeżeli dla zadanej miejscowości już występuje informacja o pogodzie) informację o pogodzie w pliku. Wymagaj przekazania kompletu informacji podanego powyżej w sekcji body żądania. Jeżeli któraś z informacji nie zostanie przekazana lub będzie niepoprawna zwróć status błędu HTTP.
        DELETE - usunie informację o pogodzie dla zadanej miejscowości jeżeli znajduje się ona w pliku,
    Kolejne informacje o prognozach przechowuj w pliku JSON. Wykorzystaj moduł fs aby zapisywać i odczytywać z niego dane. Przy odczycie parsuj dane z pliku. Przy zapisie encoduj np. przy pomocy JSON.stringify().
    Przygotuj testy, które będą sprawdzały poprawność wykonywania poszczególnych części programu. Sprawdzaj między innymi czy po wykonaniu funkcji zapisującej nową pogodę została ona faktycznie zapisana w pliku lub czy po ponownym zapisie tej samej lokalizacji z innymi danymi zostały one zaktualizowane w pliku.
    Prześlij cały projekt bez katalogu /node_modules/ jednak z package.json i package-lock.json lub yarn.lock aby można było odtworzyć wykorzystane przez ciebie zależności i biblioteki.

Materiały do zadania:

    dokumentacja Node File System: https://nodejs.org/api/fs.html
    dokumentacja Express: https://expressjs.com/
 */
