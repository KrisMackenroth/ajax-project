/* exported data */
var data = {
  view: 'feature-form',
  characters: [],
  viewing: null,
  nextEntryId: 1
};

var dataJSON = localStorage.getItem('Characters');
if (dataJSON !== null) {
  data = JSON.parse(dataJSON);
}
window.addEventListener('beforeunload', function (event) {
  var todosJSON = JSON.stringify(data);
  localStorage.setItem('Characters', todosJSON);
});
