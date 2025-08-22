// Dados globais
let despesas = [];
let receitas = [];
let editandoItem = null;
let tipoEditando = null;
let chartDonut = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    inicializarApp();
});

function inicializarApp() {
    // Configurar data padrão para hoje
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('dataDespesa').value = hoje;
    document.getElementById('dataReceita').value = hoje;
    
    // Configurar eventos dos formulários
    document.getElementById('formDespesa').addEventListener('submit', salvarDespesa);
    document.getElementById('formReceita').addEventListener('submit', salvarReceita);
    
    // Inicializar dashboard
    inicializarChart();
    
    // Atualizar displays
    atualizarTudo();
    
    // Carregar dados salvos se existirem
    carregarDadosAutomatico();
}

// === FUNÇÕES DE DESPESAS ===
function abrirModalDespesa(id = null) {
    const modal = document.getElementById('modalDespesa');
    const titulo = document.getElementById('tituloModalDespesa');
    const form = document.getElementById('formDespesa');
    
    if (id !== null) {
        // Editando despesa existente
        const despesa = despesas.find(d => d.id === id);
        if (despesa) {
            titulo.textContent = 'Editar Despesa';
            document.getElementById('descricaoDespesa').value = despesa.descricao;
            document.getElementById('valorDespesa').value = despesa.valor;
            document.getElementById('dataDespesa').value = despesa.data;
            document.getElementById('categoriaDespesa').value = despesa.categoria;
            editandoItem = id;
            tipoEditando = 'despesa';
        }
    } else {
        // Nova despesa
        titulo.textContent = 'Adicionar Despesa';
        form.reset();
        document.getElementById('dataDespesa').value = new Date().toISOString().split('T')[0];
        editandoItem = null;
        tipoEditando = null;
    }
    
    modal.style.display = 'block';
}

function salvarDespesa(e) {
    e.preventDefault();
    
    const descricao = document.getElementById('descricaoDespesa').value;
    const valor = parseFloat(document.getElementById('valorDespesa').value);
    const data = document.getElementById('dataDespesa').value;
    const categoria = document.getElementById('categoriaDespesa').value;
    
    if (editandoItem !== null) {
        // Editando despesa existente
        const index = despesas.findIndex(d => d.id === editandoItem);
        if (index !== -1) {
            despesas[index] = {
                id: editandoItem,
                descricao,
                valor,
                data,
                categoria,
                timestamp: new Date().getTime()
            };
        }
    } else {
        // Nova despesa
        const novaDespesa = {
            id: Date.now(),
            descricao,
            valor,
            data,
            categoria,
            timestamp: new Date().getTime()
        };
        despesas.push(novaDespesa);
    }
    
    fecharModal('modalDespesa');
    atualizarTudo();
}

function editarDespesa(id) {
    abrirModalDespesa(id);
}

function excluirDespesa(id) {
    if (confirm('Tem certeza que deseja excluir esta despesa?')) {
        despesas = despesas.filter(d => d.id !== id);
        atualizarTudo();
    }
}

// === FUNÇÕES DE RECEITAS ===
function abrirModalReceita(id = null) {
    const modal = document.getElementById('modalReceita');
    const titulo = document.getElementById('tituloModalReceita');
    const form = document.getElementById('formReceita');
    
    if (id !== null) {
        // Editando receita existente
        const receita = receitas.find(r => r.id === id);
        if (receita) {
            titulo.textContent = 'Editar Receita';
            document.getElementById('descricaoReceita').value = receita.descricao;
            document.getElementById('valorReceita').value = receita.valor;
            document.getElementById('dataReceita').value = receita.data;
            document.getElementById('categoriaReceita').value = receita.categoria;
            editandoItem = id;
            tipoEditando = 'receita';
        }
    } else {
        // Nova receita
        titulo.textContent = 'Adicionar Receita';
        form.reset();
        document.getElementById('dataReceita').value = new Date().toISOString().split('T')[0];
        editandoItem = null;
        tipoEditando = null;
    }
    
    modal.style.display = 'block';
}

function salvarReceita(e) {
    e.preventDefault();
    
    const descricao = document.getElementById('descricaoReceita').value;
    const valor = parseFloat(document.getElementById('valorReceita').value);
    const data = document.getElementById('dataReceita').value;
    const categoria = document.getElementById('categoriaReceita').value;
    
    if (editandoItem !== null) {
        // Editando receita existente
        const index = receitas.findIndex(r => r.id === editandoItem);
        if (index !== -1) {
            receitas[index] = {
                id: editandoItem,
                descricao,
                valor,
                data,
                categoria,
                timestamp: new Date().getTime()
            };
        }
    } else {
        // Nova receita
        const novaReceita = {
            id: Date.now(),
            descricao,
            valor,
            data,
            categoria,
            timestamp: new Date().getTime()
        };
        receitas.push(novaReceita);
    }
    
    fecharModal('modalReceita');
    atualizarTudo();
}

function editarReceita(id) {
    abrirModalReceita(id);
}

function excluirReceita(id) {
    if (confirm('Tem certeza que deseja excluir esta receita?')) {
        receitas = receitas.filter(r => r.id !== id);
        atualizarTudo();
    }
}

// === FUNÇÕES DE MODAL ===
function fecharModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    editandoItem = null;
    tipoEditando = null;
}

// Fechar modal clicando fora dele
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            editandoItem = null;
            tipoEditando = null;
        }
    });
}

// === FUNÇÕES DE ATUALIZAÇÃO ===
function atualizarTudo() {
    atualizarListaDespesas();
    atualizarListaReceitas();
    atualizarSaldo();
    atualizarResumo();
    atualizarChart();
}

function atualizarListaDespesas() {
    const lista = document.getElementById('listaDespesas');
    lista.innerHTML = '';
    
    // Ordenar por data (mais recente primeiro)
    const despesasOrdenadas = [...despesas].sort((a, b) => new Date(b.data) - new Date(a.data));
    
    despesasOrdenadas.forEach(despesa => {
        const item = criarItemLista(despesa, 'despesa');
        lista.appendChild(item);
    });
}

function atualizarListaReceitas() {
    const lista = document.getElementById('listaReceitas');
    lista.innerHTML = '';
    
    // Ordenar por data (mais recente primeiro)
    const receitasOrdenadas = [...receitas].sort((a, b) => new Date(b.data) - new Date(a.data));
    
    receitasOrdenadas.forEach(receita => {
        const item = criarItemLista(receita, 'receita');
        lista.appendChild(item);
    });
}

function criarItemLista(item, tipo) {
    const div = document.createElement('div');
    div.className = 'item';
    
    const dataFormatada = new Date(item.data).toLocaleDateString('pt-BR');
    const valorFormatado = formatarMoeda(item.valor);
    
    div.innerHTML = `
        <div class="item-header">
            <span class="item-descricao">${item.descricao}</span>
            <span class="item-valor ${tipo}">${valorFormatado}</span>
        </div>
        <div class="item-info">
            <span class="item-categoria">${item.categoria}</span>
            <span class="item-data">${dataFormatada}</span>
            <div class="item-actions">
                <button class="btn btn-edit" onclick="${tipo === 'despesa' ? 'editarDespesa' : 'editarReceita'}(${item.id})">Editar</button>
                <button class="btn btn-delete" onclick="${tipo === 'despesa' ? 'excluirDespesa' : 'excluirReceita'}(${item.id})">Excluir</button>
            </div>
        </div>
    `;
    
    return div;
}

function atualizarSaldo() {
    const totalReceitas = receitas.reduce((total, receita) => total + receita.valor, 0);
    const totalDespesas = despesas.reduce((total, despesa) => total + despesa.valor, 0);
    const saldo = totalReceitas - totalDespesas;
    
    document.getElementById('saldoTotal').textContent = formatarMoeda(saldo);
    
    // Mudar cor baseado no saldo
    const saldoElement = document.getElementById('saldoTotal');
    if (saldo > 0) {
        saldoElement.style.color = '#4ade80';
    } else if (saldo < 0) {
        saldoElement.style.color = '#f87171';
    } else {
        saldoElement.style.color = '#ffd700';
    }
}

function atualizarResumo() {
    const totalReceitas = receitas.reduce((total, receita) => total + receita.valor, 0);
    const totalDespesas = despesas.reduce((total, despesa) => total + despesa.valor, 0);
    const saldo = totalReceitas - totalDespesas;
    
    document.getElementById('totalReceitas').textContent = formatarMoeda(totalReceitas);
    document.getElementById('totalDespesas').textContent = formatarMoeda(totalDespesas);
    document.getElementById('saldoPeriodo').textContent = formatarMoeda(saldo);
}

// === FUNÇÕES DE DASHBOARD ===
function inicializarChart() {
    const ctx = document.getElementById('chartDonut').getContext('2d');
    
    chartDonut = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Receitas', 'Despesas'],
            datasets: [{
                data: [0, 0],
                backgroundColor: [
                    'rgba(74, 222, 128, 0.8)',
                    'rgba(248, 113, 113, 0.8)'
                ],
                borderColor: [
                    'rgba(74, 222, 128, 1)',
                    'rgba(248, 113, 113, 1)'
                ],
                borderWidth: 2,
                spacing: 5,
                cutout: '60%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#e0e0e0',
                        font: {
                            family: 'Ubuntu',
                            size: 14,
                            weight: '600'
                        },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(45, 45, 45, 0.95)',
                    titleColor: '#ffd700',
                    bodyColor: '#e0e0e0',
                    borderColor: 'rgba(255, 215, 0, 0.3)',
                    borderWidth: 1,
                    cornerRadius: 10,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = formatarMoeda(context.parsed);
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            elements: {
                arc: {
                    borderRadius: 8
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

function atualizarChart() {
    if (!chartDonut) return;
    
    const totalReceitas = receitas.reduce((total, receita) => total + receita.valor, 0);
    const totalDespesas = despesas.reduce((total, despesa) => total + despesa.valor, 0);
    
    chartDonut.data.datasets[0].data = [totalReceitas, totalDespesas];
    chartDonut.update('active');
}

// === FUNÇÕES DE FILTRO ===
function filtrarPorData() {
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    
    if (!dataInicio || !dataFim) {
        alert('Por favor, selecione as datas de início e fim.');
        return;
    }
    
    if (new Date(dataInicio) > new Date(dataFim)) {
        alert('A data de início deve ser anterior à data de fim.');
        return;
    }
    
    // Filtrar receitas
    const receitasFiltradas = receitas.filter(receita => {
        const dataReceita = new Date(receita.data);
        return dataReceita >= new Date(dataInicio) && dataReceita <= new Date(dataFim);
    });
    
    // Filtrar despesas
    const despesasFiltradas = despesas.filter(despesa => {
        const dataDespesa = new Date(despesa.data);
        return dataDespesa >= new Date(dataInicio) && dataDespesa <= new Date(dataFim);
    });
    
    // Calcular totais do período
    const totalReceitasPeriodo = receitasFiltradas.reduce((total, receita) => total + receita.valor, 0);
    const totalDespesasPeriodo = despesasFiltradas.reduce((total, despesa) => total + despesa.valor, 0);
    const saldoPeriodo = totalReceitasPeriodo - totalDespesasPeriodo;
    
    // Atualizar resumo com dados filtrados
    document.getElementById('totalReceitas').textContent = formatarMoeda(totalReceitasPeriodo);
    document.getElementById('totalDespesas').textContent = formatarMoeda(totalDespesasPeriodo);
    document.getElementById('saldoPeriodo').textContent = formatarMoeda(saldoPeriodo);
    
    // Feedback visual
    const resumoCard = document.querySelector('.resumo-card');
    resumoCard.style.borderColor = 'rgba(255, 215, 0, 0.5)';
    setTimeout(() => {
        resumoCard.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    }, 2000);
}

// === FUNÇÕES DE PERSISTÊNCIA ===
function salvarDados() {
    const dados = {
        despesas: despesas,
        receitas: receitas,
        timestamp: new Date().getTime()
    };
    
    try {
        localStorage.setItem('controleFinanceiro', JSON.stringify(dados));
        
        // Feedback visual
        const btnSalvar = document.querySelector('.btn-save');
        const textoOriginal = btnSalvar.textContent;
        btnSalvar.textContent = 'Salvo!';
        btnSalvar.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
        
        setTimeout(() => {
            btnSalvar.textContent = textoOriginal;
            btnSalvar.style.background = 'linear-gradient(135deg, #ffd700, #ffed4e)';
        }, 2000);
        
    } catch (error) {
        alert('Erro ao salvar dados: ' + error.message);
    }
}

function carregarDados() {
    try {
        const dadosSalvos = localStorage.getItem('controleFinanceiro');
        
        if (dadosSalvos) {
            const dados = JSON.parse(dadosSalvos);
            despesas = dados.despesas || [];
            receitas = dados.receitas || [];
            
            atualizarTudo();
            
            // Feedback visual
            const btnCarregar = document.querySelector('.btn-load');
            const textoOriginal = btnCarregar.textContent;
            btnCarregar.textContent = 'Carregado!';
            btnCarregar.style.background = 'rgba(74, 222, 128, 0.3)';
            btnCarregar.style.color = '#4ade80';
            
            setTimeout(() => {
                btnCarregar.textContent = textoOriginal;
                btnCarregar.style.background = 'rgba(224, 224, 224, 0.2)';
                btnCarregar.style.color = '#e0e0e0';
            }, 2000);
            
        } else {
            alert('Nenhum dado salvo encontrado.');
        }
    } catch (error) {
        alert('Erro ao carregar dados: ' + error.message);
    }
}

function carregarDadosAutomatico() {
    try {
        const dadosSalvos = localStorage.getItem('controleFinanceiro');
        
        if (dadosSalvos) {
            const dados = JSON.parse(dadosSalvos);
            despesas = dados.despesas || [];
            receitas = dados.receitas || [];
            atualizarTudo();
        }
    } catch (error) {
        console.log('Nenhum dado salvo encontrado ou erro ao carregar:', error);
    }
}

// === FUNÇÕES UTILITÁRIAS ===
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

// === EVENTOS DE TECLADO ===
document.addEventListener('keydown', function(e) {
    // Fechar modal com ESC
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                editandoItem = null;
                tipoEditando = null;
            }
        });
    }
    
    // Salvar com Ctrl+S
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        salvarDados();
    }
    
    // Carregar com Ctrl+L
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        carregarDados();
    }
});

// === AUTO-SAVE ===
// Salvar automaticamente a cada 5 minutos
setInterval(() => {
    if (despesas.length > 0 || receitas.length > 0) {
        salvarDados();
    }
}, 300000); // 5 minutos

