const fs = require('fs');
var csv = require('csv-parser')
const snowData = JSON.parse(fs.readFileSync("./data.json").toString());
const allData = [];
fs.createReadStream('./weather.csv')
    .pipe(csv())
    .on('data', function (data) {
        for (snowday of snowData) {
            if (snowday.time.includes(data['Date/Time'])) {
                data["snowday"] = true;
                console.log('snow!');
                allData.push(data);
                return;
            }
        }
        data["snowday"] = false;
        allData.push(data);
    }).on('end', function () {
        console.log(allData);
        fs.writeFile("./compiled.json", JSON.stringify(allData, null, 2), function (err) {
            if (err) {
                console.log(err);
            }
        });
    });
