var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");
// ==============================================================================
// activeNote is used to keep track of the note in the textarea
// ==============================================================================
var activeNote = {};
// ==============================================================================
// A function for getting all notes from the db
// ==============================================================================
var getNotes = function () {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};
// ==============================================================================
// A function for saving a note to the db
// ==============================================================================
var saveNote = function (note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};
// ==============================================================================
// A function for deleting a note from the db
// ==============================================================================
var deleteNote = function (id) {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  });
};
// ==============================================================================
// If there is an activeNote, display it, otherwise render empty inputs
// ==============================================================================
var renderActiveNote = function() {
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.note_title);
    $noteText.val(activeNote.note_text_area);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};
// ==============================================================================
// Get the note data from the inputs, save it to the db and update the view
// ==============================================================================
var handleNoteSave = function () {
  // this adds a unique id, knows to delete and update that specific one
  let uniqueId = Math.random().toString(36).substring(2) + Date.now().toString(36);

  var newNote = {
    id: uniqueId,
    note_title: $noteTitle.val(),
    note_text_area: $noteText.val()
  };

  saveNote(newNote).then(function (db) {
    getAndRenderNotes();
    renderActiveNote();
  });
};
// ==============================================================================
// Delete the clicked note
// ==============================================================================
var handleNoteDelete = function (event) {
  // ============================================================================
  // prevents the click listener for the list from being called when the button inside of it is clicked
  // ============================================================================
  event.stopPropagation();

  var noteID = $(this).attr("data-id");   

  deleteNote(noteID).then(function () {
    getAndRenderNotes();
    renderActiveNote();
  });
};
// ==============================================================================
// Sets the activeNote and displays it
// ==============================================================================
var handleNoteView = function () {
  activeNote = $(this).data();
  renderActiveNote();
};
// ==============================================================================
// Sets the activeNote to and empty object and allows the user to enter a new note
// ==============================================================================
var handleNewNoteView = function () {
  activeNote = {};
  renderActiveNote();
};
// ==============================================================================
// If a note's title or text are empty, hide the save button
// Or else show it
// Don't forget this part when testing or you'll drive yourself nuts looking for the save button
// ==============================================================================
var handleRenderSaveBtn = function () {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};
// ==============================================================================
// Render's the list of note titles
// ==============================================================================
var renderNoteList = function (db) {
  $noteList.empty();

  var noteListItems = [];

  for (var i = 0; i < db.length; i++) {
    var note = db[i];

    var $li = $("<li class='list-group-item'>").data(note);
    var $span = $("<span>").text(note.note_title);
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );
    $delBtn.attr("data-id", note.id)
    $li.append($span, $delBtn);
    noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};
// ==============================================================================
// Gets notes from the db and renders them to the sidebar
// ==============================================================================
var getAndRenderNotes = function () {
  return getNotes().then(function (db) {
    renderNoteList(db);
  });
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);
// ==============================================================================
// Gets and renders the initial list of notes
// ==============================================================================
getAndRenderNotes();
