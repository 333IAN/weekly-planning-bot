function main() {
  // --- CONFIGURATION SECTION ---
  // Paste the link to your specific tasks page here
  const tasksUrl = "your-tasks-page-url" 
  const recipient = "your-email.com";
  // -----------------------------

  var today = new Date().getDay();
  var subject = "";
  var htmlMessage = "";

  // Define the HTML template for the button
  // This creates a clean HTML link that looks like a button
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



function setWeeklyTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }

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
      
  Logger.log("Success! Triggers set for Friday and Sunday only.");
}

// This function listens for data sent from your website
function doPost(e) {
  try {
    // 1. Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    var taskName = data.task;
    var taskTime = new Date(data.time);
    
    // 2. Create the Calendar Event
    // The event lasts 30 minutes by default
    var endTime = new Date(taskTime.getTime() + (30 * 60 * 1000));
    
    var event = CalendarApp.getDefaultCalendar().createEvent(taskName, taskTime, endTime);
    
    // 3. Add the 5-Minute Notification
    event.addPopupReminder(5); // Notification 5 minutes before
    
    // 4. Return success message
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
