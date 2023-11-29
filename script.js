$(function () {
    // Display Current Day
    var currentDay = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDay);
  
    // Standard business hours (9 am to 5 pm)
    var workDayHours = Array.from({ length: 9 }, (_, index) => index + 9);
  
    // Generate timeblocks dynamically
    var timeBlockContainer = $(".container-lg");
    workDayHours.forEach(hour => {
      var timeBlock = $("<div>").addClass("row time-block").attr("id", "hour-" + hour);
      timeBlock.append(
        $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(dayjs().hour(hour).format("hA")),
        $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3"),
        $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save").html('<i class="fas fa-save" aria-hidden="true"></i>')
      );
  
      // Apply "future" class to all time blocks
      timeBlock.addClass("future");
  
      // Compare current hour with time block hour and update class if needed
      var currentHour = dayjs().hour();
      console.log("Current Hour:", currentHour, "Time Block Hour:", hour);
  
      if (hour < currentHour) {
        timeBlock.removeClass("future").addClass("past");
      } else if (hour === currentHour) {
        timeBlock.removeClass("future").addClass("present");
      }
  
      console.log("Classes After comparison:")


      // Add event listener to save button for saving events to local storage
      timeBlock.find(".saveBtn").on("click", function () {
        var eventText = timeBlock.find(".description").val();
        var storageKey = "event-" + hour;
      
        localStorage.setItem(storageKey, eventText);
        console.log("Event saved for Hour " + hour);
      });
  
      // Retrieve saved events from local storage and populate textareas
      var storedEvent = localStorage.getItem("event-" + hour);
      if (storedEvent) {
        timeBlock.find(".description").val(storedEvent);
      }
  
      timeBlockContainer.append(timeBlock);
    });
  });
  
   // TODO: Add a listener for click events on the save button. This code should
   // use the id in the containing time-block as a key to save the user input in
   // local storage. HINT: What does `this` reference in the click listener
   // function? How can DOM traversal be used to get the "hour-x" id of the
   // time-block containing the button that was clicked? How might the id be
   // useful when saving the description in local storage?
   //
   // TODO: Add code to apply the past, present, or future class to each time
   // block by comparing the id to the current hour. HINTS: How can the id
   // attribute of each time-block be used to conditionally add or remove the
   // past, present, and future classes? How can Day.js be used to get the
   // current hour in 24-hour time?
   //
   // TODO: Add code to get any user input that was saved in localStorage and set
   // the values of the corresponding textarea elements. HINT: How can the id
   // attribute of each time-block be used to do this?
   //
   // TODO: Add code to display the current date in the header of the page.

 