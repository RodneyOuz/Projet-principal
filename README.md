# Projet PHP 
## 1. Lancer le projet
```bash
docker-compose up --build -d # Lance les conteneur php mysql et nginx
docker exec -i -t projetantonio_php_1 /bin/bash 
composer install # Installe les dépendences dans le conteneur
php artisan migrate --path=$APP_PATH # Create database
```
Ouvrir [localhost:3000](http://localhost:3000)

## 2. Infos pratique
Connexion à la db disponible sur:
- 127.0.0.1:3306
- user: lumen
- password: secret
- database: lumen

Créer un utilisateur administrateur:
- Créer un compte avec l'email root@localhost.com
- Ouvrir la database dans l'app de votre choix`
- Dans la table Users, changer le isAdmin de l'utilisateur de 0 à 1
