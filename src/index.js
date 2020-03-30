const fs = require('fs');

const fetchAllRs = require('./rs');
const fetchAllJhc = require('./jhc');

Promise.all([
    fetchAllRs().then((json) => {
      console.log("Done RS");
      fs.writeFileSync('covid19-rs.json', json);

      // json = json.replaceAll('"date"', '"t"');
      // json = json.replaceAll('"isolation"', '"i"')
      // json = json.replaceAll('"confirmed"', '"c"')
      // json = json.replaceAll('"daily"', '"d"');
      //
      // fs.writeFileSync('covid19-rs-slim.json', json);
    })
  ,
  fetchAllJhc().then((json) => {
    console.log("Done JHC");
    fs.writeFileSync('covid19-jhc.json', json);
  })
]).then(() => {
  console.log('Done all.');
});
