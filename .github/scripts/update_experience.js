// .github/scripts/update_experience.js

const fs = require('fs');
const README_PATH = 'README.md';

// Data de Início da sua Experiência Profissional (Exemplo)
// SUBSTITUA ESTA DATA PELA SUA DATA REAL
const START_DATE = new Date('2022-04-15'); 

// Função para calcular anos, meses e dias desde a data de início
function calculateExperience(startDate) {
    const now = new Date();
    
    // Calcula a diferença em componentes de data
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    
    // Ajusta se os dias forem negativos
    if (days < 0) {
        months--;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    // Ajusta se os meses forem negativos
    if (months < 0) {
        years--;
        months += 12;
    }
    
    return { years, months, days };
}

function updateReadme() {
    let readme = fs.readFileSync(README_PATH, 'utf8');
    const { years, months, days } = calculateExperience(START_DATE);

    // Formata a string de experiência (ex: 3 years, 6 months and 15 days)
    let experienceText = `${years} year${years !== 1 ? 's' : ''}`;
    if (months > 0 || days > 0) {
        experienceText += `, ${months} month${months !== 1 ? 's' : ''}`;
    }
    if (days > 0) {
        experienceText += ` and ${days} day${days !== 1 ? 's' : ''}`;
    }
    experienceText += ' of practical experience';
    
    // O padrão que a Action vai buscar e substituir no seu README.md
    // A regex busca o padrão "X year(s), Y month(s) and Z day(s) of practical experience"
    const regex = /(\d+\s+years?(,\s+\d+\s+months?)(\s+and\s+\d+\s+days?)?\s+of\s+practical\s+experience)/;

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