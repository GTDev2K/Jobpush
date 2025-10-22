# JobPush

JobPush est une application mobile qui facilite la recherche d’emploi, la gestion de candidatures et la découverte d’astuces pour optimiser son parcours professionnel.

---

## 💻 Dépôt Frontend (JobPush-FE)

### 🔧 Installation
bash
- git clone https://github.com/<votre-org>/JobPush-FE.git
- cd JobPush-FE
- npm install

### ⚙️ Configuration
Créer un fichier .env :
- EXPO_PUBLIC_BACKEND_URL="http://<IP_BACKEND>:3000"  
🔁 Remplacez <IP_BACKEND> par l’IP de votre machine pour les tests sur mobile.  
  
▶️ Lancement  
bash : npm start  
ou  
bash : expo start  
Scannez le QR Code avec Expo Go ou lancez un émulateur.

### ✨ Fonctionnalités principales
- Navigation ongletée : Accueil, Offres, Candidatures, Astuces, Compte
- Authentification, inscription, gestion du profil
- Recherche et filtrage d’offres
- Gestion des candidatures et favoris
- Articles & astuces par tags
- Notifications personnalisées

### 🧰 Stack technique 
- React Native (via Expo)
- React Navigation
- Redux Toolkit (état global)
- Expo Go

---
