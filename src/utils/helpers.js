const fs = require("fs");

function rewriteFile(newData, path) {
  fs.writeFileSync(path, JSON.stringify(newData), {
    encoding: "utf-8",
  });
}

module.exports = {
  rewriteFile,
};
