const urlCodePostalTous = 'http://localhost:3000/api/installation/';
const urlActivite = 'http://localhost:3000/api/activite/code_postal/';

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
     * Getter de l'installation
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
                }).catch(() => {
                this.installations = [];
                this.codePostalChoisi = null;
                reject(this.installations);
            });
        });
    }

    /**
     * Recupère les codes postes
     * @return {this}
     */
    getCodePostaux() {
        return [...new Set(this.installations.map(element => element.codePostal))].sort();
    }

    /**
     * Selection du codePostal
     * @param codePostal
     * @return {Promise<any>}
     */
    selectCodePostal(codePostal) {

        return new Promise((resolve, reject) => {
            fetch(urlActivite + codePostal).then((response) => {

                return response.json();
            })
                .then((data) => {

                    this.activites = data;
                    resolve(this.activites);
                }).catch(() => {
                console.log("reject");
                this.activites = [];
                this.activiteSelectionnee = null;
                reject(this.activites);
            });
        });
    }

    getActivitesLibelles() {
        //console.log(this.activites);
        return [...new Set(this.activites.map(function (element) {
            return element.activiteLibelle;
        }))].sort();
    }

    getNomUsuelInstallationByActiviteLibelle(activiteLibelle) {
        let installations = this.activites.filter(activite => activite.activiteLibelle === activiteLibelle).map(element => element.equipement.installation.nomUsuelDeLInstallation);
        installations = [...new Set(installations)].sort();
        return installations;
    }
}

const notreModele = new NotreModele();

//notreModele.selectCodePostal("44460").then(() => console.log(notreModele.getActivitesLibelles()));
const app = new Vue({
    el: '#app',
    data() {
        return {
            codePostal: '',
            codesPostaux: [],
            activitesLibelles: [],
            nomsUsuelsInstallations: [],
        }
    },

    created() {
        notreModele.getInstallations().then(() => this.codesPostaux = notreModele.getCodePostaux());
    },

    methods: {
        codePostalChanged: function (e) {

            notreModele.selectCodePostal(this.codePostal).then(() => this.activitesLibelles = notreModele.getActivitesLibelles());
        },
        selectActivite: function (activiteLibelle) {
            this.nomsUsuelsInstallations = notreModele.getNomUsuelInstallationByActiviteLibelle(activiteLibelle);
            console.log(this.nomsUsuelsInstallations);
        }
    }

});