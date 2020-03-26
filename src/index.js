const fs = require('fs');
const axios = require('axios');
const csv2json = require('csvjson-csv2json');
const requestBody = require('./requestBody');

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const regions = {};
const map = {
  date: (new Date()).toISOString().slice(0, 10),
  serbia: [],
  regions
};

function collectData(response, date) {
  console.log(date);

  let totalConfirmed = 0;
  for (const entry in response) {
    if (!response.hasOwnProperty(entry)) continue;
    const region = response[entry]['Територија'];
    const value = response[entry]['Вредност'];

    if (!regions[region]) {
      regions[region] = [];
    }

    regions[region].push({
      date,
      confirmed: value,
    });

    totalConfirmed += value;
  }

  map.serbia.push({
    date,
    confirmed: totalConfirmed,
  })
}

async function requestCovidInfoForDay(requestDate) {
  return axios({
    method: "POST",
    url: "https://covid19.data.gov.rs/api/datasets/statistic/download_CSV",
    headers: {
      "Accept": "*/*",
      "Origin": "https://covid19.data.gov.rs",
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json;charset=UTF-8"
    },
    data: requestBody(requestDate)
  }).then(res => {
    let data = res.data;

    let csvResponse = data.slice(68);
    let jsonResponse = csv2json(csvResponse, {parseNumbers: true});
    collectData(jsonResponse, requestDate);
  })
  .catch(err => {
    console.log(`Error for ${requestDate}: ${err}`);
  });
}

async function fetchAll() {
  const firstDate = new Date('2020-03-06');
  let today = new Date();

  for (let currentDate = firstDate; currentDate <= today; currentDate = currentDate.addDays(1)) {
    const currentDateString = currentDate.toISOString().slice(0, 10);
    await requestCovidInfoForDay(currentDateString)
  }
}

fetchAll().then(() => {
  console.log("Done");
  fs.writeFileSync('covid19-rs.json', JSON.stringify(map));
});

