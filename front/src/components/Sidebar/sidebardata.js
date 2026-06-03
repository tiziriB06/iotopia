import dash from '../../img/Dashboard.png';
import quiz from '../../img/laeti.png';
import user from '../../img/Utilisateur.png';
import logo from '../../img/logo.png';
import crs from '../../img/cours.png';

export const Sidebardata = [
    {
        title: " ",
        icon: logo,
        link: "/", // Route par défaut
        className: "icon-logo", // Classe spécifique pour le logo
        titleClass: "title-logo" // Classe spécifique pour le titre du logo
    },
    {
        title: "Dashboard",
        icon: dash,
        link: "/Dashboard", // Route pour la page du tableau de bord
        className: "icon-dashboard",
        titleClass: "title-dashboard" // Classe spécifique pour le titre "Dashboard"
    },
    {
        title: "Utilisateurs",
        icon: user,
        link: "/Users", // Route pour la page des utilisateurs
        className: "icon-user",
        titleClass: "title-user" // Classe spécifique pour le titre "Utilisateurs"
    },
    {
        title: "Quiz",
        icon: quiz,
        link: "/", // Route pour la page des quiz
        className: "icon-quiz",
        titleClass: "title-quiz" // Classe spécifique pour le titre "Quiz"
    },

    {
        title: "Cours",
        icon: crs,
        link: "/Cours", // Route pour la page des paramètres
        className: "icon-cours",
        titleClass: "title-cours" // Classe spécifique pour le titre "Paramètres"
    },
];
