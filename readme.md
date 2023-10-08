Certainly! Here's a README file that provides detailed information about the task, the solution, and how to use the code:

---

# Blog Analytics and Search Tool using Express.js and Lodash

## Overview

This project is a blog analytics and search tool developed using Express.js and Lodash. The goal of this tool is to fetch data from a third-party blog API, perform various analytics on the data, and provide a search functionality for blog titles. This README provides a comprehensive guide on how to use the code, how the task was implemented, and relevant details.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [How it Works](#how-it-works)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Bonus Challenge (Caching)](#bonus-challenge-caching)

## Prerequisites

Before getting started, make sure you have the following prerequisites installed:

- Node.js: You need Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

## Getting Started

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd Impulse-Edu-Group
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```

4. Start the Express server:

   ```bash
   npm start
   ```

   The server should now be running at `http://localhost:3000`.

## Project Structure

The project structure is organized as follows:

- `index.js`: The main Express application file.
- `package.json`: Defines project dependencies and scripts.
- `README.md`: This documentation file.

## How it Works

The code follows the task requirements and works as follows:

1. **Data Retrieval**:
   - Express creates a route at `/api/blog-stats`.
   - When a GET request is made to this route, Axios fetches the blog data from a third-party API and stores it in memory.

2. **Data Analysis**:
   - After fetching the data, Lodash is used to perform various analytics on the data.
   - Analytics include calculating the total number of blogs, finding the blog with the longest title, counting blogs with "privacy" in the title, and creating an array of unique blog titles.

3. **Response**:
   - The server responds with a JSON object containing the calculated statistics.

4. **Blog Search Endpoint**:
   - There is an additional route at `/api/blog-search`.
   - This route accepts a `query` parameter, e.g., `/api/blog-search?query=privacy`.
   - It performs a case-insensitive search for blogs containing the provided query string in their titles.

## API Endpoints

1. **Fetch Blog Statistics**:
   - Endpoint: `/api/blog-stats`
   - Method: GET
   - Description: Fetches and analyzes blog data, returning statistics.
   - Example Request: `GET http://localhost:3000/api/blog-stats`
   - Example Response:
     ```json
     {
       "totalBlogs": 10,
       "longestTitleBlog": "Sample Blog Title",
       "blogsWithPrivacy": 5,
       "uniqueTitles": ["Title 1", "Title 2", ...]
     }
     ```

2. **Blog Search**:
   - Endpoint: `/api/blog-search`
   - Method: GET
   - Description: Searches blogs by title for the provided query string.
   - Example Request: `GET http://localhost:3000/api/blog-search?query=privacy`
   - Example Response:
     ```json
[
    {
        "id": "4b66e146-6da5-46e4-8a0e-2b40c0f13b0a",
        "image_url": "https://cdn.subspace.money/whatsub_blogs/slate(1).png",
        "title": "Privacy policy"
    },
    {
        "id": "9b709fce-5cf7-486b-8314-fe4232577ce9",
        "image_url": "https://cdn.subspace.money/whatsub_blogs/slate(1).png",
        "title": "Privacy policy"
    },
    {
        "id": "7811ae2e-aa14-423e-89e7-5773ec79812c",
        "image_url": "https://cdn.subspace.money/whatsub_blogs/slate(1).png",
        "title": "Privacy Policy"
    },
    {
        "id": "8a7ffe79-4054-419e-82ce-f7ba307e5537",
        "image_url": "https://cdn.subspace.money/whatsub_blogs/slate(1).png",
        "title": "Privacy policy"
    }
]
     ```

## Error Handling

- Error handling is implemented throughout the code to handle various scenarios:
  - If the third-party API is unavailable or returns an error, an appropriate error message is sent as a response.
  - If required query parameters are missing in requests, corresponding error messages are returned.

## Bonus Challenge: Caching
- This application implements a caching mechanism using Lodash's memoize function. The caching stores the results of the blog statistics calculation and search functionality for a certain period.
- If the same requests are made within the caching period, the cached results are returned instead of re-fetching and re-analyzing the data.


## Contributing
- Feel free to contribute to this project by creating issues or submitting pull requests.
---