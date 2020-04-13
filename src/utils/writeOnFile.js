const fs = require('fs');

module.exports = (body) => {
  let file_path = './src/views/notices/toInclude.pug';

  fs.writeFile(file_path, body, (err) => {
    if (err) {
      console.log(err);
    }

  });

}