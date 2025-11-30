// .github/scripts/update_experience.js

const fs = require('fs');
const README_PATH = 'README.md';

// Data de Início da sua Experiência Profissional (Exemplo)
// SUBSTITUA ESTA DATA PELA SUA DATA REAL
const START_DATE = new Date('2022-04-15'); 

// Função para calcular anos e meses desde a data de início
function calculateExperience(startDate) {
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(diffDays / 365.25);
    const months = Math.floor((diffDays % 365.25) / 30.44); // Aproximação média
    
    return { years, months };
}

function updateReadme() {
    let readme = fs.readFileSync(README_PATH, 'utf8');
    const { years, months } = calculateExperience(START_DATE);

    // Formata a string de experiência (ex: 3.5+ years)
    const experienceText = `${years}.${months} years of practical experience`;
    
    // O padrão que a Action vai buscar e substituir no seu README.md
    // A regex busca o texto "X.X years of practical experience"
    const regex = /(\d+\.\d+\syears of practical experience)/;

    // Substitui o texto antigo pelo novo texto formatado
    if (readme.match(regex)) {
        const updatedReadme = readme.replace(regex, experienceText);
        fs.writeFileSync(README_PATH, updatedReadme);
        console.log(`README updated to: ${experienceText}`);
    } else {
        console.error('ERRO: Não encontrou o padrão de experiência no README para atualizar.');
    }
}

updateReadme();