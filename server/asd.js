const dictA = { male: 10, female: 20, unassigned: 30 };
const dictB = { male: 11, female: 21, unassigned: 31 };
const dictC = { male: 12, female: 22, unassigned: 32 };
    
const obj = {};

Object.keys(dictA).forEach(key => {
   obj[key] = [dictA,dictB,dictC].map(dict => dict[key]);
});

console.log(obj);