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