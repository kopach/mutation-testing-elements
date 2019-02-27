import { Capabilities, Builder, WebDriver } from 'selenium-webdriver';

let browser: WebDriver | null = null;

async function init() {
  const headlessCapabilities = Capabilities.chrome();
  if (process.env.TRAVIS) {
    // Use headless chrome on the build server
    headlessCapabilities.set('chromeOptions', { args: ['--headless'] });
  }
  browser = await new Builder()
    .forBrowser('chrome')
    .withCapabilities(headlessCapabilities)
    .build();
}

export function getCurrent(): WebDriver {
  if (!browser) {
    throw new Error('Browser is not yet initialized');
  }
  return browser;
}

before(async () => {
  await init();
});

after(async () => {
  await getCurrent().close();
});
