const form = document.getElementById('form-agendamento');

form.addEventListener('submit', async function(event) {

    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const servicoId = document.getElementById('servico').value;
    const agendamento = document.getElementById('agendamento').value;

    try {
        const ClienteResponse = await fetch('http://localhost:8080/clientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, telefone, email })
        });

        if (!ClienteResponse.ok) throw new Error('Erro ao cadastrar cliente');

        const clienteSalvo = await ClienteResponse.json();
        const clienteId = clienteSalvo.id;

        const agendamentoResponse = await fetch('http://localhost:8080/agendamentos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                clienteId: clienteId,
                servicoId: parseInt(servicoId),
                dataHora: agendamento
            })
        });

        if (!agendamentoResponse.ok) {
            const erroData = await agendamentoResponse.json();
            alert(`Aviso: ${erroData.erro}`);
            return;
        }

        alert('Agendamento realizado com sucesso!');
        form.reset();

        } catch (error) {
            console.error(error);
            alert('Ocorreu um erro na comunicação com o servidor.')
        }
    });