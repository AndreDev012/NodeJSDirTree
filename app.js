const fs = require('fs');
const path = require('path');
const dir = './diretorios';

filewalker(dir, function(err, results){
    if(err){
        throw err;
    }
    
    console.log(results);
});

function filewalker(dir, done) {
    var results = [];
    var countFiles = 0;

    fs.readdir(dir, function(err, list) {
        if (err) return done(err);

        var filesExists = list.length;

        if (!filesExists) return done(null, results);

        list.forEach(function(file){
            file = path.resolve(dir, file);

            fs.stat(file, function(err, stat){
                if (stat && stat.isDirectory()) {
					filewalker(file, function(err, res, count){
                        results.push("Diretório " + path.normalize(file).split(path.sep).pop() + ": " + count + " arquivos");

                        results = results.concat(res);
                        countFiles += count;

                        if (!--filesExists) done(null, results, countFiles); 
                    });
                } else {
                    countFiles++;

                    if (!--filesExists) done(null, results, countFiles);
                }
            });
        });
    });
};