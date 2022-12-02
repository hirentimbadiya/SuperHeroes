//  https://superheroapi.com/api/access-token/character-id 

const BASE_URL = "https://superheroapi.com/api.php/3355326938120861";
const heroImageDiv = document.getElementById("HeroImage");
const getRandomSuperHero = (id) => {
    fetch(`${BASE_URL}/${id}`)
        .then(response => response.json())
        .then(json => {
            console.log(json.powerstats);
            const name = `<h2> ${json.name} </h2>`
            const statHTML = getStatHTML(json);
            heroImageDiv.innerHTML = `${name} <img src="${json.image.url}" alt="${json.name}" height=200 width=200/>
            ${statHTML}`
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

const getStatHTML = (character) => {
    const stats = Object.keys(character.powerstats).map(stat =>{
        return `<p> ${stateToEmoji[stat]}${stat.toUpperCase()} : ${character.powerstats[stat]}</p>`
    })
    return stats.join('');
}

const getSearchedSuperHero = (name) => {
    fetch(`${BASE_URL}/search/${name}`)
        .then(response => response.json())
        .then(json => {
            const hero = json.results[0];
            const namehero = `<h2> ${name.toUpperCase()} </h2>`
            const statHTML = getStatHTML(hero);
            heroImageDiv.innerHTML = ` ${namehero}<img src="${hero.image.url}" alt="${name}" height=200 width=200/>
            ${statHTML}`
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
