// Récupération des articles de l'API
async function getArticles() {
  var articlesCatch = await fetch("http://localhost:3000/api/products");
  return await articlesCatch.json();
}

// Répartition des données de l'API dans le DOM
async function fillSection() {
  var result = await getArticles()
    .then(function (resultAPI) {
      const articles = resultAPI;
      console.table(articles);
      for (let article in articles) {
        // a
        let productLink = document.createElement("a");
        document.querySelector(".items").appendChild(productLink);
        productLink.href = `product.html?id=${resultAPI[article]._id}`;

        // article
        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);

        // img
        let productImg = document.createElement("img");
        productArticle.appendChild(productImg);
        productImg.src = resultAPI[article].imageUrl;
        productImg.alt = resultAPI[article].altTxt;

        // h3
        let productName = document.createElement("h3");
        productArticle.appendChild(productName);
        productName.classList.add("productName");
        productName.innerHTML = resultAPI[article].name;

        // p
        let productDescription = document.createElement("p");
        productArticle.appendChild(productDescription);
        productDescription.classList.add("productName");
        productDescription.innerHTML = resultAPI[article].description;
      }
    })
    .catch(function (error) {
      return error;
    });
}
fillSection();
