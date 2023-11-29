$(function () {
    // Display current day
    var currentDay = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDay);
  
    var workDayHours = Array.from({ length: 9 }, (_, index) => index + 9);
  
    // Generating time blocks
    var timeBlockContainer = $(".container-lg");
    workDayHours.forEach((hour, index) => {
      var timeBlock = $("<div>").addClass("row time-block").attr("id", "hour-" + hour);
      timeBlock.append(
        $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(dayjs().hour(hour).format("hA")),
        $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3"),
        $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save").html('<i class="fas fa-save" aria-hidden="true"></i>')
      );
  
      // Make all future event blocks green
      timeBlock.addClass("future");
  
      // Compare current hour and block hour ==> update class
      var currentHour = dayjs().hour();
  
      if (index < 0) {
        var fixedText = "This text cannot be changed";
        timeBlock.find(".description").val(fixedText).prop("disabled", true);
      } else {
        // Compare current hour with time block hour and update class if needed
        if (hour < currentHour) {
          timeBlock.addClass("past");
        } else if (hour === currentHour) {
          timeBlock.addClass("present");
        } else {
          timeBlock.addClass("future");
        }
  
        // Event listener for save button for events
        timeBlock.find(".saveBtn").on("click", function () {
          var eventText = timeBlock.find(".description").val();
          var storageKey = "event-" + hour;
  
          localStorage.setItem(storageKey, eventText);
          console.log("Event saved at " + hour);
        });
  
        // Retrieve saved events and populate in time blocks
        var storedEvent = localStorage.getItem("event-" + hour);
        if (storedEvent) {
          timeBlock.find(".description").val(storedEvent);
        }
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

