//  https://superheroapi.com/api/access-token/character-id 

const BASE_URL = "https://superheroapi.com/api.php/3355326938120861";
const heroImageDiv = document.getElementById("HeroImage");
const getRandomSuperHero = (id) => {
    fetch(`${BASE_URL}/${id}`)
        .then(response => response.json())
        .then(json => {
            console.log(json.powerstats);
            const superHero = json;
            showInfo(superHero);
        }
    )
}

// const intelligence = `<p> 🧠 intelligence : ${json.powerstats.intelligence} </p>`
// const strength = `<p> 💪🏻 strength : ${json.powerstats.strength} </p>`
// const speed = `<p> ⚡ speed : ${json.powerstats.speed} </p>`
// const durability = `<p> 🏋🏻‍♂️ durability : ${json.powerstats.durability} </p>`
// const power = `<p> 🔥 power : ${json.powerstats.power} </p>`
// const combat = `<p> 💣 combat : ${json.powerstats.combat} </p>`

const stateToEmoji = {
    intelligence :'🧠',
    strength : '💪🏻',
    speed : '⚡',
    durability : '🏋🏻‍♂️',
    power : '🔥',
    combat : '💣'

}

const getPowerStatHTML = (character) => {
    const stats = Object.keys(character.powerstats).map(stat =>{
        return `<p> ${stateToEmoji[stat]}${stat.toUpperCase()} : ${character.powerstats[stat]}</p>`
    })
    return `<h3> Power Stats </h3>` +  stats.join('');
}

const getAppearanceHTML = (character) => {
    const stats = Object.keys(character.appearance).map(stat =>{
        return `<p>${stat.toUpperCase()} : ${character.appearance[stat]}</p>`
    })
    return `<h3> Appearance </h3>` + stats.join('');
}

const getWorkHTML = (character) => {
    const stats = Object.keys(character.work).map(stat =>{
        return `<p>${stat.toUpperCase()} : ${character.work[stat]}</p>`
    })
    return `<h3> Work </h3>` + stats.join('');
}

const getConnectionsHTML  = (character) => {
    const stats = Object.keys(character.connections).map(stat =>{
        return `<p>${stat.toUpperCase()} : ${character.connections[stat]}</p>`
    })
    return `<h3> Connections </h3>` + stats.join('');
}
 const showInfo = (character) => {
    const name = `<h2> ${character.name} </h2>`
    const image = `<img src="${character.image.url}" alt="${character.name}" height=200 width=200/>`
    const powerstatHTML = getPowerStatHTML(character);
    const appearanceHTML = getAppearanceHTML(character);
    const workHTML = getWorkHTML(character);
    const connectionsHTML = getConnectionsHTML(character);
    heroImageDiv.innerHTML = `${name} ${image} ${appearanceHTML} ${powerstatHTML} ${workHTML} ${connectionsHTML}` ;
} 

const getSearchedSuperHero = (name) => {
    fetch(`${BASE_URL}/search/${name}`)
        .then(response => response.json())
        .then(json => {
            const hero = json.results[0];
            showInfo(hero);
        }
        )
}


const searchButton = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
searchButton.onclick = () => getSearchedSuperHero(searchInput.value);


const newHeroButton = document.getElementById('getHeroBtn');
newHeroButton.onclick = () => getRandomSuperHero(randomHero())
const randomHero = () => {
    const max = 731
    return Math.ceil(Math.random() * max)
}
