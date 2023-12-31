// fonction pour faire apparaitre le texte dans header
setTimeout(function() {
    var titleElement = document.querySelector('.neon-title');
    titleElement.classList.add('visible');
}, 100);

// fonction pour réinitialiser les couleurs d'origine 
const tableauColors = document.querySelectorAll('.couleurSelect');
const tableauBgColor = Array.from(tableauColors).map((element) => element.style.backgroundColor);

function réinitialiserCouleurs(tabC, tabBgC) {
    for (i = 0; i < tabC.length; i++){
        tabC[i].style.backgroundColor = tabBgC[i];
    }
}

// fonction pour générer des couleurs et les stocker dans la case "couleurs à deviner"
const colorsRandom = ['red', 'green', 'blue', 'yellow', 'orange', 'pink', 'black', 'white'];

function genererCouleur() {
    var aTableauGenere = [];
    for (let i = 0; i < 4; i++) {
        let colorRandom = colorsRandom[Math.floor(Math.random() * colorsRandom.length)];
        while (aTableauGenere.includes(colorRandom)) {
            colorRandom = colorsRandom[Math.floor(Math.random() * colorsRandom.length)];
        }
        aTableauGenere.push(colorRandom);
    }
    return aTableauGenere;
}


// fonction pour afficher les couleurs générés dans le bloc 'couleurs à deviner'
function afficherColorRandom () {

    // Sélectionner les éléments de couleur par leur ID
    const couleur1Element = document.getElementById('couleur1');
    const couleur2Element = document.getElementById('couleur2');
    const couleur3Element = document.getElementById('couleur3');
    const couleur4Element = document.getElementById('couleur4');
    
    // Mettre à jour le contenu des éléments avec les couleurs générées
    couleur1Element.style.backgroundColor = tableauCouleurs[0];
    couleur2Element.style.backgroundColor = tableauCouleurs[1];
    couleur3Element.style.backgroundColor = tableauCouleurs[2];
    couleur4Element.style.backgroundColor = tableauCouleurs[3];
    
}

// variable qui stocke les couleurs à glisser
const couleurSelectElements = document.querySelectorAll('.couleurSelect');

// Ajouter les gestionnaires d'événements pour le glissement
couleurSelectElements.forEach((element) => {
    element.addEventListener('dragstart', dragStart);
    element.addEventListener('touchstart', touchStart);
});

// Gestionnaire d'événement pour le début du glissement (souris)
function dragStart(event) {
    const cloneElement = event.target.cloneNode(true);
    event.dataTransfer.setData('text/plain', cloneElement.id);
}

// Gestionnaire d'événement pour le début du glissement (tactile)
function touchStart(event) {
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    event.target.addEventListener('touchmove', touchMove);
    event.target.addEventListener('touchend', touchEnd);
}


// Ajouter le gestionnaire d'événement pour le dépôt (drop)
const couleurElements = document.querySelectorAll('#couleur .Nb');
couleurElements.forEach((element) => {
    element.addEventListener('dragover', allowDrop);
    element.addEventListener('drop', drop);
});

// Gestionnaire d'événement pour autoriser le dépôt (souris)
function allowDrop(event) {
    event.preventDefault();
}
// Gestionnaire d'événement pour autoriser le dépôt (tactile)
function touchMove(event) {
    event.preventDefault();
}

// fonction pour le dépôt (souris)
function drop(event) {
    event.preventDefault();
    const couleurId = event.dataTransfer.getData('text/plain');
    const couleurElement = document.getElementById(couleurId);
    const targetElement = event.target;

    if (targetElement.classList.contains('Nb') && targetElement.children.length === 0) {
        // Créer le clone de l'élément
        const cloneElement = couleurElement.cloneNode(true);
        targetElement.appendChild(cloneElement);
        const targetChildren = targetElement.children;
        //boucle pour rendre les couleurs séléctionnées non draggable et gris
        for (let i = 0; i < targetChildren.length; i++) {
            const clonedElement = targetChildren[i];
            clonedElement.draggable = false;
            clonedElement.style.cursor = 'default';
            couleurElement.draggable = false;
            couleurElement.style.cursor = 'default';
            couleurElement.style.background = 'gray'
        }
    }
}
// fonction pour le dépôt (tactile)
function touchEnd(event) {
    const couleurId = event.target.id;
    const couleurElement = document.getElementById(couleurId);
    const targetElement = document.elementFromPoint(
    event.changedTouches[0].clientX,
    event.changedTouches[0].clientY
    );

    if (targetElement.classList.contains('Nb') && targetElement.children.length === 0) {
        const cloneElement = couleurElement.cloneNode(true);
        targetElement.appendChild(cloneElement);
        const targetChildren = targetElement.children;

        for (let i = 0; i < targetChildren.length; i++) {
            const clonedElement = targetChildren[i];
            clonedElement.draggable = false;
            clonedElement.style.cursor = 'default';
            couleurElement.draggable = false;
            couleurElement.style.cursor = 'default';
            couleurElement.style.background = 'gray';
        }
    }

    event.target.removeEventListener('touchmove', touchMove);
    event.target.removeEventListener('touchend', touchEnd);
}

// Fonction pour diminuer le nombre d'essais et vérifier si perdu
let essais = document.getElementById('nombreEssai');
let nombreEssais = parseInt(essais.innerText);
let gagne = false

function diminuerEssais() {
    nombreEssais--;
    essais.innerText = nombreEssais.toString();

    if (nombreEssais === 0 && !gagne) {

        const boutonAnnuler = document.getElementById('reset')
        const blocCouleurSelect = document.getElementById('blocCouleurSelect');
        const blocEssai = document.querySelector('.blocEssai');
        const boutonValider = document.getElementById('valider')
        const ajoutInfo = document.getElementById('info')
        const SubRes = document.getElementById('blocSubRes')
        const perdu = document.getElementById('perdu')
        const recommencer = document.getElementById('blocRecommencer')
        const devine = document.getElementById('flexResultat')
        SubRes.classList.add('cacheCache')
        recommencer.classList.remove('cacheCache')
        blocCouleurSelect.classList.add('cacheCache');
        blocEssai.classList.add('cacheCache');
        boutonAnnuler.classList.add('cacheCache')
        boutonValider.style.backgroundColor = 'rgb(79, 199, 75)'
        ajoutInfo.style.textAlign = 'center'
        ajoutInfo.style.justifyContent = 'center'
        ajoutInfo.style.transition = '0.7s'
        perdu.classList.remove('cacheCache')
        ajoutInfo.style.backgroundColor = 'hsl(0, 70%, 79%)'
        devine.classList.remove('cacheCache')

        afficherColorRandom();

        recommencer.addEventListener('click', function(){

            location.reload()
        })
        return true
    }
}

// fonction pour comparer les couleurs, indiquer si gagner et afficher dans indice
function verifierCouleur(random, select) {
    const indice1Element = document.getElementById('indice1');
    const indice2Element = document.getElementById('indice2');
    const indice3Element = document.getElementById('indice3');
    const indice4Element = document.getElementById('indice4');

    // Réinitialiser les couleurs des balises d'indice
    indice1Element.style.backgroundColor = '';
    indice2Element.style.backgroundColor = '';
    indice3Element.style.backgroundColor = '';
    indice4Element.style.backgroundColor = '';

    for (let i = 0; i < random.length; i++) {
        if (random[i] === select[i]) {
            // Correspondance de couleur et d'index : arrière-plan rouge
            if (indice1Element.style.backgroundColor == '') {
                indice1Element.style.backgroundColor = 'red';
        } else if (indice2Element.style.backgroundColor == '') {
                indice2Element.style.backgroundColor = 'red';
        } else if (indice3Element.style.backgroundColor == '') {
                indice3Element.style.backgroundColor = 'red';
        } else if (indice4Element.style.backgroundColor == '') {
                indice4Element.style.backgroundColor = 'red';
            }
        }
    }
    for (let i = 0; i < random.length; i++) {
        if (random.includes(select[i]) && random[i] !== select[i]) {
            // Correspondance de couleur mais pas au même index : arrière-plan blanc
            
            if (indice1Element.style.backgroundColor == '') {
                    indice1Element.style.backgroundColor = 'white';
            } else if (indice2Element.style.backgroundColor == '') {
                    indice2Element.style.backgroundColor = 'white';
            } else if (indice3Element.style.backgroundColor == '') {
                    indice3Element.style.backgroundColor = 'white';
            } else if (indice4Element.style.backgroundColor == '') {
                    indice4Element.style.backgroundColor = 'white';
                }
        }
    }
    // structure conditionnelle pour vérifier si l'utilisateur a gagné
    if (random.every((element, index) => element === select[index])) {
        const daboulouYesYesYes = document.getElementById('logoT')
        const minions = document.getElementById('minions')
        const boutonAnnuler = document.getElementById('reset')
        const blocCouleurSelect = document.getElementById('blocCouleurSelect');
        const blocEssai = document.querySelector('.blocEssai');
        const boutonValider = document.getElementById('valider')
        const ajoutInfo = document.querySelector('#info')
        const SubRes = document.getElementById('blocSubRes')
        const recommencer = document.getElementById('blocRecommencer')
        const devine = document.getElementById('flexResultat')
        const jeu = document.getElementById('jeu')
        jeu.style.transition = '0.7s'
        devine.classList.remove('cacheCache')
        SubRes.classList.add('cacheCache')
        recommencer.classList.remove('cacheCache')
        blocCouleurSelect.classList.add('cacheCache');
        blocEssai.classList.add('cacheCache');
        boutonAnnuler.classList.add('cacheCache')
        boutonValider.style.backgroundColor = 'rgb(147, 147, 147)'
        ajoutInfo.style.removeProperty('justify-content');
        ajoutInfo.style.textAlign = 'center'
        ajoutInfo.style.transition = '0.7s'

        // affichage d'un png différent selon la largeur de l'affichage
        if (window.innerWidth > 900) {
            daboulouYesYesYes.classList.remove('cacheCache')
        } else {
            minions.classList.remove('cacheCache')
        }

        afficherColorRandom();

        recommencer.addEventListener('click', function(){
            location.reload()
        })

        return true
    }
}

//écouteur d'evenement pour afficher les élément du jeu au démarrage
let tableauCouleurs;
const commencer = document.getElementById('submit');
commencer.addEventListener('click', function() {

    //réaffichage des couleurs et des essais
    const boutonAnnuler = document.getElementById('reset')
    const blocCouleurSelect = document.getElementById('blocCouleurSelect');
    const blocEssai = document.querySelector('.blocEssai');
    const boutonCommencer = document.getElementById('submit')
    const boutonValider = document.getElementById('valider')
    const blocInfo = document.querySelector('#info')
    const video = document.querySelector('#blocCommentJouer')

    video.style.display = 'none'
    blocInfo.style.justifyContent = 'space-between'
    blocCouleurSelect.classList.remove('cacheCache');
    blocEssai.classList.remove('cacheCache');
    boutonAnnuler.classList.remove('cacheCache')
    boutonCommencer.classList.add('cacheCache')
    boutonValider.style.backgroundColor = 'rgb(79, 199, 75)'

    //génération des couleurs 
    tableauCouleurs = genererCouleur();
    console.log(tableauCouleurs);

});

//fonction pour signaler si 4 couleurs ne sont pas sélectionnées
let iteration = 0;
function repeatColorChange() {

    const divsVides = document.querySelectorAll('#couleur .Nb:empty');
    const delay = 150;

    divsVides.forEach((divVide) => {
        divVide.style.transition = '0.15s';
        divVide.style.backgroundColor = 'red';
        divVide.textContent = '!';
    });

    setTimeout(() => {
        divsVides.forEach((divVide) => {
        divVide.style.backgroundColor = '';
        divVide.textContent = '';
        });

        iteration++;
        if (iteration < 4) {
        setTimeout(repeatColorChange, delay);
        }
    }, delay);
}

//écouteur d'évenement pour annuler les couleurs séléctionnées 
const annuler = document.getElementById('reset')
annuler.addEventListener('click', function(){

    // rendre à nouveau les couleurs séléctionnées draggable 
    let couleurElement = document.querySelectorAll('.couleurSelect')
    couleurElement.forEach((element) => {
        element.draggable = true
        element.style.cursor ='pointer'
    })
    
    réinitialiserCouleurs(tableauColors,tableauBgColor);

    // supprimer les couleurs séléctionnées
    const jeuElement = document.getElementById('blocCouleur');
    const couleurElements = jeuElement.querySelectorAll('#couleur .Nb');

    couleurElements.forEach((element) => {
        if (element.children.length > 0) {
            element.removeChild(element.children[0]);
        }
    });
})

//écouteur d'évenement pour lancer une fonction après validation des couleurs par l'utilisateur
const boutonValider = document.getElementById('valider');

boutonValider.addEventListener('click', function() {

    colorsSelected = [];

    function validerSelection() {
        const blocCouleurElement = document.getElementById('blocCouleur');
        const couleurElements = blocCouleurElement.querySelectorAll('#couleur .Nb');
        let couleurSelectionnees = [];
    
        // Réinitialiser le tableau couleurSelectionnees
        couleurSelectionnees.length = 0;
    
        couleurElements.forEach((element) => {
        // Vérifier si l'élément est dans le bloc d'origine et non dans le nouveau bloc cloné
        if (!element.closest('.nouveauxBlocs')) {
            // Vérifier si un élément est présent dans la case
            if (element.children.length > 0) {
            const couleurId = element.children[0].id;
            couleurSelectionnees.push(couleurId);
            }
        }
        });
    
        return couleurSelectionnees;
    }
    
    

    var colorsSelected = validerSelection();

    if (colorsSelected.length < 4) {

        repeatColorChange();    
        iteration = 0
        return;
    }
    
    gagne =  verifierCouleur(tableauCouleurs, colorsSelected);

    let lost = diminuerEssais();

    // Cloner le bloc de jeu
    const jeuElement = document.getElementById('blocCouleur');
    const nouveauBlocJeu = jeuElement.cloneNode(true);

    const showIndice = nouveauBlocJeu.querySelector('#indice')
    showIndice.classList.remove('hidden')

    // Supprimer le bouton "valider" du nouveau bloc
    const validerButton = nouveauBlocJeu.querySelector('#valider');
    validerButton.remove();


    // répartition des blocs couleurs dans le nouveau bloc 
    const couleur = nouveauBlocJeu.querySelector('#couleur')
    couleur.style.flex = '1';

    // modification des bordures du bloc indice du nouveau bloc
    const indice = nouveauBlocJeu.querySelector('#indice')
    indice.style.borderRadius = '0 25px 25px 0';

    // Réinitialiser les couleurs des balises d'indice dans le bloc
    const indice1Element = jeuElement.querySelector('#indice1');
    const indice2Element = jeuElement.querySelector('#indice2');
    const indice3Element = jeuElement.querySelector('#indice3');
    const indice4Element = jeuElement.querySelector('#indice4');
    indice1Element.style.backgroundColor = '';
    indice2Element.style.backgroundColor = '';
    indice3Element.style.backgroundColor = '';
    indice4Element.style.backgroundColor = '';

    // Réinitialiser les couleurs sélectionnées dans le bloc
    const couleurElements = jeuElement.querySelectorAll('#couleur .Nb');
    couleurElements.forEach((element) => {
        if (element.children.length > 0) {
            element.removeChild(element.children[0]);
        }
    });

    const divNouveauxBlocs = document.getElementById('nouveauxBlocs')
    // Ajouter le nouveau bloc de jeu à la section du jeu
    divNouveauxBlocs.appendChild(nouveauBlocJeu);

    réinitialiserCouleurs(tableauColors, tableauBgColor)

    let couleurElement = document.querySelectorAll('.couleurSelect')
    couleurElement.forEach((element) => {
        element.draggable = true
        element.style.cursor ='pointer'
    })

    // cacher le blocCouleur si gagné ou perdu
    if (gagne || lost) {
        const blocDrop = document.querySelector('#jeu .blocCouleur')
        blocDrop.classList.add('cacheCache')
    }

});


