# Projet de Technologies pour la Production d'Applications

Ce projet permet l'implémentation d'une API NodeJS REST en utilisant SQLite en tant que base de données.
Nous obtenons donc un site web avec lequel faire des requetes et recuperer des activités ainsi que les lieux de leur pratique a l'aide de filtres en utilisant l'API Serveur que l'on lui fournit
Il est ecrit avec ECMASCRIPT6 et utilise des promesses.

## Installation :

1. Cloner ce repertoire.
2. Installler ses dependences : `npm install`

## Exigences :

- [Git](https://git-scm.com/) Pour cloner ce repertoire.
- [NodeJS](https://nodejs.org/en/) Dans sa derniere version.
- [Npm](https://www.npmjs.com/) Afin d'installer les dépendences.
- [Postman](https://www.getpostman.com/) Pour tester l'API.

## Dependencies (installed via `npm install`)

- [Body-parser](https://www.npmjs.com/package/body-parser), un middleware pour parser les urls.
- [Ejs](https://www.npmjs.com/package/ejs) pour faire des templates javascript.
- [Express](https://www.npmjs.com/package/express), un framework web pour faire des routes.
- [Sqlite](https://www.npmjs.com/package/sqlite), une librairie wrapper qui ajoute des promesses ecmascript6 et une API de migration SQL a [sqlite3](https://www.npmjs.com/package/sqlite3).
- [Bluebird](https://www.npmjs.com/package/bluebird) une librairie de promesses.

## Structure des données
```
projetNodeJs
  ├── app
  |  ├── config
  |  |  └── dbconfig.js
  |  ├── controller
  |  |  ├── activiteController.js
  |  |  ├── common
  |  |  |  └── controllerCommon.js
  |  |  ├── equipementController.js
  |  |  └── installationController.js
  |  ├── dao
  |  |  ├── activiteDao.js
  |  |  ├── commons
  |  |  |  ├── daoCommon.js
  |  |  |  └── daoError.js
  |  |  ├── equipementDao.js
  |  |  └── installationDao.js
  |  ├── model
  |  |  ├── activite.js
  |  |  ├── equipement.js
  |  |  └── installation.js
  |  └── routes
  |     ├── api
  |     |  ├── activiteRoutes.js
  |     |  ├── equipementRoutes.js
  |     |  └── installationRoutes.js
  |     └── router.js
  ├── data
  |  ├── 234400034_004-009_activites-des-fiches-equipements-rpdl.csv
  |  ├── 234400034_004-010_fiches-installations-rpdl.csv
  |  └── 234400034_004-011_fiches-equipements-rpdl.csv
  ├── index.js
  ├── les_activites_dans_une_commune.db
  ├── Les_activites_dans_une_commune.iml
  ├── LICENSE
  ├── node_modules
  |  └── ...
  ├── package-lock.json
  ├── package.json
  ├── README.md
  ├── recherche
  ├── static
  |  ├── assets
  |  |  ├── css
  |  |  |  ├── exemple01.css
  |  |  |  ├── site_vuejs.css
  |  |  |  └── tuto.css
  |  |  ├── JavaScript
  |  |  |  ├── exemple00.js
  |  |  |  ├── index-site.js
  |  |  |  └── Utils.js
  |  |  └── vendor
  |  |     ├── axios
  |  |     |  └── axios.min.js
  |  |     ├── bootstrap
  |  |     |  ├── dist
  |  |     |  ├── js
  |  |     |  ├── LICENSE
  |  |     |  ├── package.json
  |  |     |  ├── README.md
  |  |     |  └── scss
  |  |     ├── jquery
  |  |     |  └── jquery.slim.js
  |  |     └── Vue.js
  |  |        ├── vue-router.js
  |  |        ├── vue.js
  |  |        └── vue.min.js
  |  ├── exemple00.html
  |  ├── exempleAxios.html
  |  ├── exempleRouter.html
  |  ├── exemple_accesseur.html
  |  ├── exemple_composant1.html
  |  ├── exemple_composant2.html
  |  ├── exemple_mutateur.html
  |  ├── exemple_v-bind.html
  |  ├── exemple_v-for.html
  |  ├── exemple_v-on.html
  |  ├── exemple_v-show.html
  |  └── index.html
  └── tree.txt
```


## Commencer :

1. Installer l'application.
2. Commencer le serveur : `node index.js`
3. Lancer le site en tapant cette URL dans un navigateur: `http://localhost:3000`
4. Appliquer différents filtres.


## Application Web

### Objectif
-   Utiliser l'API rest conçue du coté serveur

### Fonctionnalités attendues
-   A partir d'un nom de commune afficher les libellés d'activités ainsi que les noms usuels des activités une fois que l'on clique dessus.
-   Cliquer sur un code postal et obtenir les libellés d'activités, puis les noms usuels des endroits ou l'on peut les pratiquer une fois que l'on clique sur l'activité.
-   A partir d'une activité afficher les lieux de pratique et modalités d'accès.


## API 

## Credits

- Made by [Romuald Tuffreau](https://github.com/romwaldtff).
- [Laurent Guerin](https://github.com/l-gu), creator of [Telosys Tools](https://sites.google.com/site/telosystools/).
- Alper OZKAN
- Eliott ROBIN
## License

This project uses the [LGPL v3 License](https://www.gnu.org/licenses/lgpl-3.0.en.html) (See the LICENSE file in this repository).