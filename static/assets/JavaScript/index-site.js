const urlCodePostalTous = 'http://localhost:3000/api/installation/';
const urlActiviteCodePostal = 'http://localhost:3000/api/activite/code_postal/';
const urlActiviteNomCommune = 'http://localhost:3000/api/activite/nom_de_la_commune/';
const urlInstallationActiviteLibelle = 'http://localhost:3000/api/installation/activite_libelle/';


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
     * Recupère les codes postes
     */
    getCodePostaux() {
        return [...new Set(this.installations.map(element => element.codePostal))].sort();
    }

    /**
     * Selection du codePostal et affichage des activités disponibles dans ce code postal
     * TODO : FAIRE MARCHER CA POUR PLUSIEURS CODES POSTAUX EN MEME TEMPS
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
                }).catch(() => {
                this.activites = [];
                this.activiteSelectionnee = null;
                reject(this.activites);
            });
        });
    }

    getActivitesLibelles() {
        return [...new Set(this.activites.map(function (element) {
            return element.activiteLibelle;
        }))].sort();
    }

    getNomUsuelInstallationByActiviteLibelle(activiteLibelle) {
        let installations = this.activites.filter(activite => activite.activiteLibelle === activiteLibelle).map(element => element.equipement.installation.nomUsuelDeLInstallation);
        installations = [...new Set(installations)].sort();
        return installations;
    }

    /**
     * Getter des noms de communes.
     */
    getNomsCommunes() {
        return [...new Set(this.installations.map(element => element.nomDeLaCommune))].sort();
    }

    /**
     * On récupère toutes les activités qui sont disponibles dans une commune précise
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
                }).catch(() => {
                this.activites = [];
                this.activiteSelectionnee = null;
                reject(this.activites);
            });
        });
    }

    /**
     * Selection ActiviteLibelle et affichage noms usuels
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
                .then((data)=> {
                    this.nomsUsuels = data;
                    resolve(this.nomsUsuels);
                })
                .catch(() => {
                    this.nomsUsuels = [];
                    reject(this.nomsUsuels);
                });
        });
    }


    getNomsUsuels() {
        return [...new Set(this.nomsUsuels)].sort();
    }

}

const notreModele = new NotreModele();

//notreModele.selectCodePostal("44460").then(() => console.log(notreModele.getActivitesLibelles()));
const app = new Vue({
    el: '#app',
    data() {
        return {
            // Code postal
            codePostal: '',
            codesPostaux: [], // On remplit une liste des codes postaux stockés dans cet array
            codesPostauxChecked: [],
            activitesLibelles: [],

            nomsUsuelsInstallations: [],
            nomsCommunes: [], // Afficher les noms des communes dans une liste de checkbox
            nomsCommuneChecked: [] // Noms Communes Selectionées
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
         * Quand le code postal change
         */
        codePostalChanged: function (e) {
            notreModele.selectCodePostal(this.codePostal).then(() => this.activitesLibelles = notreModele.getActivitesLibelles());
        },
        /*
         * Quand le nom de commune change, on met a jour les activités libelles
         */
        nomCommuneChanged: function (e) {
            //console.log("CHANGE");
            let activitesLibellesSet = new Set();
            //console.log(this.nomsCommuneChecked);
            setTimeout(() => {
                this.nomsCommuneChecked.forEach((element) => {
                    notreModele.selectNomsCommunes(element)
                        .then(() => notreModele.getActivitesLibelles()
                            .forEach((element2) => {
                                activitesLibellesSet.add(element2);
                            }))
                        .then(() => this.activitesLibelles = Array.from(activitesLibellesSet))
                });
            }, 500);

        },
        selectActivite: function (activiteLibelle) {
            this.nomsUsuelsInstallations = [];

            this.nomsCommuneChecked.forEach((nomCommune) => {
                notreModele.selectActivitesLibelles(activiteLibelle, nomCommune)
                    .then(() => {
                        console.log(notreModele.getNomsUsuels());
                        this.nomsUsuelsInstallations.push(...notreModele.getNomsUsuels());
                    });
            })


        }
    }
});
