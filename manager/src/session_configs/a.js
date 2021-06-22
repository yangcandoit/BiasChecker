var fs = require('fs');
var filePath = "D:\\BiasChecker\\manager\\src\\session_configs\\reddit\\reddit-carry.json";
var filestr = JSON.parse(fs.readFileSync(filePath))


// var array = fs.readFileSync('1.txt').toString().split("\n");
// for (var i in array) {
//     array[i] = array[i].replace(/\r/g, "").replace('\"', '').replace('\"', '').replace(',', '').trim();
// }




for (i = 1; i <= 40; i++) {
    var newfilepath = "D:\\BiasChecker\\manager\\src\\session_configs\\reddit\\reddit-carry" + i + '.json';
    var newfilestr = JSON.parse(JSON.stringify(filestr));
    // newfilestr.interval=i*1000*60
    for (var j in newfilestr.agents) {
        console.log(j)
        newfilestr.agents[j].queries = array.slice(i * 5 - 5, i * 5)
    }

    fs.writeFileSync(newfilepath, JSON.stringify(newfilestr))
}

// var array = fs.readFileSync('1.txt').toString().split("\n");
// for(var i in array) {
//     console.log(array[i]);
// }
// console.log(array[1])