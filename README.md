### Evaluate a News Article with Natural Language Processing

---

## Project Description

This project is a web application that analyzes news articles using Natural Language Processing (NLP). Users input a URL to a news article, and the application retrieves the following insights:
- **Polarity**: Indicates whether the tone of the article is positive, neutral, or negative.
- **Subjectivity**: Describes whether the content is subjective (opinion-based) or factual.

The analysis is powered by the [AYLIEN News API](https://aylien.com/news-api/).

---

## Features

- Perform sentiment (polarity) analysis on news articles.
- Display results dynamically on the webpage.
- Validate the URL input to ensure it is a valid and properly formatted URL.
- Offline functionality through Service Workers.

---

## Installation and Usage

### Prerequisites
- Ensure **Node.js** and **npm** are installed on your machine.

### Steps to Run the Project
1. Clone the repository from GitHub.
2. Navigate to the project directory in your terminal.
3. Install dependencies:
    npm install

4. Set up your `.env` file:
    - Create a file named `.env` in the root directory and add your AYLIEN API credentials:
        AYLIEN_APP_ID=your-app-id
        AYLIEN_API_KEY=your-api-key
  
5. Build the project in development mode:
    npm run build-dev

6. To build for production, use:
    npm run build-prod

7. Start the server:
    npm run start

8. Open your browser and visit:
    http://localhost:8081

---

## API Note

Initially, I planned to use the **AYLIEN Text Analysis API**, which offered extensive NLP features such as sentiment analysis and entity extraction. However, upon reviewing AYLIEN's documentation, I found that the **Text Analysis API** was deprecated and no longer available for use.

Subsequently, I attempted to use the **MeaningCloud API**, but encountered persistent registration issues. Over the course of a month, I tried multiple email accounts, browsers, and devices without success. I also contacted the **MeaningCloud support team**, but unfortunately did not receive a response.

As a result, I opted to use the **AYLIEN News API** as a workaround. While it provides sentiment and subjectivity analysis, it does not fully meet all the original project requirements. Despite this limitation, I made every effort to implement the available features effectively and deliver a functional project.

I am happy to provide any additional clarification or address feedback as needed. Thank you for your understanding.


---

## Testing

Run the project's tests to ensure all functionalities are working:
npm run test

---

## File Structure

- `src/client`: Frontend code, including:
  - `views/index.html`: The main HTML file for the web application.
  - `js/formHandler.js`: Handles form submission and API requests.
  - `js/urlChecker.js`: Validates the input URL.
  - `styles`: SCSS files for styling different components of the application.
- `src/server`: Backend code for API request handling.
- `webpack.dev.js`: Configuration for development mode.
- `webpack.prod.js`: Configuration for production mode.
- `.env`: A file to store environment variables (API keys).

---

## Dependencies

This project relies on the following dependencies:
- `express`
- `body-parser`
- `cors`
- `dotenv`
- `aylien-news-api`
- `webpack`
- `jest`

