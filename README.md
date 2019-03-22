# Projet de Technologies pour la Production d'Applications

Ce projet permet l'implémentation d'une API NodeJS REST en utilisant SQLite en tant que base de données.
Il est ecrit avec ECMASCRIPT6 et utilise des promesses.

## Installation :

1. Clone this repository : `git clone https://github.com/romwaldtff/NodeJS-REST-API-SQLite.git`  
2. Then install its dependencies : `npm install`

- Cloner ce repertoire
- Installer ses dépendences

## Fonctionnalités attendues
-   A partir d'un nom de commune afficher les libellés d'activités ainsi que les noms usuels des activités une fois que l'on clique dessus.
-   Cliquer sur un code postal et obtenir les libellés d'activités, puis les noms usuels des endroits ou l'on peut les pratiquer une fois que l'on clique sur l'activité.
-   A partir d'une activité afficher les lieux de pratique et modalités d'accès.
-

## Requirements :

- [Git](https://git-scm.com/) Pour cloner ce repertoire.
- [NodeJS](https://nodejs.org/en/) Dans sa derniere version.
- [Npm](https://www.npmjs.com/) Afin d'installer les dépendences.
- [Postman](https://www.getpostman.com/) Pour tester l'API.

## Getting started :

1. Installer l'application.
2. Commencer le serveur : `node index.js`
3. Lancer le site en tapant cette URL dans un navigateur: `http://localhost:3000`
4. Appliquer différents filtres.
Alternatively, you can use `node index.js YOUR_PORT_NUMBER` to start the server with a specific port.  

## Dependencies (installed via `npm install`)

- [Body-parser](https://www.npmjs.com/package/body-parser), a Node.js body parsing middleware.
- [Ejs](https://www.npmjs.com/package/ejs) embedded JavaScript templates.
- [Express](https://www.npmjs.com/package/express), a fast and minimalist web framework for node.
- [Sqlite](https://www.npmjs.com/package/sqlite), a wrapper library that adds ES6 promises and SQL-based migrations API to [sqlite3](https://www.npmjs.com/package/sqlite3)*.
- [Bluebird](https://www.npmjs.com/package/bluebird) promise library.

## Credits

- Made by [Romuald Tuffreau](https://github.com/romwaldtff).
- [Laurent Guerin](https://github.com/l-gu), creator of [Telosys Tools](https://sites.google.com/site/telosystools/).

## License

This project uses the [LGPL v3 License](https://www.gnu.org/licenses/lgpl-3.0.en.html) (See the LICENSE file in this repository).