alert('Bonjour');
const xhr = new XMLHttpRequest();
xhr.open("GET", 'https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records?limit=1&where=identifiant_de_l_etablissement="0693890D"');
xhr.send();
xhr.responseType = "json";

xhr.onload = () => {
  if (xhr.status === 200) {
    const data = xhr.response;
    console.log("data", data); 
    const record = data.results[0];

    console.log(record)

    const apiDisplay = document.getElementById('api-display');

    
    if (record) {
      apiDisplay.textContent = `Nom de l'établissement : ${record.fields.nom_etablissement}, Adresse : ${record.fields.adresse_etablissement}`;
    } else {
      apiDisplay.textContent = 'Aucun enregistrement trouvé.';
    }
  } else {
    console.log(`Erreur: ${xhr.status}`);
  }
};
