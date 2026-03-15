# Transferty Dashboard Automation

This repository contains the End-to-End (E2E) testing framework for the Transferty Dashboard project.

# 🛠 Technology Stack

    Automation Tool: Playwright

    Programming Language: TypeScript

    Design Pattern: Page Object Model (POM) + Composition over Inheritance

    Reporting: Allure Report / Built-in Playwright HTML Reporter


# Architecture & Core Principles

The project is built on modern automation architectural standards:

    Single Responsibility Principle (SRP): Pages are separated by action logic. For example, OperationalWalletDetailsPage is strictly responsible for reading data and assertions, while EditOperationalWalletPage handles only form filling and saving.

    Composition over Inheritance: Complex UI elements are extracted into independent, reusable widgets (Table, CreationForm, CustomerFee, Sidebar). Pages are assembled from these widgets like building blocks.

    Playwright Fixtures: Page initialization and authorization management (e.g., merchantUser, adminUser) happen "under the hood" using custom fixtures. Tests remain clean and focused solely on business logic.

    Data-Driven Testing: All test data is managed via strictly typed interfaces (e.g., ExternalMidData, EMoneyOperationalWallet), which eliminates typos and allows for easy test scaling.

# Setup & Local Installation

1. Clone the repository:
Bash

git clone (https://github.com/Oleh-Tymchuk/Transferty-Dashboard-Automation)
cd transferty-dashboard-automation

1. Install Node.js dependencies:
Bash

npm install

3. Install Playwright browsers:
Bash

npx playwright install --with-deps

Running Tests

The framework supports various execution modes.

Run all tests in headless mode:
Bash

npx playwright test

Run tests in headed mode for visual debugging:
Bash

npx playwright test --headed

Run a specific test file:
Bash

npx playwright test tests/UI/PayoutTransactions.spec.ts

Viewing Reports

If a test fails, Playwright automatically takes a screenshot, records a trace file (on retries), and saves the logs.

Open the standard HTML report:
Bash

npx playwright show-report

Generate and open the Allure report (if configured):
Bash

npm run allure:generate
npm run allure:open