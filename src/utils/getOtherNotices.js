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

  let noticiasOR = await page.evaluate( () => {
    let noticias = [];
    let titulo_noticias = [];
    let link_img_noticias = [];
    let noticias_desc = [];
    let linkMateria = [];
    let datas = [];

    document.querySelectorAll('h2[class="elementor-heading-title elementor-size-default"]').forEach(el => {
      titulo_noticias.push(el.children[0].innerHTML);
      linkMateria.push(el.children[0].getAttribute("href"));
    });

    document.querySelectorAll('div[class="elementor-text-editor elementor-clearfix"]').forEach(el => {
      noticias_desc.push(el.innerHTML);
    });
    
    document.querySelectorAll('img[class="attachment-medium_large size-medium_large"]').forEach(el => {
      link_img_noticias.push(el.getAttribute("src"));
    });

    document.querySelectorAll('span[class="elementor-icon-list-text elementor-post-info__item elementor-post-info__item--type-date"]').forEach( el => {
      datas.push(el.innerHTML);
    });

    for (var x=0;x<titulo_noticias.length;x++) {
      let objTemp = {
        titulo_noticia: titulo_noticias[x],
        desc: noticias_desc[x],
        link_img: link_img_noticias[x],
        linkMateria: linkMateria[x],
        data_post: datas[x]
      }
      noticias.push(objTemp);
    }


    return noticias;
  });

  await browser.close();

  return noticiasOR;
}