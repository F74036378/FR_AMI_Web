const fs = require('fs')
const savePixels = require("save-pixels")


fs.readFile('pp.txt',(err,data) => {
  // => [Error: EISDIR: illegal operation on a directory, open <directory>]
  savePixels(data, "png").pipe(process.stdout)
})