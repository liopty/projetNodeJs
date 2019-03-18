const urlCodePostalTous = 'http://localhost:3000/api/installation/';
const urlActiviteCodePostal = 'http://localhost:3000/api/activite/code_postal/';
const urlActiviteNomCommune = 'http://localhost:3000/api/activite/nom_de_la_commune/';


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
            fetch(urlActiviteNomCommune+nomCommune).then((response) => {
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
            activitesLibelles: [],
            nomsUsuelsInstallations: [],
            nomsCommunes: [], // Afficher les noms des communes dans une liste de checkbox
            nomsCommuneChecked : [] // Noms Communes Selectionées
        }
    },

    // Fonction appelée une fois l'instance crée
    created() {
        notreModele.getInstallations()
            .then(() => this.codesPostaux = notreModele.getCodePostaux())
            .then(() => this.nomsCommunes = notreModele.getNomsCommunes());
    },

    methods: {
        codePostalChanged: function (e) {
            notreModele.selectCodePostal(this.codePostal).then(() => this.activitesLibelles = notreModele.getActivitesLibelles());
        },
        nomCommuneChanged : function(e) {
            this.nomsCommunesChecked.forEach(function (element) {
                console.log(element);
            });
            notreModele.selectNomsCommunes()
        },

        selectActivite: function (activiteLibelle) {
            this.nomsUsuelsInstallations = notreModele.getNomUsuelInstallationByActiviteLibelle(activiteLibelle);
        }
    }
});