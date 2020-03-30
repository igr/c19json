const axios = require('axios');
const csv2json = require('csvjson-csv2json');
const requestBody = require('./requestBody');

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

String.prototype.replaceAll = function(search, replacement) {
  const target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

// Resulting JSON
const regions = {};
const map = {
  date: (new Date()).toISOString().slice(0, 10),
  serbia: [],
  regions
};

/**
 * Converts array of records to a Map<Region,Value>.
 */
function makeMap(report) {
  const map = {};
  for (const entry in report) {
    if (!report.hasOwnProperty(entry)) continue;
    const region = report[entry]['Територија'];
    map[region] = report[entry]['Вредност'];
  }
  return map;
}

/**
 * Collects day data and append to final result.
 */
function collectData(date, confirmedJson, isolationJson, dailyJson) {
  console.log(`${date}`);

  const confirmedMap = makeMap(confirmedJson);
  const isolationMap = makeMap(isolationJson);
  const dailyMap     = makeMap(dailyJson);

  let totalConfirmed = 0;
  let totalIsolation = 0;
  let totalDaily     = 0;

  for (const entry in confirmedJson) {
    if (!confirmedJson.hasOwnProperty(entry)) continue;
    const region = confirmedJson[entry]['Територија'];

    const confirmedValue = confirmedMap[region] || -1;
    const isolationValue = isolationMap[region] || -1;
    const dailyValue     = dailyMap[region]     || -1;

    if (!regions[region]) {
      regions[region] = [];
    }

    regions[region].push({
      date,
      confirmed: confirmedValue,
      isolation: isolationValue,
      daily:     dailyValue,
    });

    totalConfirmed += confirmedValue !== -1 ? confirmedValue : 0;
    totalIsolation += isolationValue !== -1 ? isolationValue : 0;
    totalDaily     += dailyValue     !== -1 ? dailyValue     : 0;
  }

  map.serbia.push({
    date,
    confirmed: totalConfirmed,
    isolation: totalIsolation,
    daily:     totalDaily,
  })
}

/**
 * Fetch daily report.
 */
async function requestCovidInfoForDay(requestDate, reportType) {
  return axios({
    method: "POST",
    url: "https://covid19.data.gov.rs/api/datasets/statistic/download_CSV",
    headers: {
      "Accept": "*/*",
      "Origin": "https://covid19.data.gov.rs",
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json;charset=UTF-8"
    },
    data: requestBody(requestDate, reportType)
  }).then(res => {
    const data = res.data;

    const offset = data.indexOf('\nРанк');
    let csvResponse = data.slice(offset + 1);
    return csv2json(csvResponse, {parseNumbers: true});
  })
  .catch(err => {
    console.log(`${requestDate}: ${err}, report #${reportType}`);
  });
}

async function fetchAll() {
  const firstDate = new Date('2020-03-06');
  let today = new Date();

  for (let currentDate = firstDate; currentDate <= today; currentDate = currentDate.addDays(1)) {
    const date = currentDate.toISOString().slice(0, 10);

    const dailyJson = await requestCovidInfoForDay(date, 1);
    const confirmedJson = await requestCovidInfoForDay(date, 2);
    const isolationJson = await requestCovidInfoForDay(date, 3);

    collectData(date, confirmedJson, isolationJson, dailyJson);
  }

  return JSON.stringify(map);
}

module.exports = fetchAll;
