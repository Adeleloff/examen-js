// Classe ThemeSwitcher
class ThemeSwitcher {
    constructor() {
        this.body = document.querySelector('body');
        this.lightThemeBtn = document.getElementById('lightThemeBtn');
        this.darkThemeBtn = document.getElementById('darkThemeBtn');
        
        this.lightThemeBtn.addEventListener('click', () => this.setTheme('light'));
        this.darkThemeBtn.addEventListener('click', () => this.setTheme('dark'));
        
        this.initTheme();
    }

    setTheme(theme) {

        // Retirer l'ancien thème
        this.body.classList.remove('dark', 'light');
        
        // Ajouter le nouveau thème
        this.body.classList.add(theme);
        
        // Sauvegarder le thème dans le localStorage
        localStorage.setItem('theme', theme);
    }

    // Méthode pour initialiser le thème en fonction du localStorage
    initTheme() {
        // Récupérer le thème depuis le localStorage
        const savedTheme = localStorage.getItem('theme');
        
        // Si un thème est stocké, l'appliquer. Sinon, par défaut, c'est le thème sombre.
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            this.setTheme('dark');
        }
    }
}

// Attendre le chargement du DOM avant d'instancier la classe
document.addEventListener('DOMContentLoaded', () => {
    new ThemeSwitcher();
});