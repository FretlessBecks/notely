angular.module('notely').directive('bdNotesForm', () =>{
  return {
    scope: {},
    controller: NotesFormController,
    controllerAs: 'notesForm',
    bindToController: true,
    template: `
      <form ng-submit="notesForm.save()">
        <p>
          <input type="text" name="title" id="note_title" placeholder="Title your note"
          ng-model="notesForm.note.title"
          bd-focus>
        </p>
        <p>
          <text-angular
            name="body_html"
            placeholder="Just start typing..."
            ng-model="notesForm.note.body_html"
            ta-toolbar="[
              ['bold', 'italics', 'underline'],
              ['ul', 'ol', 'indent', 'outdent'],
              ['html'],
              ['insertLink']]"
          ></text-angular>
        </p>
        <div class="form-actions">
          <input type="submit" name="commit" value="{{ notesForm.buttonText() }}" class="btn btn-default">
          <a ng-show="notesForm.note.id" ng-click="notesForm.delete()">
            <i class="fa fa-trash-o"></i>
          </a>
        </div>
      </form>
    `
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
