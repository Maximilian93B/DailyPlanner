$(function () {
  // Display Current Day
  var currentDay = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDay);

  // Hours of the work day (9 am to 5 pm)
  var workDayHours = Array.from({ length: 6 }, (_, index) => index + 12);;

// Generate timeblocks 
  var timeBlockContainer = $(".container-lg");
  var currentHour = dayjs().hour();

  workDayHours.forEach(hour => {
    var timeBlock = $("<div>").addClass("row time-block").attr("id", "hour-" + hour);
    timeBlock.append(
      $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(dayjs().hour(hour).format("hA")),
      $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3"),
      $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save").html('<i class="fas fa-save" aria-hidden="true"></i>')
    );

    // Compare current hour + timeBlock --> update if needed 
    if (hour < currentHour) {
      timeBlock.removeClass("future").addClass("past");
    } else if (hour === currentHour) {
      timeBlock.removeClass("future").addClass("present");
    }

    // Add event listener to save button for saving events to local storage
    timeBlock.find(".saveBtn").on("click", function () {
      var eventText = timeBlock.find(".description").val();
      var storageKey = "event-" + hour;
      console.log("Save button clicked")

      localStorage.setItem(storageKey, eventText);
      console.log("Event saved for Hour " + hour);
    });

    // Retrieve saved events from local storage and idsplay in timeBlock 
    var storedEvent = localStorage.getItem("event-" + hour);
    if (storedEvent) {
      timeBlock.find(".description").val(storedEvent);
    }

    //set timeBlocks green 
    if (hour > 11) {
      timeBlock.removeClass("past present").addClass("future");
    }


    timeBlockContainer.append(timeBlock);
  });
});


 
 