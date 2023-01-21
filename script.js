let events = [];
const $eventName = document.getElementById('eventName');
console.log($eventName);
const $btnAdd = document.getElementById('btnAdd');
const $eventsContainer = document.getElementById('eventsContainer')


//TODO:localstorage
const json = load();
let arr = []
try {
    arr = JSON.parse(json); //TODO: cargar información
} catch (error) {
    arr = []
}
events = arr ? [...arr] : [];
renderEvents()

//fin localstorage

const $form = document.querySelector('form')
$form.addEventListener('submit', (e) => {
    e.preventDefault();
    addEvent();
})

const addEvent = () => {
    const { value } = $eventName
    if (!value) {
        return
    }
    const newEvent = {
        id: a = (Math.random() * 100).toString(36).slice(3),
        name: $eventName.value
    }

    events.unshift(newEvent);
    save(JSON.stringify(events))
    $eventName.value = "";

    renderEvents()
}


function renderEvents() {
    const $eventsHTML = events.map((event) => {
        return `
        <div class="container-button">
        <div class="event-name">${event.name}</div>
        <div class="actions"><button data-id="${event.id}" class="btnDelete">Eliminar</button></div>
        </div>
        
        `
    });

    $eventsContainer.innerHTML = $eventsHTML.join(" ")

    const elementos = document.querySelectorAll(".btnDelete");
    console.log(elementos);
    elementos.forEach((button) => {
        button.addEventListener("click", (e) => {
            const id = button.getAttribute("data-id");
            events = events.filter((event) => event.id !== id);
            save()
            renderEvents();
        });
    });
}

function save(data) {
    localStorage.setItem("items", data);
}

function load() {
    return localStorage.getItem("items");
}