# Transferty Dashboard Automation

This repository contains the End-to-End (E2E) testing framework for the Transferty Dashboard project.

## 🛠 Technology Stack

* **Automation Tool:** Playwright
* **Programming Language:** TypeScript
* **Design Pattern:** Page Object Model (POM) + Composition over Inheritance
* **Reporting:** Allure Report / Built-in Playwright HTML Reporter

---

## 🛠 Setup & Local Installation

1. Clone the repository:
```bash
git clone [https://github.com/VitalRatu/Transferty-Dashboard-Automation.git](https://github.com/VitalRatu/Transferty-Dashboard-Automation.git)
cd transferty-dashboard-automation
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install --with-deps
```

---

## 🛠 Running Tests

The framework supports various execution modes.

1. Run all tests in headless mode:
```bash
npx playwright test
```

2. Run tests in headed mode for visual debugging:
```bash
npx playwright test --headed
```

3. Run a specific test file:
```bash
npx playwright test tests/UI/PayoutTransactions.spec.ts
```

---

## 🛠 Viewing Reports

If a test fails, Playwright automatically takes a screenshot, records a trace file (on retries), and saves the logs.

1. Open the standard HTML report:
```bash
npx playwright show-report
```

2. Generate and open the Allure report:
```bash
npm run allure:generate
npm run allure:open
```