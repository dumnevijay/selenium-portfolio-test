# 🧪 Selenium Test – Portfolio Website

This project contains an automated frontend test using Selenium WebDriver for testing the UI of your portfolio website.

## 📁 Project Structure

```
/selenium-portfolio-test
├── selenium_test.js          # Main test file
├── package.json              # Project config
├── package-lock.json         # Dependency lock file
├── .gitignore
└── README.md                 # This file
```

## 🚀 Getting Started

### ✅ Prerequisites

Make sure you have the following installed:
- Node.js (v14 or later)
- Google Chrome
- ChromeDriver (automatically handled via chromedriver npm package)

### 📦 Install Dependencies

Run the following in your terminal:

```bash
npm install
```

This will install:
- selenium-webdriver
- chromedriver

### ▶️ Run the Test

Run your Selenium test script using:

```bash
node selenium_test.js
```

If you're using a test runner file (e.g. run.js), then run that instead:

```bash
node run.js
```

### 📸 Screenshots on Failure

When a test fails, a screenshot will be captured and saved to the `./screenshots/` folder, named like:

```
failure_TEST_PORTFOLIO_1683838383838.png
```

## 📂 .gitignore

This project uses a .gitignore file to exclude:

```
node_modules/
screenshots/
.env
```

## 🛠 Technologies Used

- Node.js
- Selenium WebDriver (JS)
- Google Chrome / ChromeDriver

## 🧰 Useful Commands

```bash
npm install            # Install all dependencies
npm test               # Run your test script (if configured)
node selenium_test.js  # Run the test directly
```

## 📬 Contact

Author: Dumne Vijay

Feel free to fork, modify, or reach out for feedback or collaboration!
