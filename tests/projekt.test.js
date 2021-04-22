/*jshint esversion: 8 */

import {
  jest
} from '@jest/globals';
import * as my from './../projekt.js';
import fs from 'fs';

let data = ([{
  "location": "Warszawa",
  "temperature": 18.5,
  "humidity": 35,
  "pressure": 1000
}, {
  "location": "Lublin",
  "temperature": 13.5,
  "humidity": 67,
  "pressure": 998
}]);




describe('Sample test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true);
  });
});

describe('API requests', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('Test GET request', () => {
    let result = JSON.stringify([{
      "location": "Warszawa",
      "temperature": 18.5,
      "humidity": 35,
      "pressure": 1000
    }, {
      "location": "Lublin",
      "temperature": 13.5,
      "humidity": 67,
      "pressure": 998
    }]);
    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(data));
    expect(my.funGet()).toEqual(JSON.parse(result));
  });
  it('Test POST request', () => {
    let body = {
      "location": "Gdańsk",
      "temperature": 16.5,
      "humidity": 85,
      "pressure": 999
    };
    let result = JSON.stringify([{
      "location": "Warszawa",
      "temperature": 18.5,
      "humidity": 35,
      "pressure": 1000
    }, {
      "location": "Lublin",
      "temperature": 13.5,
      "humidity": 67,
      "pressure": 998
    }, {
      "location": "Gdańsk",
      "temperature": 16.5,
      "humidity": 85,
      "pressure": 999
    }]);
    let callback;
    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(data));
    jest.spyOn(fs, 'writeFile').mockImplementation((path, data, cb) => {
      callback = cb;
    });
    let logSpy = jest.spyOn(console, 'log');
    my.funPost(body);
    expect(fs.writeFile).toBeCalledWith(
      'weather.json',
      result,
      callback
    );
    expect(logSpy).toBeCalledWith('Added new entry');
  });
  it('Test DELETE request', () => {
    let body = {
      "location": "Lublin"
    };
    let result = JSON.stringify([{
      "location": "Warszawa",
      "temperature": 18.5,
      "humidity": 35,
      "pressure": 1000
    }]);
    let file = jest.spyOn(fs, 'writeFile').mockResolvedValue(result);
    let callback;
    let spy = jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(data));
    jest.spyOn(fs, 'writeFile').mockImplementation((path, data, cb) => {
      callback = cb;
    });
    let logSpy = jest.spyOn(console, 'log');
    my.funDelete(body);
    expect(fs.writeFile).toBeCalledWith(
      'weather.json',
      result,
      callback
    );
    expect(logSpy).toBeCalledWith('Deleted entry');
  });
});
