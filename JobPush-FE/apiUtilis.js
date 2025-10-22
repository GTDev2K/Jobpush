const callOffresApi = async (
  tokenManager,
  KeyWord,
  Sector,
  contractType,
  region,
  commune
) => {
  try {
    // on envoie la donnée ou null sinon le undifined va faire casser l'url
    KeyWord = KeyWord || "";
    Sector = Sector || "";
    contractType = contractType || "";
    region = region || "";
    commune = commune || "";

    let url = `https://api.pole-emploi.io/partenaire/offresdemploi/v2/offres/search?motsCles=${KeyWord}&grandDomaine=${Sector}&region=${region}&commune=${commune}&range=0-9`;

    //on verifie si c'est un CDD ou CDI sinon on renvoie la valeur pour les alternances
    if (contractType === "CDD" || contractType === "CDI") {
      url += `&typeContrat=${contractType}`;
    } else {
      url += `&natureContrat=E2&typeContrat=CDD`;
    }

    const token = await tokenManager.getToken();

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Erreur API :", error.message);
    throw error;
  }
};

async function reverseGeocode(latitude, longitude) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "YourAppName/1.0 (your@email.com)", // important avec Nominatim
      },
    });

    const data = await response.json();

    const address = data.address || {};
    return {
      streetNumber: address.house_number || " ",
      streetName: address.road || "",
      city: address.city || address.town || address.village || "",
      zipCode: address.postcode || "",
    };
  } catch (e) {
    console.error("errror in georeverse", e.message);
  }
}
// on join les mots recu par la fonction par une virgule pour que l'api recoit bien tout les mots
function fusionWord(str) {
  if (!str) return "";

  return str?.trim().split(/\s+/).join(",");
}

module.exports = {
  callOffresApi,
  reverseGeocode,
  fusionWord,
};
