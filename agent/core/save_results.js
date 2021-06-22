const fs = require('fs');
const slugify = require('slugify');

const save_results = (agent, session_id, term, results,interval)=>{
    const json = JSON.stringify(results);
    let datetime = slugify((new Date()).toISOString()).replace(/[\:\.]/g,'-');
    let slug = slugify(term).replace(/\:/g, '_');
    // term=term.slice(8)
    fs.writeFileSync(__dirname + `\\..\\result\\${agent.platform}_${session_id}__${interval/1000}s__${term}__${agent.id}__${datetime}.json`, json);
    // console.log(__dirname + `\\..\\co_result\\${agent.platform}_${session_id}__${interval/1000}s__${slug}__${agent.id}__${datetime}.json`);

}

module.exports = save_results;