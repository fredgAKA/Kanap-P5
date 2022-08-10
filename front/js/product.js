var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");

const colorChoice = document.querySelector("#colors");
const quantityChoice = document.querySelector("#quantity");

// Récupération articles de l'API
function getArticle() {
  fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
      return res.json();
    })

    // Répartition données de l'API dans DOM
    .then(async function (resultAPI) {
      article = await resultAPI;
      console.table(article);
      if (article) {
        getPost(article);
      }
    })
    .catch((error) => {
      console.log("API Error");
    });
}
getArticle();

function getPost(article) {
  // img
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  // h1
  let productName = document.getElementById("title");
  productName.innerHTML = article.name;

  // prix
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = article.price;

  // description
  let productDescription = document.getElementById("description");
  productDescription.innerHTML = article.description;

  // couleurs
  for (let colors of article.colors) {
    console.table(colors);
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }
  addToCart(article);
}

// panier
function addToCart(article) {
  const okCart = document.querySelector("#addToCart");

  //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
  okCart.addEventListener("click", (event) => {
    
    
    if (colorChoice.value == false) {
      confirm("Veuillez sélectionner une couleur");
    } else if (quantityChoice.value == 0) {
      confirm("Veuillez sélectionner le nombre d'articles souhaités")
    } else {
      alert("Votre article a bien été ajouté au panier");
    
      //Recupération du choix de la couleur
      let colorKanap = colorChoice.value;

      //Recupération du choix de la quantité
      let quantityKanap = quantityChoice.value;

      //Récupération des options de l'article à ajouter au panier
      let optionsProduit = {
        idProduit: idProduct,
        couleurProduit: colorKanap,
        quantiteProduit: Number(quantityKanap),
        nomProduit: article.name,
        prixProduit: article.price,
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt,
      };

      // local storage init
      let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));



      //Importation dans le local storage
      //Si le panier comporte déjà au moins 1 article
      if (produitLocalStorage) {
        const resultFind = produitLocalStorage.find(
          (el) => el.idProduit === idProduct && el.couleurProduit === colorKanap
        );
        //Si le produit commandé est déjà dans le panier
        if (resultFind) {
          let newQuantity =
            parseInt(optionsProduit.quantiteProduit) +
            parseInt(resultFind.quantiteProduit);
          resultFind.quantiteProduit = newQuantity;
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          console.table(produitLocalStorage);
          popupConfirmation();
          //Si le produit commandé n'est pas dans le panier
        } else {
          produitLocalStorage.push(optionsProduit);
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          console.table(produitLocalStorage);
          popupConfirmation();
        }
        //Si le panier est vide
      } else {
        produitLocalStorage = [];
        produitLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
        popupConfirmation();
      }
    }
  });
}
