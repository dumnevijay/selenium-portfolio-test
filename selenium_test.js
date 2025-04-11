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
    let retries = 1;
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

        // check for the page title.
        const title = await driver.getTitle();  // getting the page title
        assert.strictEqual(title, "Dumne Vijay - Software Engineer", "Page title is not displayed as expected"); // check for the page title
        console.log("Page Title is displayed properly as expected");  

        // check for the heading text.
        const headings = await driver.wait(until.elementsLocated(By.className("container")), 5000);  // getting elements with class "container" and getting the first element text.
        const headingText = await headings[0].getText();  // getting the first element text
        let headingTextCheck = `DUMNE VIJAY\nQA Automation & Full-Stack Engineer`;
        assert.strictEqual(headingText, headingTextCheck, "Heading text is not displayed as expected");  // check for the heading text
        console.log("Heading Text is displayed properly as expected");
        
        const sections = await driver.wait(until.elementsLocated(By.className("section")), 5000);  // getting elements with class "section"

        // check for the section First text
        let sectionFirstTextCheck = `About Me\nAspiring software engineer with hands-on experience in both frontend and backend technologies seeking an opportunity to leverage my skills in test automation, API development, and UI implementation. Passionate about creating reliable, high-performance applications while continuing to grow my technical expertise across the full development stack. Eager to contribute my problem-solving abilities and collaborative mindset to a forward-thinking team that values innovation and quality-driven development.`;
        let sectionText = await sections[0].getText();  // getting the first element text
        assert.strictEqual(
            sectionText, 
            sectionFirstTextCheck, 
            "Section One text is not displayed as expected"
        );  // check for the section First text
        console.log("Section One Text is displayed properly as expected");

        // check for the section Second text
        let sectionSecondTextCheck = `Experience
Software Engineer Intern @ RapidKen.AI | 3-month Internship
During my internship at RapidKen.AI, I have
Implemented automated frontend testing using Selenium WebDriver, improved application stability.
Developed comprehensive API testing frameworks using Python's unittest library, achieving 90%+ test coverage across critical endpoints.
Conducted performance testing with Locust.
Contributed to backend development using Python and Flask framework, implementing RESTful APIs and server-side functionalities.
Utilized Google Colab to implement OpenAI API integrations for data collection purposes.
Collaborated with development team to implement frontend features based on design requirements.
Participated in agile development processes including daily stand-ups, sprint planning, and retrospectives.
Documented testing procedures and created detailed bug reports, enhancing team communication and reducing bug resolution time.
Technologies: Python, Flask, Google Colab, OpenAI API, Selenium, unittest, Locust, HTML, CSS, JavaScript.`
        sectionText = await sections[1].getText();  // getting the Second element text
        assert.strictEqual(
            sectionText, 
            sectionSecondTextCheck, 
            "Section Two text is not displayed as expected"
        );  // check for the section Second text
        console.log("Section Two Text is displayed properly as expected");

        // check for the section Third text
        let sectionThirdTextCheck = `Skills
Frontend
Develop user interfaces using HTML, CSS, and JavaScript as per the requirements of the project.
Backend
Develop APIs using Flask as per the requirements of the project.
Frontend Testing
Frontend Testing using Selenium Testing.
Unit Testing
API Testing using Pytest.
Performance Testing
Performance Testing using Locust.
Google Colab
Wrote Python scripts using Google Colab.`
        sectionText = await sections[2].getText();  // getting the Third element text
        assert.strictEqual(
            sectionText, 
            sectionThirdTextCheck, 
            "Section Three text is not displayed as expected"
        );  // check for the section Third text
        console.log("Section Three Text is displayed properly as expected");

        // check for the section Fourth text
        let sectionFourthTextCheck = `Contact Me
Let's get in touch. Send me a message:
SEND MESSAGE
Hyderabad, India
Gmail
GitHub
LinkedIn
Twitter(X)`
        sectionText = await sections[3].getText();  // getting the Fourth element text
        assert.strictEqual(
            sectionText, 
            sectionFourthTextCheck, 
            "Section Four text is not displayed as expected"
        );  // check for the section Fourth text
        console.log("Section Four Text is displayed properly as expected");

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