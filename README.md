# YourCarYourWay

**Application web complète de gestion de location de véhicules**, construite avec une architecture full-stack moderne.

- **Frontend** : Angular
- **Backend** : Spring Boot (Java)
- **Base de données** : MySQL
- **Communication temps réel** : WebSocket (chat client ↔ agence)

Ce projet vise à offrir une **expérience utilisateur fluide**, une **architecture claire**, et une **sécurité conforme aux bonnes pratiques professionnelles**.

---

## Objectifs du projet

YourCarYourWay permet de :
- Gérer des sessions utilisateurs
- Échanger via un chat temps réel
- Structurer une application monolithique modulaire et propre

---

## Architecture globale

### Backend — Spring Boot

#### Structure principale :

```bash
com.yourcaryourway.chat_poc
├── config          → Configuration WebSocket
├── controller      → Endpoints REST & WebSocket
├── dto             → Objets de transfert
├── model           → Entités métier
├── repository      → Accès base de données
└── util            → Outils (ConversationKey)
```



#### Fonctionnalités :
- API REST (JSON)
- WebSocket STOMP pour le chat temps réel
- Persistance avec JPA / Hibernate
- Script SQL d’initialisation
- Configuration via `application.properties`

---

### Frontend — Angular

#### Organisation :
```bash
src/app
├── chat            → Interface de messagerie temps réel
├── login           → Authentification utilisateur
├── services        → Gestion de session + WebSocket
└── app.routes.ts   → Routing
```

#### Fonctionnalités :
- Interface responsive
- Gestion de session utilisateur
- Connexion WebSocket
- Affichage temps réel des messages

---

## Prérequis

### Outils nécessaires :
- **Java 17**
- **Node.js ≥ 18**
- **Angular CLI**
- **MySQL**
- **Maven**

  ## Installation

### 1. Cloner le dépôt
```bash
git clone https://github.com/tons-username/YourCarYourWay.git
cd YourCarYourWay
```

### 2. Configurer la base de données MySQL

Créez une base de données nommée yourcaryourway.
Importez le script SQL d’initialisation (disponible dans backend/src/main/resources/) :

```bash
mysql -u [votre_utilisateur] -p yourcaryourway < backend/src/main/resources/script.sql
```

### 3. Lancer le backend (Spring Boot)
```bash
cd back
mvn clean install
mvn spring-boot\:run
```

### 4. Lancer le frontend (Angular)
```bash
cd front
npm install
ng serve
```

Application acceccible à l'adresse : http://localhost:4200




