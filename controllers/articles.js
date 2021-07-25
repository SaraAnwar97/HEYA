const article = require("../models/articles");


exports.getArticles = async (req, res, next) => {
    try {
        var category = req.query.category;
        var query = { category: category };
        var result = await article.find(query);
        res.send(result);
    } catch (error) {
        res.status(500).send(error)
    }
};