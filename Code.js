/**
 * ⚙️ CONFIGURATION
 * These values are used across all functions
 * Update these with your own values:
 */
const CONFIG = {
  RECIPIENT_EMAIL: "amuguneisavwa@gmail.com",  // Email where reminders are sent
  TASKS_URL: "https://333ian.github.io/weekly-planning-bot/"  // Link to your task dashboard
};

function main() {
  const tasksUrl = CONFIG.TASKS_URL;
  const recipient = CONFIG.RECIPIENT_EMAIL;

  var today = new Date().getDay();
  var subject = "";
  var htmlMessage = "";


  var buttonHtml = `<br><br>
    <a href="${tasksUrl}" style="background-color: #2980b9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-family: sans-serif;">
      Go to Tasks Page
    </a>`;

  if (today === 5) { // Friday
    subject = "🌴 Weekend Planning Call";
    htmlMessage = "<h2 style='font-family: sans-serif;'>Happy Friday!</h2>" +
                  "<p style='font-family: sans-serif;'>The week is done. Time to set your objectives for the weekend.</p>" + 
                  buttonHtml;
    
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: htmlMessage
    });
  } 
  else if (today === 0) { // Sunday
    subject = "🚀 Weekly Setup Call";
    htmlMessage = "<h2 style='font-family: sans-serif;'>Ready for the week?</h2>" +
                  "<p style='font-family: sans-serif;'>It's Sunday evening. Let's plan the sprint ahead.</p>" + 
                  buttonHtml;

    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: htmlMessage
    });
  }
}



function sendDailyReminder() {
  const tasksUrl = CONFIG.TASKS_URL;
  const recipient = CONFIG.RECIPIENT_EMAIL;

  var today = new Date();
  var dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][today.getDay()];
  var dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  var subject = "📅 " + dayName + " - Time to Plan Your Day (" + dateStr + ")";
  var htmlMessage = `
    <h2 style='font-family: sans-serif; color: #2980b9;'>Good Morning! ☀️</h2>
    <p style='font-family: sans-serif; font-size: 16px;'>
      It's ${dayName}, ${dateStr}. Time to plan your day and add your events to the calendar.
    </p>
    <p style='font-family: sans-serif; color: #666;'>
      Click the button below to open the task planner and start adding your daily tasks and meetings.
    </p>
    <br>
    <a href="${tasksUrl}" style="background-color: #38bdf8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-family: sans-serif; font-weight: bold; display: inline-block;">
      Open Task Planner
    </a>
    <br><br>
    <p style='font-family: sans-serif; color: #999; font-size: 12px;'>
      Have a productive day! 💪
    </p>
  `;

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    htmlBody: htmlMessage
  });

  Logger.log("✉️ Daily reminder sent to " + recipient);
}



function setWeeklyTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }

  // 1. Create the DAILY Trigger (Every day at 9 AM)
  ScriptApp.newTrigger('sendDailyReminder')
      .timeBased()
      .everyDays(1)
      .atHour(9)
      .nearMinute(0)
      .create();

  // 2. Create the FRIDAY Trigger (Weekly)
  ScriptApp.newTrigger('main')
      .timeBased()
      .everyWeeks(1)
      .onWeekDay(ScriptApp.WeekDay.FRIDAY)
      .atHour(18) // 6 PM
      .nearMinute(30)
      .create();
  

  // 3. Create the SUNDAY Trigger (Weekly)
  ScriptApp.newTrigger('main')
      .timeBased()
      .everyWeeks(1)
      .onWeekDay(ScriptApp.WeekDay.SUNDAY)
      .atHour(18) // 6 PM
      .nearMinute(30)
      .create();
      
  Logger.log("Success! Triggers set for daily at 9 AM, Friday at 6 PM, and Sunday at 6 PM.");
}

// This function listens for data sent from your website
function doPost(e) {
  try {
    Logger.log("📨 doPost() called");
    Logger.log("Raw postData: " + e.postData.contents);
    
    // 1. Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    var taskName = data.task;
    var taskTime = new Date(data.time);
    
    // LOG: Parsed data
    Logger.log("✅ Parsed data - Task: " + taskName + ", Time: " + taskTime);
    
    // 2. Create the Calendar Event
    // The event lasts 30 minutes by default
    var endTime = new Date(taskTime.getTime() + (30 * 60 * 1000));
    
    Logger.log("⏰ Event times - Start: " + taskTime + ", End: " + endTime);
    
    var event = CalendarApp.getDefaultCalendar().createEvent(taskName, taskTime, endTime);
    
    // LOG: Event creation success
    Logger.log("📅 Event created! ID: " + event.getId());
    
    // 3. Added the 10-Minute Notification
    event.addPopupReminder(10); // Notification 10 minutes before
    Logger.log("🔔 Reminder added - 10 minutes before");
    
    Logger.log("✔️ Returning success response");
    return ContentService.createTextOutput(JSON.stringify({"status": "success", "eventId": event.getId()}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log("❌ ERROR: " + error.toString());
    Logger.log("Stack: " + error.stack);
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
