const express = require('express');
const getPagePrincipalNotices = require('./utils/getPagePrincipalNotices');
const gerOtherNotices = require('./utils/getOtherNotices');
const getNotice = require('./utils/getNotice');
const write = require('./utils/writeOnFile');
const router = express.Router();

router.get('/' , async (req , res) => {
  let principal_notices = await getPagePrincipalNotices(1);
  let notices = await gerOtherNotices(1);
  res.render('index.pug' , { principal_notices : principal_notices , notices : notices});
});

router.get('/:num' , async (req , res) => {
  let principal_notices = await getPagePrincipalNotices(req.params.num);
  let notices = await gerOtherNotices(req.params.num);
  res.render('index.pug' , { principal_notices : principal_notices , notices : notices});
})

router.get('/noticia/:noticia' , async (req , res) => {
  let notice = await getNotice(req.params.noticia);
  //await write(notice.body);
  res.render('notices/notices.pug' , { notice : notice });
});


module.exports = router;