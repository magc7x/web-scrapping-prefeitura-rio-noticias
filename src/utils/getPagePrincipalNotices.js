const puppeteer = require('puppeteer');

module.exports = async (indx) => {
  let page_url = '';
  if (indx == 1) {
    page_url = 'http://riocontraocorona.rio/noticias/';
  } else {
    page_url = 'http://riocontraocorona.rio/noticias/'+ indx + '/';
  }

  let browser = await puppeteer.launch();
  let page = await browser.newPage();

  await page.goto(page_url , { waitUntil: 'networkidle2' } );

  let noticiasPrincipaisOR = await page.evaluate( () => {
    let noticiasPrincipais = [];
    let titulo_noticias_principais = [];
    let link_img_principais = [];
    let linkMateria = [];

    document.querySelectorAll('div[class="jet-smart-tiles__box-title"]').forEach(el => {    
      titulo_noticias_principais.push(el.innerHTML);
    });

    document.querySelectorAll('div[class="jet-smart-tiles__box"]').forEach(el => {
      link_img_principais.push(el.style.backgroundImage.slice(4, -1).replace(/["']/g, ""));
    });

    document.querySelectorAll('a[class="jet-smart-tiles__box-link"]').forEach(el => {
      
      linkMateria.push(el.getAttribute("href"));
    });

    for(var x =0;x<titulo_noticias_principais.length;x++) {
      let objTemp = {
        img_src: link_img_principais[x],
        title: titulo_noticias_principais[x],
        link_materia: linkMateria[x]
      }
      noticiasPrincipais.push(objTemp);
    }

    return noticiasPrincipais;
  });

  await browser.close();

  return noticiasPrincipaisOR;
}