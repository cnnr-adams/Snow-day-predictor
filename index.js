const fs = require('fs');
const data = JSON.parse(fs.readFileSync("./tweets.json").toString());
const discardTerms = ["not cancelled", "running", "information", "in service"];
const includesTerms = ["buses & vans", "cancelled", "inclement"];
const newData = [];
data.forEach(thing => {
    const stringed = JSON.stringify(thing).toLowerCase();
    for (term of discardTerms) {
        if (stringed.includes(term)) {
            return;
        }
    }
    for (term of includesTerms) {
        if (stringed.includes(term)) {
            newData.push({ time: thing.timestamp, text: thing.text });
            return;
        }
    }
});
console.log(newData.length);
fs.writeFile("./data.json", JSON.stringify(newData, null, 2), function (err) {
    if (err) {
        console.log(err);
    }
});
//data.forEach(piece => console.log(piece.timestamp));