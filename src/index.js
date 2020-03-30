const fs = require('fs');

const fetchAll = require('./rs');

fetchAll().then((json) => {
  console.log("Done");
  fs.writeFileSync('covid19-rs.json', json);

  // json = json.replaceAll('"date"', '"t"');
  // json = json.replaceAll('"isolation"', '"i"')
  // json = json.replaceAll('"confirmed"', '"c"')
  // json = json.replaceAll('"daily"', '"d"');
  //
  // fs.writeFileSync('covid19-rs-slim.json', json);
});
