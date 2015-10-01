angular.module('notely')
.directive('bdNotesList', function() {
  return {
    scope: {},
    controller: NotesListController,
    controllerAs: 'ctrl',
    template: `
      <nav id="sidebar">
        <button class="new-note btn btn-default"
          ui-sref="notes.form({noteId: undefined})">
          New Note
        </button>
        <ul id="notes">
          <li ng-repeat="note in ctrl.notes track by note.id | orderBy: '-updated_at'">
            <a class="note" ui-sref="notes.form({noteId:note.id})">{{ note.title }}</a>
          </li>
        </ul>
      </nav>
    `
  };

  NotesListController['$inject'] = ['notes'];
  function NotesListController(notes) {
    this.notes = notes.all();
  }
});
