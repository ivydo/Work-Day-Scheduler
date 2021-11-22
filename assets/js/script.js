var textArr = [];
var getHours = dateFns.getHours;
// on window load update app every second
window.onload = function () {
  update();
  setInterval(update, 1000);
};

// update function to check time and current date
var update = function () {
  var today = dateFns.format(new Date(), "MMMM Do, YYYY HH:mm:ss");
  $("#currentDay").text(today);
  var result = getHours(new Date());

  $("textarea").each(function (index) {
    if (textArr[index].id + 9 <= 12) {
      if (textArr[index].id + 9 == result) {
        $(this).parent().parent().attr("class", "row bg-danger border-top");
      } else if (textArr[index].id + 9 > result) {
        $(this).parent().parent().attr("class", "row bg-warning  border-top");
      } else if (textArr[index].id + 9 < result) {
        $(this).parent().parent().attr("class", "row bg-secondary border-top");
      }
    }

    if (textArr[index].id + 9 > 12) {
      if (textArr[index].id + 9 == result) {
        $(this).parent().parent().attr("class", "row bg-danger border-top");
      } else if (textArr[index].id + 9 > result) {
        $(this).parent().parent().attr("class", "row bg-warning border-top");
      } else if (textArr[index].id + 9 < result) {
        $(this).parent().parent().attr("class", "row bg-secondary border-top");
      }
    }
  });
};

// assign ID and content of textarea to array
function assignID() {
  $("textArea").each(function (index) {
    $(this).attr("data-id", index);
    textArr.push({ id: index, text: "" });
  });
}

// button handler function to take in new content, indexed by data-id
function btnHandler(button) {
  thisText = $(button).parent().prev("div").find("textarea").val();

  indexVariable = $(button)
    .parent()
    .prev("div")
    .find("textarea")
    .attr("data-id");
  thisTime = $(button)
    .parent()
    .prev()
    .attr("data-time", indexVariable + 9);
  if (textArr != null) {
    textArr[indexVariable] = { id: parseInt(indexVariable), text: thisText };
  }
  saveText();
  // index++;
}

// sett textArr = each current value of textareas
function loadStorageTexts() {
  $("textArea").each(function (index) {
    $(this).val(textArr[index].text);
  });
}

// load from sessionStorage and set textArr = texts (from session storage)
function loadTexts() {
  var savedTexts = sessionStorage.getItem("texts");

  if (!savedTexts) {
    return false;
  }

  savedTexts = JSON.parse(savedTexts);
  console.log(savedTexts, "this is savedTexts");
  textArr = savedTexts;
  loadStorageTexts();
}

// save textArr to sessionStorage
function saveText() {
  sessionStorage.setItem("texts", JSON.stringify(textArr));
}

assignID();
loadTexts();
