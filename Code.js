function main() {
  const tasksUrl = "https://your-tasks-page-url.com"; 
  const recipient = "your-email@gmail.com";

  var today = new Date().getDay();
  var subject = "";
  var htmlMessage="";
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
  
    ScriptApp.newTrigger('main')
      .timeBased()
      .everyWeeks(1)
      .onWeekDay(ScriptApp.WeekDay.FRIDAY)
      .atHour(19) // 7 PM
      .nearMinute(0)
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

