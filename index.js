const express = require("express");
const axios = require("axios");
const _ = require('lodash');
const PORT = process.env.PORT || 3000;
const app = express();

// Define variables to store the fetched data
let blogData = null;

// Create a function to fetch blog data
const fetchData = async () => {
    try {
        const response = await axios.get("https://intent-kit-16.hasura.app/api/rest/blogs", {
            headers: {
                'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
            }
        });
        blogData = response.data.blogs;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching blog data');
    }
};

// Create a function to calculate blog statistics and cache the results
const calculateBlogStats = _.memoize(() => {
    if (!blogData) {
        throw new Error('Blog data has not been fetched yet.');
    }

    const totalBlogs = blogData.length;
    const longestTitleBlog = _.maxBy(blogData, blog => blog.title.length);
    const blogsWithPrivacy = _.filter(blogData, blog => _.includes(_.toLower(blog.title), 'privacy'));
    const uniqueTitles = _.uniqBy(blogData, 'title');

    return {
        totalBlogs,
        longestTitleBlog: longestTitleBlog.title,
        blogsWithPrivacy: blogsWithPrivacy.length,
        uniqueTitles: uniqueTitles.map(blog => blog.title),
    };
});

// Create a route to fetch blog data and perform analytics
app.get("/api/blog-stats", async (req, res) => {
    try {
        // If blogData is not fetched yet, fetch it
        if (!blogData) {
            await fetchData();
        }

        // Calculate and send the analytics data as a response
        const stats = calculateBlogStats();
        res.json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching or processing blog data' });
    }
});

// Create a route for blog search
app.get("/api/blog-search", (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter "query" is required.' });
    }

    // Perform search on the fetched blog data
    const searchResults = _.filter(blogData, blog =>
        _.includes(_.toLower(blog.title), _.toLower(query))
    );
    res.json(searchResults);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
