
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
