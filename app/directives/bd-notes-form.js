angular.module('notely').directive('bdNotesForm', () =>{
  return {
    controller: NotesFormController,
    templateUrl: '/notes/notes-form.html'
  }
})

NotesFormController['$inject'] = ['$scope', '$state', 'notes'];
function NotesFormController($scope, $state, notes) {
  $scope.note = notes.findById($state.params.noteId);

  $scope.buttonText = function() {
    if ($scope.note.id) {
      return 'Save Changes';
    }
    return 'Save';
  }

  $scope.save = function() {
    if ($scope.note.id) {
      notes.update($scope.note).success(function(data) {
        $scope.note = data.note;
      });
    }
    else {
      notes.create($scope.note);
    }
  }

  $scope.delete = function() {
    notes.delete($scope.note)
    .success(function() {
      $state.go('notes.form', { noteId: undefined });
    });
  }
}
