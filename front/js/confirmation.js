//////*********** Affichage ID Commande page confirmation **********///////////

//On récupère l'ID
function idPage() {
  let url = new URL(window.location.href);
  let idArticle = url.searchParams.get("id");
  if (idArticle != undefined) {
    document.querySelector("#orderId").textContent = idArticle;
  }
}
idPage();
