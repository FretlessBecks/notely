angular.module('notely').directive('bdNotesForm', () =>{
  return {
    scope: {},
    controller: NotesFormController,
    controllerAs: 'notesForm',
    bindToController: true,
    templateUrl: '/notes/notes-form.html'
  }
})

class NotesFormController {
  constructor($state, notes) {
    this.$state = $state
    this.notes = notes
    this.note = this.notes.findById(this.$state.params.noteId);
  }

  buttonText() {
    if (this.note.id) {
      return 'Save Changes';
    }
    return 'Save';
  }

  save() {
    if ($scope.note.id) {
      this.notes.update($scope.note).success((data) => {
        this.note = data.note;
      });
    }
    else {
      this.notes.create(this.note);
    }
  }

  delete() {
    this.notes.delete(this.note)
    .success(() => {
      this.$state.go('notes.form', { noteId: undefined });
    });
  }
}
NotesFormController.$inject = ['$state', 'notes'];
