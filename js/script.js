'use strict';

const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),

};

function titleClickHandler(event) {
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

    article.classList.add('active');
}


const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.authors.list';

function generateTitleLinks(customSelector = '') {

    console.log(customSelector);
    console.log(optArticleSelector + customSelector);

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';

    for (let article of articles) {

        /* get the article id */

        const articleId = article.getAttribute('id');

        /* find and get the title element */

        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

        /* create HTML of the link */

        const linkHTMLData = {id: articleId, title: articleTitle};
        const linkHTML = templates.articleLink(linkHTMLData);
        console.log(linkHTML);

        /* insert link into titleList */

        html = html + linkHTML;

    }

    titleList.insertAdjacentHTML('beforeend', html);

}

generateTitleLinks();


const links = document.querySelectorAll('.titles a');
console.log(links);

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}

function calculateTagsParams(tags) {

    const params = {max: 0, min:100 };

    for(let tag in tags) {
        console.log(tag + ' is used ' + tags[tag] + ' times');
        params.max = Math.max(tags[tag], params.max);
        params.min = Math.min(tags[tag], params.min);
    }

    return params;
}

function calculateTagClass( count, params) {
    console.log(count);
    const normalizedCount = count - params.min;

    const normalizedMax = params.max - params.min;

    const percentage = normalizedCount / normalizedMax;

    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1);

    console.log('classNumber: ' +classNumber);

    const className = optCloudClassPrefix + classNumber;

    console.log('className:'+ className);

    return className;

}

function generateTags() {

    /* create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */

    for (let article of articles) {

        /* find tags wrapper */

        const tagWrapper = article.querySelector(optArticleTagsSelector);

        /* make html variable with empty string */

        let html = '';

        /* get tags from data-tags attribute */

        const articleTags = article.getAttribute('data-tags');
        console.log(articleTags);

        /* split tags into array */

        const articleTagsArray = articleTags.split(' ');
        console.log(articleTagsArray);

        /* START LOOP: for each tag */

        for (let tag of articleTagsArray) {

            /* generate HTML of the link */

            console.log(tag);
            const tagHTMLData = {id: tag, title: tag};
            const tagHTML = templates.tagLink(tagHTMLData);

            /* add generated code to html variable */

            html = html + tagHTML;

            /* [NEW] check if this link is NOT already in allTags */
            if (!allTags.hasOwnProperty(tag)){
                /* [NEW] add tag to allTags object */
                allTags[tag] = 1;
            } else {
                allTags[tag]++;
            }


            /* END LOOP: for each tag */

        }

        /* insert HTML of all the links into the tags wrapper */

        tagWrapper.insertAdjacentHTML('beforeend', html);

        /* END LOOP: for every article: */
    }

    const tagList = document.querySelector(optTagsListSelector);


    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* create variable for all links HTML code */
    const allTagsData = {tags: []};

    for (let tag in allTags) {
        /*generate code of a link adn add it to allTagsHTML */
        allTagsData.tags.push({
            tag: tag,
            count: allTags[tag],
            className: calculateTagClass(allTags[tag], tagsParams)
        });
    }
    /* END LOOP: for each tag in allTags: */

    /* add html from allTagsHTML to tagList */

    tagList.innerHTML = templates.tagCloudLink(allTagsData);

    /* add html from allTags to tagList  */
    // tagList.innerHTML = allTags.join(' ');

    console.log(allTags);
}

generateTags();


function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */

    for (let activeTag of activeTags) {

        /* remove class active */

        activeTag.classList.remove('active');

        /* END LOOP: for each active tag link */

    }

    /* find all tag links with "href" attribute equal to the "href" constant */

    console.log('href: ' + href);
    const targetTags = document.querySelectorAll('a[href="' + href + '"]');
    console.log(targetTags);

    /* START LOOP: for each found tag link */

    for (let targetTag of targetTags) {


        /* add class active */

        targetTag.classList.add('active');

        /* END LOOP: for each found tag link */

    }

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
    /* find all links to tags */

    const links = document.querySelectorAll('a[href^="#tag-"]');

    /* START LOOP: for each link */

    for (let link of links) {

        /* add tagClickHandler as event listener for that link */


        link.addEventListener('click', tagClickHandler);

        /* END LOOP: for each link */
    }
}

addClickListenersToTags();

function generateAuthors() {

    let allAuthors = [];

    const allAuthorsData = {authors: []};

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */

    for (let article of articles) {

        /* find author wrapper */

        const authorWrapper = article.querySelector(optArticleAuthorSelector);

        /* make html variable with empty string */



        /* get author from data-author attribute */

        const articleAuthor = article.getAttribute('data-author');
        console.log(articleAuthor);

        const authorHTMLData = {id: articleAuthor, title: articleAuthor};
        const authorHTML = templates.authorLink(authorHTMLData);

        /* add generated code to html variable */
        allAuthorsData.authors.push({
            author: articleAuthor,
        });
        console.log(allAuthorsData)

        if (allAuthors.indexOf(authorHTML) == -1) {
            allAuthors.push(authorHTML);
        }

        /* END LOOP: for each tag */

        /* insert HTML of all the links into the tags wrapper */

        authorWrapper.insertAdjacentHTML('beforeend', authorHTML);


        /* END LOOP: for every article: */
    }
    document.querySelector(optAuthorsListSelector).innerHTML = templates.authorCloudLink(allAuthorsData);
}

function addClickListenersToAuthors() {

    const links = document.querySelectorAll('a[href^="#author-"]');

    /* START LOOP: for each link */

    for (let link of links) {

        /* add authorClickHandler as event listener for that link */


        link.addEventListener('click', authorClickHandler);

        /* END LOOP: for each link */
    }

}

function authorClickHandler(event) {

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* make a new constant "author" and extract tag from the "href" constant */

    const author = href.replace('#author-', '');

    /* find all author links with class active */

    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active author link */

    for (let activeAuthor of activeAuthors) {

        /* remove class active */

        activeAuthor.classList.remove('active');

        /* END LOOP: for each active author link */

    }

    /* find all tag links with "href" attribute equal to the "href" constant */

    console.log('href: ' + href);
    const targetAuthors = document.querySelectorAll('a[href="' + href + '"]');
    console.log(targetAuthors);

    /* START LOOP: for each found tag link */

    for (let targetAuthor of targetAuthors) {


        /* add class active */

        targetAuthor.classList.add('active');

        /* END LOOP: for each found tag link */

    }

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-author="' + author + '"]');

}

generateAuthors();
addClickListenersToAuthors();
