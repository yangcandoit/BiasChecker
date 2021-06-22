const googleTrends = require('google-trends-api');
const fs = require('fs');


googleTrends.interestOverTime({keyword: 'Women\'s march'})
.then(function(results){
//   console.log('These results are awesome', results);
  fs.writeFileSync(__dirname + `\\a.json`, results);
})
.catch(function(err){
  console.error('Oh no there was an error', err);
});

