  
import {articles_url} from '../Configuration/Rest_config';

export async function getArticles(category="religion") {

    try {
        let articles = await fetch(`${articles_url}?&category=${category}`);

        let result = await articles.json();

        //category = null;
        //title = null;
        articles = null;

        return result;
    }
    catch(error) {
        throw error;
    }
}