const imageSources = [
    'source/coutinho-velho.jpg',
    'source/cristiano-ronaldo-velho.jpg',
    'source/marta-idosa.jpg',
    'source/messi-velho.jpg',  
    'source/vinicius-junior-velho.jpg'
];

// Variáveis para controle preciso do tempo
let universoNumber = '';
const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let baseTime = new Date(); // Armazena o horário REAL de Brasília
let timeMultiplier = 1;
let visualTime = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    lastUpdate: Date.now()
};

function updateDigitalClock() {
    const now = new Date(baseTime.getTime() + (Date.now() - baseTime.getTime()) * timeMultiplier);
    const elapsed = Date.now() - visualTime.lastUpdate;
    
    // Calcula quantos segundos se passaram considerando a aceleração
    const secondsPassed = Math.floor((elapsed * timeMultiplier) / 1000);
    
    if(secondsPassed > 0) {
        visualTime.seconds += secondsPassed;
        visualTime.lastUpdate = Date.now();
        
        // Ajusta minutos e horas
        while(visualTime.seconds >= 60) {
            visualTime.seconds -= 60;
            visualTime.minutes++;
        }
        while(visualTime.minutes >= 60) {
            visualTime.minutes -= 60;
            visualTime.hours++;
        }
        while(visualTime.hours >= 24) {
            visualTime.hours -= 24;
        }
        
        // Atualiza display
        document.getElementById('hours').textContent = String(visualTime.hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(visualTime.minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(visualTime.seconds).padStart(2, '0');
    }
    
    // Atualiza data (mantém sincronização real)
    const dateOptions = {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };
    const dateParts = new Intl.DateTimeFormat('pt-BR', dateOptions).formatToParts(now);
    document.querySelector('.clock-date').textContent = 
        `${dateParts.find(p => p.type === 'day').value}/${
         dateParts.find(p => p.type === 'month').value}/${
         dateParts.find(p => p.type === 'year').value}`;
}

// Função para sincronizar com horário real
function syncBaseTime() {
    const formatter = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    const parts = formatter.formatToParts(new Date());
    baseTime = new Date();
    
    // Atualiza visualTime com valores reais
    visualTime = {
        hours: parseInt(parts.find(p => p.type === 'hour').value),
        minutes: parseInt(parts.find(p => p.type === 'minute').value),
        seconds: parseInt(parts.find(p => p.type === 'second').value),
        lastUpdate: Date.now()
    };
}

syncBaseTime();
setInterval(updateDigitalClock, 100);

// Inicialização correta
syncBaseTime();
setInterval(updateDigitalClock, 1000);

const title = document.querySelector('h2');
const neymarImage = document.querySelector('.image-container');
const marqueeElement = document.querySelector('.marquee');

// Variáveis de controle
let speedMultiplier = 1;
let isHeavenActive = false;

function randomRGB() {
    return Math.floor(Math.random() * 256);
}

function changeColor() {
    title.style.color = `rgb(${randomRGB()},${randomRGB()},${randomRGB()})`;
    setTimeout(changeColor, 100);
}

function gerarNumeroUniverso() {
    const numeros = () => Math.floor(Math.random() * 10);
    const letra = () => letras[Math.floor(Math.random() * 26)];
    
    return `Universo N° ${numeros()}${numeros()}${numeros()}-${letra()}${letra()}`;
}

function handleNeymarClick() {
    if (isHeavenActive || !document.querySelector('.image-container')) return;

    speedMultiplier += 0.25;
    timeMultiplier *= 1.5; // Aceleração exponencial
    
    // Atualiza elementos visuais
    const newSpeed = 200 / speedMultiplier;
    marqueeElement.style.animation = `marquee-scroll ${newSpeed}s linear infinite`;
    
    const clock = document.querySelector('.brasilia-clock');
    clock.style.textShadow = `0 0 ${5 * timeMultiplier}px rgba(255,0,0,0.7)`;
    clock.style.animation = `glitch ${0.5/timeMultiplier}s infinite`;

    if (speedMultiplier >= 15) {
        activateHeavenEffect();
    }
}
function activateHeavenEffect() {
    isHeavenActive = true;

    const audio = new Audio('source/made_in_heaven.mp3');
    audio.play();

    //espaço para o efeito de "Made in Heaven"
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundImage = "url('source/espaco.webp')";
    overlay.style.backgroundSize = 'cover';
    overlay.style.backgroundPosition = 'center';
    overlay.style.backgroundRepeat = 'no-repeat';
    overlay.style.zIndex = '99999';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.flexDirection = 'column';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 2s';

    //made in heaven
    const heavenImg = document.createElement('img');
    heavenImg.src = 'source/made_in_heaven.webp'; // ou 'source/made_in_heaven.png'
    heavenImg.alt = 'Made in Heaven';
    heavenImg.style.maxWidth = '30%';
    heavenImg.style.opacity = '0.7';
    heavenImg.style.zIndex = '2';
    heavenImg.classList.add('glitch-img'); // adiciona a classe de efeito glitch

document.body.appendChild(heavenImg);
heavenImg.classList.add('glitch-flash');

   // Criação do relógio (igual ao seu)
const clock = document.createElement('div');
clock.style.position = 'absolute';
clock.style.width = '400px';
clock.style.height = '400px';
clock.style.border = '15px solid white';
clock.style.borderRadius = '50%';
clock.style.top = '50%';
clock.style.left = '50%';
clock.style.transform = 'translate(-50%, -50%)';
clock.style.display = 'flex';
clock.style.justifyContent = 'center';
clock.style.alignItems = 'center';
clock.style.zIndex = '1';

// Ponteiro 1 – maior
const pointer1 = document.createElement('div');
pointer1.className = 'pointer';
pointer1.style.width = '10px';
pointer1.style.height = '140px';
pointer1.style.backgroundColor = 'white';
pointer1.style.transformOrigin = 'bottom center';

// Ponteiro 2 – menor
const pointer2 = document.createElement('div');
pointer2.className = 'pointer';
pointer2.style.width = '10px';
pointer2.style.height = '100px';
pointer2.style.backgroundColor = 'white';
pointer2.style.transformOrigin = 'bottom center';

// Adiciona ponteiros ao relógio
clock.appendChild(pointer1);
clock.appendChild(pointer2);

// Ponto central
const centerDot = document.createElement('div');
centerDot.style.position = 'absolute';
centerDot.style.width = '20px';
centerDot.style.height = '20px';
centerDot.style.backgroundColor = 'white';
centerDot.style.borderRadius = '50%';
centerDot.style.top = '50%';
centerDot.style.left = '50%';
centerDot.style.transform = 'translate(-50%, -50%)';
centerDot.style.zIndex = '10';

clock.appendChild(centerDot);
overlay.appendChild(clock);

// ANIMAÇÃO ACELERADA
let angle1 = 0;
let angle2 = 0;
let speed1 = 0.15625; // graus por frame (começa devagar)
let speed2 = 0.1875;

const animateClock = () => {
    angle1 = (angle1 + speed1) % 360;
    angle2 = (angle2 + speed2) % 360;

    pointer1.style.transform = `rotate(${angle1}deg)`;
    pointer2.style.transform = `rotate(${angle2}deg)`;

    requestAnimationFrame(animateClock);
};
animateClock();

// Aumenta a velocidade a cada segundo
const speedInterval = setInterval(() => {
    speed1 += 2; // aumenta gradualmente
    speed2 += 4;
}, 1000);

// Dica: depois que o relógio for removido (ex: após o efeito), chame `clearInterval(speedInterval);`

    overlay.appendChild(heavenImg); // Se existir
    document.body.appendChild(overlay);
    

    setTimeout(() => {
        overlay.style.opacity = '1';
    
        // TOCA O SEGUNDO ÁUDIO APÓS 10s
        setTimeout(() => {
            const transitionAudio = new Audio('source/made-in-heavenSFX.mp3');
            transitionAudio.play();
        }, 10000); // toca após 10 segundos da primeira música
    
        // FLASH BRANCO APÓS 13s (ou seja, 3s depois da segunda música iniciar)
        setTimeout(() => {
            const whiteFlash = document.createElement('div');
            whiteFlash.style.position = 'fixed';
            whiteFlash.style.top = '0';
            whiteFlash.style.left = '0';
            whiteFlash.style.width = '100vw';
            whiteFlash.style.height = '100vh';
            whiteFlash.style.backgroundColor = 'white';
            whiteFlash.style.zIndex = '100000';
            whiteFlash.style.opacity = '1';
            whiteFlash.style.transition = 'opacity 1.5s ease';
    
            document.body.appendChild(whiteFlash);
    
            // Mantém a tela branca por 2 segundos
            setTimeout(() => {
                randomizeColors();
                resetSpeed();
                overlay.remove();
    
                whiteFlash.style.opacity = '0';
    
                setTimeout(() => {
                    whiteFlash.remove();
                    isHeavenActive = false;
                }, 3000); // Duração do fade-out
            }, 2000); // Tempo com tela branca cheia
    
        }, 13000); // Flash ocorre 13s após início da primeira música
    
    }, 10); // Ativa overlay inicialmente
    
    
    
}



function randomizeColors() {
    const randomColor = () => Math.floor(Math.random() * 100); // cores mais escuras

    document.body.style.backgroundColor = `rgb(${randomColor()},${randomColor()},${randomColor()})`;
    document.querySelector('header').style.backgroundColor = `rgb(${randomColor()},${randomColor()},${randomColor()})`;

    const digitalClock = document.querySelector('.brasilia-clock');
    if (digitalClock) {
        digitalClock.style.backgroundColor = `rgba(${randomColor()},${randomColor()},${randomColor()},0.9)`;
        digitalClock.style.color = `rgb(${randomColor()},${randomColor()},${randomColor()})`;
    }

    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        if (!img.classList.contains('protected')) {
            const randomIndex = Math.floor(Math.random() * imageSources.length);
            img.src = imageSources[randomIndex];
        }
    });
}

function resetSpeed() {
    syncBaseTime();
    speedMultiplier = 1;
    timeMultiplier = 1;
    marqueeElement.style.animationDuration = '150s';
    
    const clock = document.querySelector('.brasilia-clock');
    clock.style.textShadow = 'none';
    clock.style.animation = 'none';

    const protectedElements = document.querySelectorAll('.protected, .video-protected');
    protectedElements.forEach(el => el.classList.add('protected'));

    // Cria a mensagem do universo com efeito glitch
    const universeMsg = document.createElement('div');
    universeMsg.className = 'universe-message';
    universeMsg.textContent = gerarNumeroUniverso();
    document.body.appendChild(universeMsg);

    const generateGlitch = () => {
        const number = Math.floor(Math.random() * 60);
        const points = [];
        let x = 0, y = 0;

        for (let i = 0; i < number; i++) {
            if (i % 2) {
                x = Math.floor(Math.random() * 100);
            } else {
                y = Math.floor(Math.random() * 100);
            }
            points.push(`${x}% ${y}%`);
        }

        universeMsg.style.clipPath = `polygon(${points.join(",")})`;
        universeMsg.classList.add('glitching');
    };

    // Glitch intermitente por 3 segundos
    const glitchInterval = setInterval(() => {
        generateGlitch();
        setTimeout(() => {
            universeMsg.style.clipPath = 'none';
        }, 100); // volta ao normal logo após "quebrar"
    }, 200);

    // Após 3 segundos, para o efeito e remove a mensagem
    setTimeout(() => {
        clearInterval(glitchInterval);
        universeMsg.style.clipPath = 'none';
        universeMsg.classList.remove('glitching');
        universeMsg.classList.add('fade-out');
        setTimeout(() => {
            universeMsg.remove();
        }, 1000);
    }, 6000);
}


// Event listeners
neymarImage.addEventListener('click', handleNeymarClick);
changeColor();

