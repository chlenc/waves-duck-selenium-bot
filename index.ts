import { Builder, By } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";
require("dotenv").config();
import "chromedriver";

const driver = new Builder().forBrowser("chrome").build();

(async () => {
  if (process.env.LOGIN == null || process.env.PWD == null || process.env.MSG == null) {
    throw "Need env variables";
  }
  await driver.manage().setTimeouts({
    implicit: 10000,
    pageLoad: 30000,
  });
  await driver.get("https://twitter.com/login");
  const uel = await driver.findElements(
    By.css(".r-30o5oe.r-1niwhzg.r-17gur6a.r-1yadl64.r-deolkf.r-homxoj.r-poiln3")
  );
  await uel[0].sendKeys(process.env.LOGIN);
  await uel[1].sendKeys(process.env.PWD);
  const btnLogin = await driver.findElements(
    By.css(".css-901oao.css-16my406.css-bfa6kz.r-poiln3.r-a023e6.r-rjixqe.r-bcqeeo.r-qvutc0")
  );
  await btnLogin[0].click();

  try {
    const btnTerms = await driver.findElement(
      By.css(
        ".css-18t94o4.css-1dbjc4n.r-urgr8i.r-42olwf.r-sdzlij.r-1phboty.r-rs99b7.r-1wzrnnt.r-1pl7oy7.r-1v6e3re.r-1ny4l3l.r-1dye5f7.r-o7ynqc.r-6416eg.r-lrvibr"
      )
    );
    console.log(btnTerms);
    await btnTerms.click();
  } catch (e) {
    console.log("terms not found");
  }

  const textareaClick = await driver.findElement(
    By.css(".public-DraftStyleDefault-block.public-DraftStyleDefault-ltr")
  );
  await textareaClick.click();
  await textareaClick.sendKeys(process.env.MSG);

  const tweetBtnClick = await driver.findElements(
    By.css(
      ".css-901oao.r-1awozwy.r-jwli3a.r-6koalj.r-18u37iz.r-16y2uox.r-1qd0xha.r-a023e6.r-b88u0q.r-1777fci.r-rjixqe.r-bcqeeo.r-q4m81j.r-qvutc0"
    )
  );
  await tweetBtnClick[tweetBtnClick.length - 1].click();
})();
