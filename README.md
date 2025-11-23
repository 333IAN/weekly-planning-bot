# 📅 Weekly Planning Bot (Google Apps Script)

A serverless automation bot that runs on Google Cloud. It sends actionable email reminders to plan the week and weekend at specific times, utilizing Google Triggers rather than constant polling.

## 🚀 Features
* **Serverless:** Runs entirely on Google Apps Script (no local machine required).
* **Zero Cost:** Utilizes free quotas of G-Suite.
* **Event-Driven:** Uses specific cron-style triggers for Fridays and Sundays only.
* **Interactive:** HTML emails contain direct links to the project management dashboard.

## 🛠️ Tech Stack
* **Language:** JavaScript (Google Apps Script environment)
* **Automation:** Google Time-Based Triggers
* **Service:** GmailApp API

## ⚙️ Setup
1.  Go to [script.google.com](https://script.google.com).
2.  Create a new project and paste the code from `Code.js`.
3.  Run the `setWeeklyTriggers()` function once to initialize the cron jobs.
4.  Update the `tasksUrl` variable with your own Notion/Trello link.

## 📄 License
MIT