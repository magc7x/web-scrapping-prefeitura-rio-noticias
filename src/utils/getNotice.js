const puppeteer = require('puppeteer');

module.exports = async (link) => {
  let page_url = 'http://riocontraocorona.rio/noticias/'+link+'/';

  let browser = await puppeteer.launch();
  let page = await browser.newPage();

  await page.goto(page_url , { waitUntil: 'networkidle2' } );

  let body = await page.evaluate( () => {
    let img_materia_src = [];
    let title_materia = '';
    let body_materia = [];
    let data_materia = '';
    let horario_materia = '';
    var n = 0;

    title_materia = document.querySelector('h1[class="elementor-heading-title elementor-size-default"]').innerHTML;
    data_materia = document.querySelector('span[class="elementor-icon-list-text elementor-post-info__item elementor-post-info__item--type-date"]').innerHTML;
    horario_materia = document.querySelector('span[class="elementor-icon-list-text elementor-post-info__item elementor-post-info__item--type-time"]').innerHTML;
    document.querySelectorAll('img[class="attachment-full size-full"]').forEach(el => {
      img_materia_src.push(el.getAttribute("src"));
    });;
    document.querySelectorAll('div[class="elementor-widget-container"]').forEach(el => {
      if (n = 8) {
        body_materia.push(el.textContent);
      } else {
        body_materia.push(el.innerHTML);
      }
      n++;
    });

    let obj = {
      img_src: img_materia_src[1],
      title: title_materia,
      body: body_materia[8],
      data: data_materia.substr(-15),
      horario: horario_materia
    }

    return obj;
  });

  await browser.close();

  return body;

}