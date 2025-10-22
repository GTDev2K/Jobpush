// Déclaration de la classe TokenManager
export class TokenManager {
  // Le constructeur initialise l'instance avec un clientId et un clientSecret
  constructor(clientId, clientSecret) {
    this.clientId = clientId; // Identifiant client OAuth
    this.clientSecret = clientSecret; // Secret client OAuth
    this.token = null; // Stockage du token d'accès (sera récupéré via l'API)
    this.expiry = null; // Date d'expiration du token en millisecondes (timestamp)
  }

  // Méthode pour récupérer un nouveau token depuis l'API de Pôle Emploi
  async fetchToken() {
    const url =
      "https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=/partenaire";
    // URL de l'endpoint d'authentification OAuth 2.0 de Pôle Emploi

    const headers = {
      // Authentification en base64 du clientId et clientSecret
      Authorization: "Basic " + btoa(`${this.clientId}:${this.clientSecret}`),
      "Content-Type": "application/x-www-form-urlencoded", // Type de contenu attendu par l'API
    };

    // Corps de la requête : on demande un token via le flux client_credentials, avec des scopes spécifiques
    const body =
      "grant_type=client_credentials&scope=api_offresdemploiv2 o2dsoffre";

    // Envoi de la requête POST à l'API
    const res = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    // Si la réponse n'est pas correcte (status HTTP non-200), on lève une erreur avec le message de la réponse
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Erreur récupération token: ${text}`);
    }

    const data = await res.json();

    // On enregistre le token d'accès
    this.token = data.access_token;

    // On calcule l'heure d'expiration : durée de vie en secondes, moins 60s (par sécurité), convertie en ms
    this.expiry = Date.now() + (data.expires_in - 60) * 1000;

    // On retourne le token
    return this.token;
  }

  // Méthode pour obtenir le token : on renvoie le token actuel s'il est encore valide, sinon on en récupère un nouveau
  async getToken() {
    if (this.token && Date.now() < this.expiry) {
      // Si on a déjà un token et qu'il n'est pas expiré, on le renvoie
      return this.token;
    }
    // Sinon, on en demande un nouveau
    return await this.fetchToken();
  }
}
