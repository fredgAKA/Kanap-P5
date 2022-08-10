//local storage init
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(produitLocalStorage);
const positionEmptyCart = document.querySelector("#cart__items");

// Si le panier est vide
function getCart(){
    if (produitLocalStorage === null || produitLocalStorage == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    } else {
    for (let produit in produitLocalStorage){
        // Insertion de l'élément "article"
        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute('data-id', produitLocalStorage[produit].idProduit);
    
        // Insertion de l'élément "div"
        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";
    
        // Insertion de l'image
        let productImg = document.createElement("img");
        productDivImg.appendChild(productImg);
        productImg.src = produitLocalStorage[produit].imgProduit;
        productImg.alt = produitLocalStorage[produit].altImgProduit;
        
        // Insertion de l'élément "div"
        let productItemContent = document.createElement("div");
        productArticle.appendChild(productItemContent);
        productItemContent.className = "cart__item__content";
    
        // Insertion de l'élément "div"
        let productItemContentTitlePrice = document.createElement("div");
        productItemContent.appendChild(productItemContentTitlePrice);
        productItemContentTitlePrice.className = "cart__item__content__titlePrice";
        
        // Insertion du titre h3
        let productTitle = document.createElement("h2");
        productItemContentTitlePrice.appendChild(productTitle);
        productTitle.innerHTML = produitLocalStorage[produit].nomProduit;
    
        // Insertion de la couleur
        let productColor = document.createElement("p");
        productTitle.appendChild(productColor);
        productColor.innerHTML = produitLocalStorage[produit].couleurProduit;
        productColor.style.fontSize = "20px";
    
        // Insertion du prix
        let productPrice = document.createElement("p");
        productItemContentTitlePrice.appendChild(productPrice);
        productPrice.innerHTML = produitLocalStorage[produit].prixProduit + " €";
    
        // Insertion de l'élément "div"
        let productItemContentSettings = document.createElement("div");
        productItemContent.appendChild(productItemContentSettings);
        productItemContentSettings.className = "cart__item__content__settings";
    
        // Insertion de l'élément "div"
        let productItemContentSettingsQuantity = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsQuantity);
        productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
        
        // Insertion de "Qté : "
        let productQte = document.createElement("p");
        productItemContentSettingsQuantity.appendChild(productQte);
        productQte.innerHTML = "Qté : ";
    
        // Insertion de la quantité
        let productQuantity = document.createElement("input");
        productItemContentSettingsQuantity.appendChild(productQuantity);
        productQuantity.value = produitLocalStorage[produit].quantiteProduit;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");
    
        // Insertion de l'élément "div"
        let productItemContentSettingsDelete = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsDelete);
        productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
    
        // Insertion de "p" supprimer
        let productSupprimer = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productSupprimer);
        productSupprimer.className = "deleteItem";
        productSupprimer.innerHTML = "Supprimer";
    }
    }}
    getCart();

    function getTotals(){

        // Récupération du total des quantités
        var elemsQtt = document.getElementsByClassName('itemQuantity');
        var myLength = elemsQtt.length,
        totalQtt = 0;
    
        for (var i = 0; i < myLength; ++i) {
            totalQtt += elemsQtt[i].valueAsNumber;
        }
    
        let productTotalQuantity = document.getElementById('totalQuantity');
        productTotalQuantity.innerHTML = totalQtt;
        console.log(totalQtt);
    
        // Récupération du prix total
        totalPrice = 0;
    
        for (var i = 0; i < myLength; ++i) {
            totalPrice += (elemsQtt[i].valueAsNumber * produitLocalStorage[i].prixProduit);
        }
    
        let productTotalPrice = document.getElementById('totalPrice');
        productTotalPrice.innerHTML = totalPrice;
        console.log(totalPrice);
    }
    getTotals();

    // Modification d'une quantité de produit
function modifyQuantity() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qttModif.length; k++){
        qttModif[k].addEventListener("change" , (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = produitLocalStorage[k].quantiteProduit;
            let qttModifValue = qttModif[k].valueAsNumber;
            
            const resultFind = produitLocalStorage.find((el) => el.qttModifValue !== quantityModif);

            resultFind.quantiteProduit = qttModifValue;
            produitLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        
            // refresh
            location.reload();
        })
    }
}
modifyQuantity();

// Suppression d'un produit
function deleteProduct() {
    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < btn_supprimer.length; j++){
        btn_supprimer[j].addEventListener("click" , (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = produitLocalStorage[j].idProduit;
            let colorDelete = produitLocalStorage[j].couleurProduit;

            produitLocalStorage = produitLocalStorage.filter( el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete );
            
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}
deleteProduct();

//Instauration formulaire avec Regex
function getForm() {
    //Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    //Ecoute de la modif du prénom dans le formulaire
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    // Ecoute de la modif du Nom de famille dans le formulaire
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    //Ecoute de la modif de l'adresse dans le formulaire
    form.address.addEventListener('change', function() {
        valideAddress(this);
    });

    //Ecoute de la modif de la ville dans le formulaire
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    //Ecoute de la modif de l'email dans le formulaire
    form.email.addEventListener('change', function() {
        valideEmail(this);
    });

    //Validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
}
getForm();

// Le formulaire

// Selection du bouton valider
const btnValidate = document.querySelector('#order');

// Ecoute du bouton valider sur le click pour pouvoir valider le formulaire
btnValidate.addEventListener("click", (event) => {
    event.preventDefault();

    let contact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value,
    };

    console.log(contact);

    //Gestion formulaire

    //regex pour le contrôle des champs prénom, nom et ville

    const regExPrenomNomVille = (value) => {
        return /^[A-Z][A-Za-z\é\è\ê\-]+$/.test(value);
      };
    
      // Regex pour le contrôle du champ Adresse
      const regExAdresse = (value) => {
        return /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/.test(value);
      };
    
      // Regex pour le contrôle du champ Email
      const regExEmail = (value) => {
        return /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(
          value
        );
      };
    
      // Fonctions de contrôle du champ Prénom:
      function firstNameControl() {
        const prenom = contact.firstName;
        let inputFirstName = document.querySelector("#firstName");
        if (regExPrenomNomVille(prenom)) {
          inputFirstName.style.backgroundColor = "green";
    
          document.querySelector("#firstNameErrorMsg").textContent = "";
          return true;
        } else {
          inputFirstName.style.backgroundColor = "#FF6F61";
    
          document.querySelector("#firstNameErrorMsg").textContent =
            "Champ Prénom de formulaire invalide, ex: Paul";
          return false;
        }
      }
    
      // Fonctions de contrôle du champ Nom:
      function lastNameControl() {
        const nom = contact.lastName;
        let inputLastName = document.querySelector("#lastName");
        if (regExPrenomNomVille(nom)) {
          inputLastName.style.backgroundColor = "green";
    
          document.querySelector("#lastNameErrorMsg").textContent = "";
          return true;
        } else {
          inputLastName.style.backgroundColor = "#FF6F61";
    
          document.querySelector("#lastNameErrorMsg").textContent =
            "Champ Nom de formulaire invalide, ex: Durand";
          return false;
        }
      }
    
      // Fonctions de contrôle du champ Adresse:
      function addressControl() {
        const adresse = contact.address;
        let inputAddress = document.querySelector("#address");
        if (regExAdresse(adresse)) {
          inputAddress.style.backgroundColor = "green";
    
          document.querySelector("#addressErrorMsg").textContent = "";
          return true;
        } else {
          inputAddress.style.backgroundColor = "#FF6F61";
    
          document.querySelector("#addressErrorMsg").textContent =
            "Champ Adresse de formulaire invalide, ex: 50 rue de la paix";
          return false;
        }
      }
    
      // Fonctions de contrôle du champ Ville:
      function cityControl() {
        const ville = contact.city;
        let inputCity = document.querySelector("#city");
        if (regExPrenomNomVille(ville)) {
          inputCity.style.backgroundColor = "green";
    
          document.querySelector("#cityErrorMsg").textContent = "";
          return true;
        } else {
          inputCity.style.backgroundColor = "#FF6F61";
    
          document.querySelector("#cityErrorMsg").textContent =
            "Champ Ville de formulaire invalide, ex: Paris";
          return false;
        }
      }
    
      // Fonctions de contrôle du champ Email:
      function mailControl() {
        const courriel = contact.email;
        let inputMail = document.querySelector("#email");
        if (regExEmail(courriel)) {
          inputMail.style.backgroundColor = "green";
    
          document.querySelector("#emailErrorMsg").textContent = "";
          return true;
        } else {
          inputMail.style.backgroundColor = "#FF6F61";
    
          document.querySelector("#emailErrorMsg").textContent =
            "Champ Email de formulaire invalide, ex: example@contact.fr";
          return false;
        }
      }
    
      // Contrôle validité formulaire avant de l'envoyer dans le local storage
      if (
        firstNameControl() &&
        lastNameControl() &&
        addressControl() &&
        cityControl() &&
        mailControl()
      ) {
        // Enregistrer le formulaire dans le local storage
        localStorage.setItem("contact", JSON.stringify(contact));
    
        document.querySelector("#order").value =
          "Merci pour votre commande !";
        sendToServer();
      } else {
        error("Veuillez bien remplir le formulaire");
      }
    
      /* FIN GESTION DU FORMULAIRE */
    
      /* REQUÊTE DU SERVEUR ET POST DES DONNÉES */
      function sendToServer() {
        const sendToServer = fetch("http://localhost:3000/api/products/order", {
          method: "POST",
          body: JSON.stringify({ contact, products }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          // Récupération et stockage de la réponse de l'API (orderId)
          .then((response) => {
            return response.json();
          })
          .then((server) => {
            orderId = server.orderId;
            console.log(orderId);
          });
    
        // Si l'orderId a bien été récupéré, on redirige l'utilisateur vers la page de Confirmation
        if (orderId != "") {
          location.href = "confirmation.html?id=" + orderId;
        }
      }
    });
    
    /* FIN REQUÊTE DU SERVEUR ET POST DES DONNÉES */
    
    // Maintenir le contenu du localStorage dans le champs du formulaire
    
    let dataFormulaire = JSON.parse(localStorage.getItem("contact"));
    
    console.log(dataFormulaire);
    if (dataFormulaire) {
      document.querySelector("#firstName").value = dataFormulaire.firstName;
      document.querySelector("#lastName").value = dataFormulaire.lastName;
      document.querySelector("#address").value = dataFormulaire.address;
      document.querySelector("#city").value = dataFormulaire.city;
      document.querySelector("#email").value = dataFormulaire.email;
    } else {
      console.log("Le formulaire est vide");
    }
