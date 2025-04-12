import {
    By,
    until,
    Builder,
    Browser
} from 'selenium-webdriver';
import assert from 'assert';
import fs from 'fs';

// Captures a screenshot when a test fails
export async function captureFailureScreenshot(driver, testName) {
    if (!driver) {
      console.error('Cannot capture screenshot: driver is not available');
      return;
    }
  
    try {
      // Create screenshots directory if it doesn't exist
      if (!fs.existsSync('./screenshots')) {
        fs.mkdirSync('./screenshots');
      }
      // Delete existing screenshots with the same testName
      const files = fs.readdirSync('./screenshots');
      const pattern = new RegExp(`^failure_${testName}_\\d+\\.png$`);
    
      for (const file of files) {
        if (pattern.test(file)) {
          fs.unlinkSync(`./screenshots/${file}`);
          console.log(`Deleted existing screenshot: ./screenshots/${file}`);
        }
      }
      
      // Create timestamp for unique filename
      const timestamp = new Date().getTime();
      const screenshotPath = `./screenshots/failure_${testName}_${timestamp}.png`;
      
      // Use selenium's built-in screenshot method
      const screenshot = await driver.takeScreenshot();
      fs.writeFileSync(screenshotPath, screenshot, 'base64');
      
      console.log(`Screenshot saved to: ${screenshotPath}`);
      
    } catch (error) {
      console.log(`Error capturing failure screenshot for failed ${testName}: ${error.message}`);
    }
}

// retryTest function to retry a failed test
async function retryTest(fn) {
    let retries = 1;  // Number of retries, default to 1. If set to 3, the test will be retried 3 times.
    let delay = 2000;
    let lastError;
    for (let i = 0; i < retries; i++) {
        try {
            await fn(); // Execute the test
            return; // If the test passes, exit early
        } catch (error) {
            lastError = error;
            console.log(`Retrying... for the ${i + 1} time`);
            if (i < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay)); // Wait before retrying
            }
        }
    }
    throw lastError; // If all retries fail, throw the last error
}

// Test URL
let URL = "https://dumnevijay.github.io/";


export async function TEST_PORTFOLIO() {
    console.log("\n\nTEST_STARTED: TEST_PORTFOLIO");
    let driver;
    try {
    // Retry the entire test logic
    await retryTest(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();  // Create a new instance of the Chrome driver
    try {
       
        await driver.get(URL); // Navigate to the URL
        // driver.manage().window().maximize();

        // check for the page title.
        const title = await driver.getTitle();  // getting the page title
        assert.strictEqual(title, "Dumne Vijay - Software Engineer Portfolio", "Page title is not displayed as expected"); // check for the page title
        console.log("Page Title is displayed properly as expected");  

        // check for the heading text.
        const containers = await driver.wait(until.elementsLocated(By.className("container")), 5000);  // getting elements with class "container" and getting the first element text.
        const headingText = await containers[0].getText();  // getting the first container element text
        let headingTextCheck = `DUMNE VIJAY\nQA Automation & Full-Stack Engineer\nAbout\nExperience\nSkills\nProjects\nContact`;
        assert.strictEqual(headingText, headingTextCheck, "Heading text is not displayed as expected");  // check for the heading text
        console.log("Heading Text is displayed properly as expected");
        
        const sections = await driver.wait(until.elementsLocated(By.className("section")), 5000);  // getting elements with class "section"

        // check for the section First text
        let sectionFirstTextCheck = `About Me
Aspiring software engineer with hands-on experience in both frontend and backend technologies seeking an opportunity to leverage my skills in test automation, API development, and UI implementation. Passionate about creating reliable, high-performance applications while continuing to grow my technical expertise across the full development stack.
Eager to contribute my problem-solving abilities and collaborative mindset to a forward-thinking team that values innovation and quality-driven development.`;
        let sectionText = await sections[0].getText();  // getting the first element text
        assert.strictEqual(
            sectionText, 
            sectionFirstTextCheck, 
            "Section One text is not displayed as expected"
        );  // check for the section First text
        console.log("Section First Text is displayed properly as expected");

        // check for the section Second text
        let sectionSecondTextCheck = `Experience
Software Engineer Intern
@ RapidKen.AI
3-month Internship
During my internship at RapidKen.AI, I have:
Implemented automated frontend testing using Selenium WebDriver, improved application stability.
Developed comprehensive API testing frameworks using Python's unittest library, achieving 90%+ test coverage across critical endpoints.
Conducted performance testing with Locust.
Contributed to backend development using Python and Flask framework, implementing RESTful APIs and server-side functionalities.
Utilized Google Colab to implement OpenAI API integrations for data collection purposes.
Collaborated with development team to implement frontend features based on design requirements.
Participated in agile development processes including daily stand-ups, sprint planning, and retrospectives.
Documented testing procedures and created detailed bug reports, enhancing team communication and reducing bug resolution time.
Technologies Used:
Python
Flask
Google Colab
OpenAI API
Selenium
unittest
Locust
HTML
CSS
JavaScript`
        sectionText = await sections[1].getText();  // getting the Second element text
        assert.strictEqual(
            sectionText, 
            sectionSecondTextCheck, 
            "Section Two text is not displayed as expected"
        );  // check for the section Second text
        console.log("Section Second Text is displayed properly as expected");

        // check for the section Third text
        let sectionThirdTextCheck = `Skills
Frontend
Develop user interfaces using HTML, CSS, and JavaScript as per the requirements of the project.
Backend
Develop APIs using Flask as per the requirements of the project.
Frontend Testing
Frontend Testing using Selenium WebDriver with detailed test scenarios and reports.
API Testing
API Testing using Pytest with comprehensive test coverage and validation.
Performance Testing
Performance Testing using Locust with detailed metrics analysis and reporting.
Data Processing
Python scripts for data processing and analysis using Google Colab and Jupyter Notebooks.`
        sectionText = await sections[2].getText();  // getting the Third element text
        assert.strictEqual(
            sectionText, 
            sectionThirdTextCheck, 
            "Section Three text is not displayed as expected"
        );  // check for the section Third text
        console.log("Section Third Text is displayed properly as expected");

        // check for the section Fourth text
        let sectionFourthTextCheck = `Projects
Test Automation Framework
Developed a comprehensive testing framework using Selenium and Python for frontend testing automation.
Python
Selenium
unittest
View Code
API Testing Suite
Created a robust API testing suite with Python and pytest for validating RESTful endpoints.
Python
pytest
Requests
View Code
Performance Testing Dashboard
Built a performance testing dashboard using Locust and Flask for visualizing test results.
Python
Flask
Locust
JavaScript
View Code`
        sectionText = await sections[3].getText();  // getting the Fourth element text
        assert.strictEqual(
            sectionText, 
            sectionFourthTextCheck, 
            "Section Four text is not displayed as expected"
        );  // check for the section Fourth text
        console.log("Section Four Text is displayed properly as expected");

        // check for the section Fifth text
        let sectionFifthTextCheck = `Contact Me
Location
Hyderabad, India
Email
18253c090@gmail.com
Connect With Me`
        sectionText = await sections[4].getText();  // getting the Fifth element text
        assert.strictEqual(
            sectionText, 
            sectionFifthTextCheck, 
            "Section Four text is not displayed as expected"
        );  // check for the section Fifth text
        console.log("Section Fifth Text is displayed properly as expected");

        // check for dark mode toggle
        const header = await driver.findElement(By.css("header"));
        const body = await driver.findElement(By.css("body"));
        // check for header and body background color
        assert.strictEqual(
            await header.getCssValue("background-color"),
            "rgba(18, 18, 18, 1)",
            "Background color is not displayed as expected for the header tag for dark mode."
        );
        assert.strictEqual(
            await body.getCssValue("background-color"),
            "rgba(26, 26, 26, 1)",
            "Background color is not displayed as expected for the body tag for dark mode."
        );
        console.log("Dark mode toggle is displayed properly as expected");
        
        // check for light mode toggle
        const themeToggleButton = await driver.wait(until.elementsLocated(By.id("theme-toggle")), 5000);  // waiting for the theme toggle button
        await themeToggleButton[0].click();  // clicking the theme toggle button to switch to light mode
        await driver.sleep(500);  // waiting for 500ms, to let the theme change
        // check for header and body background color
        assert.strictEqual(
            await header.getCssValue("background-color"),
            "rgba(255, 255, 255, 1)",
            "Background color is not displayed as expected for the header tag for light mode."
        );
        assert.strictEqual(
            await body.getCssValue("background-color"),
            "rgba(245, 245, 245, 1)",
            "Background color is not displayed as expected for the body tag for light mode."
        );
        console.log("Light mode toggle is displayed properly as expected");

        console.log("TEST_PASSED: TEST_PORTFOLIO");  
        
    } catch (error) {
        // Take screenshot on failure
        await captureFailureScreenshot(driver, "TEST_PORTFOLIO");
        throw error;
    } finally {
        await driver.quit();
    }
    }); 
    } catch (error) {
        console.log(`TEST_FAILED: TEST_PORTFOLIO after retries: ${error}`);
    }
}

// Run the test
await TEST_PORTFOLIO();