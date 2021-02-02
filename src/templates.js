export default class PatternReader {
  patternFromFile(path) {
    const fs = require("fs");
    console.log(fs)
    let res = []
    fs.readFile("../data/zweiback.lfe", function(err, text){
      var textByLine = text.split("\n")
      for(var i=1; i<textByLine.length; i++){
         res.push(textByLine[i].split(' '))
      }
    });
    return res;
  }
}
