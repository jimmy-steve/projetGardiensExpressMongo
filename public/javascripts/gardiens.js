function confirmer() {
  var res = confirm("Êtes-vous sûr de vouloir supprimer?");
  if (res) {
    // Mettez ici la logique de suppression
    console.log("Cool")
  }
}

$(function () {
  $('.example-popover').popover({
    container: 'body'
  })
})