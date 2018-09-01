const fs = require('fs');
var csv = require('csv-parser')
const snowData = JSON.parse(fs.readFileSync("./data.json").toString());
const allData = [];
let i = 0;
fs.createReadStream('./weather.csv')
    .pipe(csv())
    .on('data', function (data) {
        if (i != 0 && i != 6) {
            for (snowday of snowData) {
                if (snowday.time.includes(data['Date/Time'])) {
                    data["snowday"] = true;
                    console.log('snow!');
                    allData.push(data);
                    if (i == 6)
                        i = -1;
                    i++;
                    return;
                }
            }
            data["snowday"] = false;
            allData.push(data);
        } else if (i == 6) {
            i = -1;
        }
        i++;
    }).on('end', function () {
        console.log(allData);
        fs.writeFile("./compiled.json", JSON.stringify(allData, null, 2), function (err) {
            if (err) {
                console.log(err);
            }
        });
    });
