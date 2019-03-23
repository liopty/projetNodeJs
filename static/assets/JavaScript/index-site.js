"use strict";

// Urls utilisés pour interagir avec le service restfull
const urlCodePostalTous = 'http://localhost:3000/api/installation/';
const urlActiviteToutes = 'http://localhost:3000/api/activite/';
const urlActiviteCodePostal = 'http://localhost:3000/api/activite/code_postal/';
const urlActiviteNomCommune = 'http://localhost:3000/api/activite/nom_de_la_commune/';
const urlInstallationActiviteLibelle = 'http://localhost:3000/api/installation/activite_libelle/';
const urlActiviteActiLib = 'http://localhost:3000/api/activite/activite_libelle/';


/**
 * Enumeration indiquant le type de requete a faire.
 * Nous nous en servons pour recuperer les noms usuels des endroits ou l'on pratique les activités de différentes façons :
 * -    si l'on demande des activités par rappport au code postal
 * -    si on les demande par rapport au nom de la commune
 * @type {{NOM_COMMUNE: string, CODE_POSTAL: string}}
 */
const typeRequeteEnum = {
    CODE_POSTAL: "code postal",
    NOM_COMMUNE: "nom commune"
};


class NotreModele {
    /**
     * Constructeur de notre modele.
     * On cree des tableaux pour nos tables dans la bd.
     */
    constructor() {
        // Listes pour les tables
        this.installations = [];
        this.equipement = [];
        this.activites = [];

        this.codePostalChoisi = null; // On va stocker le code postal choisi dans une variable
        this.nomsUsuels = []; // Les noms usuels des locations ou se trouvent les activités
    }

    /**
     * Getter des installations
     * @return {Promise<any>}
     */
    getInstallations() {
        return new Promise((resolve, reject) => {
            fetch(urlCodePostalTous).then((response) => {
                return response.json(); // On transforme le résultat en format JSON
            })
                .then((data) => {
                    this.installations = data; // On remplit installations par les données récupérée
                    resolve(this.installations)
                })
                .catch(() => {
                    this.installations = [];
                    this.codePostalChoisi = null;
                    reject(this.installations);
                });
        });
    }

    /**
     * Affiche les codes postaux dans la vue
     */
    getCodePostaux() {
        return [...new Set(this.installations.map(element => element.codePostal))].sort();
    }

    /**
     * Recuperation des activités selon un code postal précis
     * @param codePostal
     * @return {Promise<any>}
     */
    selectCodePostal(codePostal) {
        return new Promise((resolve, reject) => {
            fetch(urlActiviteCodePostal + codePostal).then((response) => {
                return response.json();
            })
                .then((data) => {
                    this.activites = data;
                    resolve(this.activites);
                })
                .catch(() => {
                    this.activites = [];
                    this.activiteSelectionnee = null;
                    reject(this.activites);
                });
        });
    }


    /**
     * Recuperation des libelles d'activités
     */
    getActivitesLibelles() {
        return [...new Set(this.activites.map(function (element) {
            return element.activiteLibelle;
        }))].sort();
    }

    /**
     * Recuperation des noms usuels par le libellé des activités.
     * @param activiteLibelle
     * @return {any[]}
     */
    getNomUsuelInstallationByActiviteLibelle(activiteLibelle) {
        let installations = this.activites.filter(activite => activite.activiteLibelle === activiteLibelle).map(element => element.equipement.installation.nomUsuelDeLInstallation);
        installations = [...new Set(installations)].sort();
        return installations;
    }

    /**
     * Recupere les noms de commune
     */
    getNomsCommunes() {
        return [...new Set(this.installations.map(element => element.nomDeLaCommune))].sort();
    }

    /**
     * Recupere les activites praticables depuis une commune.
     * @param nomCommune Nom de la commune ou on fait la requete.
     */
    selectNomsCommunes(nomCommune) {
        return new Promise((resolve, reject) => {
            fetch(urlActiviteNomCommune + nomCommune).then((response) => {
                return response.json();
            })
                .then((data) => {
                    this.activites = data;
                    resolve(this.activites);
                })
                .catch(() => {
                    this.activites = [];
                    this.activiteSelectionnee = null;
                    reject(this.activites);
                });
        });
    }

    /**
     * Recuperation des noms usuels selon un libelle d'activite et un nom de commune.
     * Crée pour faire usage de req.query qui est pas mal si il y a des slash dans des parametres.
     * Mais sinon utiliser getNomUsuelInstallationByActiviteLibelle qui est très bien aussi.
     * @param activiteLibelle
     * @param nomCommune
     * @return {Promise<any>}
     */
    selectActivitesLibelles(activiteLibelle, nomCommune) {
        return new Promise((resolve, reject) => {
            fetch(urlInstallationActiviteLibelle + "?activite_libelle=" + activiteLibelle + "&nom_commune=" + nomCommune)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.nomsUsuels = data;
                    resolve(this.nomsUsuels);
                })
                .catch(() => {
                    this.nomsUsuels = [];
                    reject(this.nomsUsuels);
                });
        });
    }

    /**
     * Retourne les noms usuels
     */
    getNomsUsuels() {
        return [...new Set(this.nomsUsuels)].sort();
    }

    getActivite(){
        return new Promise((resolve, reject) => {
            fetch(urlActiviteToutes).then((response) => {
                return response.json(); // On transforme le résultat en format JSON
            })
                .then((data) => {
                    this.activites = data; // On remplit activites par les données récupérée
                    resolve(this.activites)
                })
                .catch(() => {
                    this.activites = [];
                    reject(this.activites);
                });
        });
    }

    getNomsCommunesByNomInstall(install){
        let communes = this.activites.filter(activite => activite.equipement.installation.nomUsuelDeLInstallation === install).map(element => element.equipement.installation.nomDeLaCommune);
        communes = [...new Set(communes)].sort();
        return communes;
    }
  getActivitebyActivLib(actiLib) {

        return new Promise((resolve, reject) => {
            fetch(urlActiviteActiLib + "?activite_libelle=" + actiLib).then((response) => {

                return response.json();
            })
                .then((data) => {
                    this.activites = data;
                    resolve(this.activites);
                })
                .catch(() => {
                    this.activites = [];
                    this.activiteSelectionnee = null;
                    reject(this.activites);
                });
        });
    }
}

const notreModele = new NotreModele();

//notreModele.selectCodePostal("44460").then(() => console.log(notreModele.getActivitesLibelles()));
const app = new Vue({
    el: '.app',
    data() {
        return {
            // Code postal
            codePostal: '',
            codesPostaux: [], // On remplit une liste des codes postaux stockés dans cet array
            codesPostauxChecked: [],
            activitesLibelles: [],

            nomsUsuelsInstallations: [],
            nomsCommunes: [], // Afficher les noms des communes dans une liste de checkbox
            nomsCommuneChecked: [], // Noms Communes Selectionées

            typeRequete: ''
        }
    },

    // Fonction appelée une fois l'instance crée
    created() {
        notreModele.getInstallations()
            .then(() => this.codesPostaux = notreModele.getCodePostaux())
            .then(() => this.nomsCommunes = notreModele.getNomsCommunes());
    },

    methods: {
        /*
         * Quand le code postal change, nous modifions les libelles d'activités
         */
        codePostalChanged: function (e) {
            this.activitesLibelles = []; // On vide l'array pour que les activités s'enlèvent quand on décoche
            this.nomsCommuneChecked = []; // On vide les noms de communes cochées
            this.nomsUsuelsInstallations = []; // On vide les noms usuels
            this.typeRequete = typeRequeteEnum.CODE_POSTAL; // Nous faisons une requete de type code postal

            let activitesLibellesSet = new Set();
            setTimeout(() => {
                this.codesPostauxChecked.forEach((codePostal) => {
                    notreModele.selectCodePostal(codePostal)
                        .then(() => notreModele.getActivitesLibelles()
                            .forEach((activite) => {
                                activitesLibellesSet.add(activite);
                            }))
                        .then(() => this.activitesLibelles = activitesLibellesSet);
                })
            }, 10);

        },

        /*
         * Quand le nom de commune change, on met a jour les activités libelles
         */
        nomCommuneChanged: function (e) {
            // Configuration
            this.activitesLibelles = []; // On vide l'array pour que les activités s'enlèvent quand on décoche
            this.codesPostauxChecked = []; // On decoche les codes postaux
            this.nomsUsuelsInstallations = []; // On vide les noms usuels
            this.typeRequete = typeRequeteEnum.NOM_COMMUNE; // Nous faisons une requete de type nom commune

            let activitesLibellesSet = new Set();
            setTimeout(() => {
                this.nomsCommuneChecked.forEach((element) => {
                    notreModele.selectNomsCommunes(element)
                        .then(() => notreModele.getActivitesLibelles()
                            .forEach((element2) => {
                                activitesLibellesSet.add(element2);
                            }))
                        .then(() => this.activitesLibelles = Array.from(activitesLibellesSet))
                });
            }, 10);

        },

        /*
         * Si l'on choisit une activité les noms usuels des endroits ou l'on peut les pratiquer s'affichent.
         */
        selectActivite: function (activiteLibelle) {
            this.nomsUsuelsInstallations = []; // On vide les noms usuels
            // Routage des types de requetes
            if (this.typeRequete === typeRequeteEnum.CODE_POSTAL) {
                //this.nomsUsuelsInstallations = notreModele.getNomUsuelInstallationByActiviteLibelle(activiteLibelle);
                this.codesPostauxChecked.forEach((codePostal) => {
                    notreModele.selectCodePostal(codePostal)
                        .then(() => {
                            this.nomsUsuelsInstallations.push(...notreModele.getNomUsuelInstallationByActiviteLibelle(activiteLibelle));
                        });
                });
            } else if (this.typeRequete === typeRequeteEnum.NOM_COMMUNE) {
                this.nomsCommuneChecked.forEach((nomCommune) => {
                    notreModele.selectActivitesLibelles(activiteLibelle, nomCommune) // On pourrait utiliser getNomUsuelInstallationByActiviteLibelle(activiteLibelle) mais nous voulions tester les req.query
                        .then(() => {
                            this.nomsUsuelsInstallations.push(...notreModele.getNomsUsuels());
                        });
                })
            } else {
                console.log("ERREUR", "Pas de type de requete enum", "Dans index-site.js, app -> methods -> selectActivite")
            }
        }
    }
});

const app2 = new Vue({
    el: '.app2',
    data() {
        return {
            activites: [],
            activitesLibelles: [],
            nomsUsuelsInstallations: [],
            nomsCommunes: [],
            activitesLibellesChecked: []
        }
    },

    // Fonction appelée une fois l'instance crée
    created() {
        notreModele.getActivite()
            .then(() => this.activitesLibelles = notreModele.getActivitesLibelles())

    },

    methods: {
        /*
        * Si une case est cochée ou décochée, on ajoute ou retire l'activité du tableau des case cochées
        */
        activiteLibelleChanged: function () {
            this.nomsUsuelsInstallations = [];
            this.nomsCommunes = []; // On vide les noms usuels
            let nomsUsuelsInstallationsSet = new Set();

                setTimeout(() => {
                    this.activitesLibellesChecked.forEach((activiteLibelle) => {
                        notreModele.getActivitebyActivLib(activiteLibelle)
                            .then(() => notreModele.getNomUsuelInstallationByActiviteLibelle(activiteLibelle)
                                .forEach((installation) => {
                                    nomsUsuelsInstallationsSet.add(installation);
                                }))
                            .then(() => this.nomsUsuelsInstallations = Array.from(nomsUsuelsInstallationsSet));
                    })
                }, 10);


        },

        selectInstall: function(nomInstallation) {
            this.nomsCommunes = []; // On vide les noms usuels
            let nomsCommunessSet = new Set();
            this.activitesLibellesChecked.forEach((actiLib) => {
                notreModele.getActivitebyActivLib(actiLib)
                    .then(() => {
                        nomsCommunessSet.add(...notreModele.getNomsCommunesByNomInstall(nomInstallation));
                    })
                    .then(()=> {
                        this.nomsCommunes = Array.from(nomsCommunessSet);
                    });
            });

        },


    }
});
