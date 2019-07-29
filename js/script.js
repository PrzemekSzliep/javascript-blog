'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.post.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* [DONE]  get 'href' attribute from the clicked link */

    const link = clickedElement.getAttribute('href');
    console.log(link);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const article = document.querySelector(link);

    /* [DONE\ add class 'active' to the correct article */

    article.classList.add('active')
}


const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

function generateTitleLinks() {

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';

    for (let article of articles) {

        /* get the article id */

        const articleId = article.getAttribute('id');

        /* find and get the title element */

        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

        /* create HTML of the link */

        const linkHTML = '<li><a href="#'+ articleId +'"><span>' + articleTitle + '</span></a></li>';
        console.log(linkHTML);

        /* insert link into titleList */

        html = html + linkHTML;

    }

    titleList.insertAdjacentHTML('beforeend', html);

}

generateTitleLinks();


const links = document.querySelectorAll('.titles a');
console.log(links)

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}