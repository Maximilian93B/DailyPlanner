$(function () {
    var currentDay = dayjs().format ("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDay);

    var workDayHours = Array.from({ length: 9 }, (_, index) => index + 9);

    var timeBlockContainer = $(".container-lg");
        workDayHours.forEach(hour => {
        var timeBlock = $("<div>").addClass("row time-block").attr ("id", "hour-" + hour);
        timeBlock.append(
            $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(hour + "AM"),
            $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3"),
            $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save").html('<i class="fas fa-save" aria-hidden="true"></i>')
        );

            var currentHour = dayjs().hour();
            if(hour < currentHour) {
                timeBlock.addClass("past");
            } else if (hour === currentHour) {
                timeBlock.addClass("present")
            } else {
                timeBlock.addClass("future");
            }

        timeBlockContainer.append(timeBlock);
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
 });
 