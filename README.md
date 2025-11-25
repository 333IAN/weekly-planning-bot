# 📅 Weekly Planning Bot – Mission Control

> A **serverless intelligent event management system** that combines an interactive web interface with automated email reminders to help you stay organized and on track. Never miss your daily planning or weekly reviews again.

---

## 🎯 Overview

**Mission Control** is a modern, zero-infrastructure task planning bot that seamlessly syncs your tasks with Google Calendar and delivers intelligent email reminders at strategic times. Built on Google Apps Script, it requires **no backend server**, **no database**, and operates entirely within the free tier of Google Services.

Whether you're a productivity enthusiast, project manager, or someone who struggles with consistency, this bot ensures you have a structured routine for:
- ☀️ **Daily morning planning** (9:00 AM)
- 🌴 **Weekend prep** (Friday 6:30 PM)
- 🚀 **Weekly sprints** (Sunday 6:30 PM)

---

##  Key Features

### 🎨 Interactive Web Dashboard
- **Elegant dark-mode UI** with real-time task input
- **Optimistic UI updates** for instant feedback
- **One-click calendar sync** – add tasks and they appear on Google Calendar immediately
- Fully responsive design optimized for desktop and mobile

### 📧 Intelligent Email Reminders
- **Daily morning reminder** (9:00 AM) – "Time to plan your day"
- **Friday evening reminder** (6:30 PM) – "Weekend planning call"
- **Sunday evening reminder** (6:30 PM) – "Weekly setup call"
- Beautiful HTML-formatted emails with direct action links
- Personalized subject lines with date and day-of-week

### 📅 Google Calendar Integration
- **Automatic event creation** when you add a task
- **Smart 10-minute notifications** before each event
- **30-minute default duration** per task (customizable)
- Full calendar synchronization – all events visible in Google Calendar

### ⚡ Fully Serverless Architecture
- **Zero backend costs** – runs on Google Apps Script free tier
- **No database required** – leverages Google Calendar as your data store
- **Automatic scaling** – Google handles infrastructure
- **100% uptime** – backed by Google's global infrastructure

### � Privacy-First Design
- **Your data stays in your Google account** – no third-party servers
- **No tracking** – no analytics, no cookies (except Google's own)
- **Open source** – audit the code anytime
- **Full control** – you own your data and schedule

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Google Apps Script (GAS) |
| **Calendar API** | Google Calendar API |
| **Email Service** | Google MailApp API |
| **Scheduler** | Google Time-Based Triggers |
| **Deployment** | Web App deployment on Google Apps Script |
| **Local Dev** | CLASP (Command Line Apps Script) |

---

## 🚀 Quick Start

### Prerequisites
- Google Account (Gmail)
- Google Calendar (enabled)
- Node.js + npm (for CLASP, optional but recommended)

### Installation

#### Option A: GUI Setup (Recommended for Beginners)

1. **Go to [script.google.com](https://script.google.com)**
   - Click **New Project**

2. **Copy & paste the code from `Code.js`**
   - Replace `your-email` with your email
   - Update `tasksUrl` with your preferred tasks page (or leave as-is)

3. **Deploy as Web App**
   - Click **Deploy** → **New Deployment**
   - Select type: **Web app**
   - Execute as: **Your email**
   - Who has access: **Anyone**
   - Copy the deployment URL

4. **Update `index.html`**
   - Replace `GOOGLE_SCRIPT_URL` with your deployment URL

5. **Initialize Triggers**
   - In Apps Script, select `setWeeklyTriggers` function
   - Click **Run** ▶️
   - Approve permissions popup

6. **Open `index.html` in your browser**
   - Start adding tasks!

#### Option B: CLI Setup (For Developers)

```bash
# 1. Install CLASP globally
npm install -g @google/clasp

# 2. Authenticate
clasp login

# 3. Clone this project to your local machine
clasp clone <YOUR_SCRIPT_ID>

# 4. Edit Code.js locally
# Update: recipient email and tasksUrl

# 5. Push changes to Google Apps Script
clasp push

# 6. Deploy as Web App (GUI)
# Go to script.google.com, Deploy → New Deployment

# 7. Update index.html with new URL and open in browser
```

---

## 📋 Configuration

### Email Configuration
Edit `Code.js` and update these variables:

```javascript
const recipient = "your-email@gmail.com";      // Your email address
const tasksUrl = "https://your-tasks-page/";   // Link to your tasks dashboard
```

### Trigger Timing
Modify trigger times in the `setWeeklyTriggers()` function:

```javascript
// Daily at 9 AM
.atHour(9)

// Friday at 6:30 PM
.onWeekDay(ScriptApp.WeekDay.FRIDAY)
.atHour(18)
.nearMinute(30)

// Sunday at 6:30 PM
.onWeekDay(ScriptApp.WeekDay.SUNDAY)
.atHour(18)
.nearMinute(30)
```

### Task Duration
Edit the event duration in `doPost()`:

```javascript
// Currently 30 minutes
var endTime = new Date(taskTime.getTime() + (30 * 60 * 1000));

```

### Calendar Reminder
Adjust notification minutes before event in `doPost()`:

```javascript
event.addPopupReminder(10); // 10 minutes before (default)
```

---

## 📱 How It Works

### Daily Workflow

```
┌─────────────────────────────────────────────────────────┐
│ 9:00 AM - Daily Morning Email                           │
│ ├─ Subject: "Monday - Time to Plan Your Day"            │
│ ├─ Reminder to add tasks                                │
│ └─ Direct link to task planner                          │
├─────────────────────────────────────────────────────────┤
│ Throughout the Day - Add Tasks                          │
│ ├─ Open index.html                                      │
│ ├─ Enter task name and time                             │
│ ├─ Click "Sync to Cal"                                  │
│ └─ Event instantly appears on Google Calendar           │
├─────────────────────────────────────────────────────────┤
│ 10 Minutes Before Event - Calendar Notification         │
│ └─ Popup reminder on your device                        │
├─────────────────────────────────────────────────────────┤
│ Friday 6:30 PM - Weekend Planning Email                 │
│ └─ Prepare for the weekend                              │
├─────────────────────────────────────────────────────────┤
│ Sunday 6:30 PM - Weekly Setup Email                     │
│ └─ Plan your week ahead                                 │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

```
Frontend (index.html)
    ↓ [POST: task + time]
Google Apps Script (doPost)
    ├─ Parse incoming data
    ├─ Create Calendar event
    ├─ Add reminder notification
    └─ Return success response
    ↓
Your Google Calendar
    ├─ Event appears immediately
    ├─ 10-min notification set
    └─ Syncs to all your devices
```

---

## 🔧 File Structure

```
weekly-planning-bot/
├── Code.js              # Google Apps Script backend (automation + email logic)
├── index.html           # Frontend web interface (task input + UI)
├── README.md            # This file
├── .gitignore           # Git configuration (excludes sensitive files)
└── .clasp.json          # CLASP configuration (not committed to Git)
```

---

## 🎓 Usage Examples

### Example 1: Daily Standup Setup
```
9:00 AM  → Receive "Plan Your Day" email
          → Open task planner
          → Add: "Team Standup" at 10:00 AM
          → Add: "Review PRs" at 11:00 AM
          → Add: "Lunch" at 12:00 PM
✓ Done   → All events on calendar with reminders
```

### Example 2: Weekly Planning
```
Friday 6:30 PM → Receive "Weekend Planning" email
                → Reflect on week's wins
Sunday 6:30 PM → Receive "Weekly Setup" email
                → Plan priorities for the week
                → Add key meetings and deadlines
✓ Done        → Ready for Monday morning!
```

---

## 🐛 Troubleshooting

### "Synced ✅ but event doesn't appear"
1. Refresh your Google Calendar
2. Check all your calendars (might be hidden)
3. Verify the date/time is in the future
4. Check Apps Script Executions for errors

### Not receiving emails?
1. Verify email address in `Code.js`
2. Run `setWeeklyTriggers()` again
3. Check Gmail spam folder
4. Ensure Google Account permissions are granted

### Task won't submit?
1. Enter both task name AND date/time
2. Check browser console (F12) for errors
3. Verify Google Script deployment URL is correct
4. Ensure "Who has access" is set to "Anyone"

### Need to change email address?
1. Edit `Code.js` → update `recipient` variable
2. Run `clasp push` (or re-paste in Apps Script)
3. No need to redeploy or re-run triggers

---

## 📊 Performance & Limits

| Metric | Value | Notes |
|--------|-------|-------|
| **Tasks per day** | Unlimited | Google Calendar has generous limits |
| **Emails per day** | 100 | Free tier limit (easily covers daily + 2 weekly) |
| **Execution time** | 6 min | Google Apps Script timeout |
| **Storage** | Unlimited | Uses Google Calendar (not stored locally) |
| **Cost** | $0 | Entirely within free tier |

---

## 🔐 Security & Privacy

- ✅ **No backend server** – reduces attack surface
- ✅ **No data collection** – only your own data stored
- ✅ **OAuth 2.0** – Google handles authentication
- ✅ **HTTPS only** – all communication encrypted
- ✅ **Audit trail** – check Apps Script Executions anytime
- ⚠️ **One consideration**: Your email is visible in `Code.js` – keep repo private or use environment variables

---

## 🚀 Advanced Features (Coming Soon)

- [ ] Multiple calendar support
- [ ] Task categories and color-coding
- [ ] SMS notifications (Twilio integration)
- [ ] Custom trigger times per day
- [ ] Weekly report generation
- [ ] Integration with Slack/Teams
- [ ] Task templates

---

## 🤝 Contributing

Have ideas? Found a bug? Want to enhance this?

1. Fork this repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit (`git commit -m 'Add amazing feature'`)
5. Push (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** – see LICENSE file for details.

You're free to use, modify, and distribute this project for personal and commercial use.

---

## 💡 Tips & Best Practices

1. **Set realistic times** – Don't schedule tasks too close together
2. **Use 9 AM reminder** – Wake up and plan your day
3. **Review Friday/Sunday emails** – Don't skip the planning calls
4. **Update tasksUrl** – Link to your actual task management system
5. **Check timezone** – Adjust trigger times for your timezone
6. **Keep email private** – Don't expose your email in public repos

---

## 📞 Support

For issues, questions, or feedback:
- Check the [Troubleshooting](#-troubleshooting) section
- Review [Google Apps Script documentation](https://developers.google.com/apps-script)
- File an issue on GitHub

---

## � Acknowledgments

Built with ❤️ using:
- Google Apps Script
- Google Calendar API
- Google MailApp API
- Vanilla JavaScript

---

**Made with 🚀 for productivity enthusiasts**

Last updated: November 25, 2025
