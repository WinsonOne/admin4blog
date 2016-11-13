var fs = require('fs');

fs.unlink('../public/images/user5-128x128.jpg', function (err) {
  if(err){
    console.error(err);
  }else{
    console.info('success');
  }
})