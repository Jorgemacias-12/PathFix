const $ = (id) => {
    return document.getElementById(id);
}

const apiURL = "https://randomuser.me/api/"


let toggler = false;

$('options').addEventListener('click', () => {

    toggler = !toggler;

    $('user-modal').setAttribute('data-visible', `${toggler}`);
    $('user-modal').focus();

});

let questions = [
    "Why do executables have different behavior that the repl behavior?",
    "R ifelse to generate a new column but the condition column has changed ifself after the process",
    "When i add Aspnetcore.identity package to my code,it stopped compile.",
    "How to get multiple values from dropdown button using json list in flutter",
    "How to add data to .db file?",
    "How to get current pathname using router from next/navigation?",
    "Convert html5 canvas image to bitmap usable in drawImage",
    "How to hover from hidden to block in tailwindcdd",
    "Unable Connect to Cloud SQL from App Engine Standard using a VPC Static Ip Address when Egress Traffic : ALL",
    "How to use `org.springframework.core.convert.ConversionService#convert` without '...might be null' warning"
];

async function insertData() {
    let data = await fetch(apiURL);

    data = await data.json();

    const { results } = data;

    let { name, picture } = results[0];

    name = `${name.first} ${name.last}`;
    picture = picture.medium;

    let template = `
    
    <article class="question">

    <section class="user-info">

        <p class="user-name">
            <img src="${picture}" alt="" class="avatar">
            ${name}
        </p>

        <p class="question-valoration">
            Valoración: <i class="fas fa-star star"></i><i class="fas fa-star star"></i><i
                class="fas fa-star star"></i><i class="fas fa-star star"></i><i class="fas fa-star star"></i>
        </p>

    </section>

    <p class="text-question">
        ${questions[Math.floor(Math.random() * 10)]}
    </p>

    <section class="question-problem">
        <p class="problem">
            
        </p>
    </section>

    <section class="question-reward">

        <p class="reward">
            Creditos: <span class="pill">${Math.floor(Math.random() * 1000)}</span>
        </p>

    </section>

</article>

    `;

    return template;
}

for (let i = 0; i < 10; i++) {
    $('wrapper').innerHTML += await insertData();
}