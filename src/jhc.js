const axios = require('axios');
const csv2json = require('csvjson-csv2json');

function log(msg) {
  console.log(`JHC ${msg}`);
}

function dateToRsFormat(date) {
  const d = date.getDate();
  const m = date.getMonth() + 1; //Month from 0 to 11
  const y = date.getFullYear();
  return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

function dateToJhcFormat(date) {
  const d = date.getDate();
  const m = date.getMonth() + 1; //Month from 0 to 11
  const y = date.getFullYear();
  return '' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) + '-' + y;
}

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function extractSerbia() {
  return d => d['Country/Region'] === 'Serbia' || d['Country_Region'] === 'Serbia';
}

const jhc = {
  date: (new Date()).toISOString().slice(0, 10),
  serbia: []
};


function collectDataFromJHC(response, requestDate) {
  if (!response) {
    return;
  }
  log(requestDate);

  jhc['serbia'].push({
    date: requestDate,
    confirmed: response['Confirmed'],
    deaths: response['Deaths'],
    recovered: response['Recovered'],
  })
}

async function requestJHCCovidInfo(requestDate) {
  return axios({
    method: "GET",
    url: `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${requestDate}.csv`
  }).then(res => {
    let data = res.data;
    let jsonResponse = csv2json(data, {parseNumbers: true});
    return jsonResponse.filter(extractSerbia())[0];
  })
  .catch(err => {
    log(`${requestDate}: ${err}`);
  });
}

async function fetchAllJhc() {
  const firstDate = new Date('2020-03-06');
  let today = new Date();

  for (let currentDate = firstDate; currentDate <= today; currentDate = currentDate.addDays(1)) {
    const dateRs = dateToRsFormat(currentDate);
    const dateJhc = dateToJhcFormat(currentDate);

    const dailyJhcJson = await requestJHCCovidInfo(dateJhc);
    collectDataFromJHC(dailyJhcJson, dateRs);
  }

  return JSON.stringify(jhc);
}

module.exports = fetchAllJhc;
