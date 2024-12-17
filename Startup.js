alert('Bonjour');
const xhr = new XMLHttpRequest();
xhr.open("GET", 'https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records?limit=1&where=identifiant_de_l_etablissement="0693890D"');
xhr.send();
xhr.responseType = "json";

xhr.onload = () => {
  if (xhr.status === 200) {
    const data = xhr.response;
    console.log(data); // Vérifiez la structure des données dans la console

    // Vérifiez que les données existent et accédez au premier enregistrement
    const record = data.records[0];

    // Trouvez l'élément HTML où vous voulez afficher l'API
    const apiDisplay = document.getElementById('api-display');
    
    if (record) {
      // Formatez les données à afficher dans l'élément
      apiDisplay.textContent = `Nom de l'établissement : ${record.fields.nom_etablissement}, Adresse : ${record.fields.adresse_etablissement}`;
    } else {
      // Si aucun enregistrement n'est trouvé
      apiDisplay.textContent = 'Aucun enregistrement trouvé.';
    }
  } else {
    console.log(`Erreur: ${xhr.status}`);
  }
};
