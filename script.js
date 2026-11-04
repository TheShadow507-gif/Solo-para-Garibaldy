// FECHA DE CUMPLEAÑOS
const correctDay = 7;
const correctMonth = 11;

// SECCIONES VISITADAS
const visitedSections = {
    animes: false,
    music: false,
    us: false
};
// MUSICA DE FONDO
function setBackgroundMusic(file) {
    const audio = document.getElementById("background-music");

    if (audio.getAttribute("src") !== file) {
        audio.src = file;
        audio.load();
    }

    audio.play().catch(() => {
        console.log("La música necesita activarse desde el navegador.");
    });
}

function pauseBackgroundMusic() {
    const audio = document.getElementById("background-music");
    audio.pause();
}

// CAMBIAR DE PANTALLA
function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const destination = document.getElementById(screenId);

    if (destination) {
        destination.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (screenId === "final") {
        createHundredLoves();
    }
}

// COMPROBAR FECHA
function checkDate() {
    const day = Number(document.getElementById("day").value);
    const month = Number(document.getElementById("month").value);
    const message = document.getElementById("date-message");

    if (day === correctDay && month === correctMonth) {
        message.textContent = "¡Correcto! Hay una sorpresa para ti. 💜";
setBackgroundMusic("musica/fondo-cumple.mp3.mpeg");

        setTimeout(() => {
            showScreen("birthday");
            launchConfetti();
        }, 700);
    } else {
        message.textContent = "Mmm... esa no es la fecha correcta. Inténtalo otra vez. 💗";
    }
}

// ABRIR UNA SECCIÓN DEL MENÚ
function openSection(section) {
    visitedSections[section] = true;

    if (section === "animes") {
        setBackgroundMusic("musica/ganbare.mp3.mpeg");
    }

   else if (section === "music") {
    pauseBackgroundMusic();
    stopMusic();
}

    else {
        setBackgroundMusic("musica/fondo-cumple.mp3");
    }

    updateVisited();
    showScreen(section);
}

// VOLVER AL MENÚ
function backToMenu(section) {
    stopMusic();
    setBackgroundMusic("musica/fondo-cumple.mp3");
    showScreen("menu");
    updateVisited();
}

// COMPROBAR LAS TRES SECCIONES
function updateVisited() {
    const total =
        Number(visitedSections.animes) +
        Number(visitedSections.music) +
        Number(visitedSections.us);

    const message = document.getElementById("unlock-message");
    const secretButton = document.getElementById("final-unlock");

    if (total === 3) {
        message.textContent = "¡Has descubierto todos los rincones! Hay una última sorpresa... 💜";
        secretButton.classList.remove("hidden");
    } else {
        message.textContent = "Has visitado " + total + " de 3 secciones. ¡Sigue explorando! ♡";
    }
}

// REPRODUCTOR DE MÚSICA
function playSong(file, title) {
    const audio = document.getElementById("audio-player");
    const message = document.getElementById("now-playing");

    pauseBackgroundMusic();

    audio.pause();
    audio.src = file;
    audio.load();

    message.textContent = "Reproduciendo: " + title;

    audio.play().catch(() => {
        message.textContent =
            "No se pudo reproducir. Comprueba el nombre y la ubicación del archivo.";
    });
}

function stopMusic() {
    const audio = document.getElementById("audio-player");

    audio.pause();
    audio.currentTime = 0;
    audio.removeAttribute("src");
    audio.load();

    document.getElementById("now-playing").textContent =
        "Selecciona una canción para reproducirla.";
}

// CREAR LOS 100 TE AMO
let lovesCreated = false;

function createHundredLoves() {
    if (lovesCreated) return;

    const container = document.getElementById("hundred-loves");

    for (let i = 0; i < 100; i++) {
        const love = document.createElement("span");

        love.className = "love-word";
        love.textContent = "TE AMO 💜";
        love.style.animationDelay = (i * 0.035) + "s";

        container.appendChild(love);
    }

    lovesCreated = true;
}

// CONFETI
function launchConfetti() {
    const colors = ["💜", "💗", "✨", "🎀", "🌸", "💙"];

    for (let i = 0; i < 45; i++) {
        const piece = document.createElement("span");

        piece.textContent = colors[Math.floor(Math.random() * colors.length)];
        piece.style.position = "fixed";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.top = "-30px";
        piece.style.fontSize = (15 + Math.random() * 20) + "px";
        piece.style.zIndex = "100";
        piece.style.pointerEvents = "none";
        piece.style.transition = "transform 3s ease-in, opacity 3s ease-in";

        document.body.appendChild(piece);

        const fall = 80 + Math.random() * 30;
        const rotation = Math.random() * 720;

        requestAnimationFrame(() => {
            piece.style.transform =
                "translateY(" + fall + "vh) rotate(" + rotation + "deg)";
            piece.style.opacity = "0";
        });

        setTimeout(() => piece.remove(), 3200);
    }
}

// CORAZONES FLOTANTES
function createFloatingHeart() {
    const container = document.getElementById("floating-hearts");
    const heart = document.createElement("span");
    const hearts = ["💜", "💗", "♡", "✨", "🩵"];

    heart.className = "floating-heart";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (12 + Math.random() * 18) + "px";
    heart.style.animationDuration = (5 + Math.random() * 4) + "s";

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 9500);
}

setInterval(createFloatingHeart, 900);

// PERMITIR ENTER EN LOS CAMPOS DE FECHA
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("day").addEventListener("keydown", event => {
        if (event.key === "Enter") {
            checkDate();
        }
    });

    document.getElementById("month").addEventListener("keydown", event => {
        if (event.key === "Enter") {
            checkDate();
        }
    });
});