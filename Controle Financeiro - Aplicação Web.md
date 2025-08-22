# Controle Financeiro - Aplicação Web

Uma aplicação web moderna para controle de receitas e despesas com design glass effect e funcionalidades avançadas.

## 🎨 Características Visuais

- **Fundo gradiente**: Preto e cinza claro com transições suaves
- **Efeitos glass**: Backdrop blur e transparências modernas
- **Cantos arredondados**: Design moderno e elegante
- **Detalhes em amarelo**: Acentos dourados (#ffd700) e cinza claro
- **Fonte Ubuntu Semibold**: Tipografia moderna e legível
- **Design responsivo**: Funciona em desktop e mobile

## 📊 Funcionalidades

### Quadros Principais

1. **SALDO**: Exibe o saldo atual (receitas - despesas) com cores dinâmicas
2. **DESPESAS**: Gerenciamento completo de despesas com CRUD
3. **RECEITAS**: Gerenciamento completo de receitas com CRUD
4. **DASHBOARD**: Gráfico donut moderno mostrando proporção receitas x despesas
5. **RESUMO**: Totalizadores e filtro por período de datas

### Operações Disponíveis

#### Despesas e Receitas
- ✅ **Incluir**: Adicionar novas entradas com descrição, valor, data e categoria
- ✅ **Alterar**: Editar entradas existentes
- ✅ **Excluir**: Remover entradas com confirmação
- ✅ **Visualizar**: Lista organizada por data (mais recente primeiro)

#### Dashboard
- ✅ **Gráfico Donut**: Visualização moderna com fatias separadas
- ✅ **Cores diferenciadas**: Verde para receitas, vermelho para despesas
- ✅ **Animações suaves**: Transições fluidas nos dados
- ✅ **Tooltips informativos**: Valores e percentuais detalhados

#### Resumo e Filtros
- ✅ **Totalizadores**: Receitas, despesas e saldo do período
- ✅ **Filtro por data**: Selecionar período específico para análise
- ✅ **Atualização dinâmica**: Cálculos em tempo real

#### Persistência de Dados
- ✅ **Salvar**: Armazenar dados no localStorage do navegador
- ✅ **Carregar**: Recuperar dados salvos anteriormente
- ✅ **Auto-save**: Salvamento automático a cada 5 minutos
- ✅ **Feedback visual**: Confirmação das operações

## 🚀 Como Usar

### Instalação
1. Baixe todos os arquivos (index.html, style.css, script.js)
2. Mantenha os arquivos na mesma pasta
3. Abra o arquivo `index.html` em qualquer navegador moderno

### Operações Básicas

#### Adicionar Despesa/Receita
1. Clique no botão "+ Adicionar" no quadro desejado
2. Preencha os campos obrigatórios:
   - Descrição: Nome da transação
   - Valor: Valor em reais (use ponto ou vírgula para decimais)
   - Data: Data da transação
   - Categoria: Selecione uma categoria predefinida
3. Clique em "Salvar"

#### Editar/Excluir
1. Localize a transação na lista
2. Clique em "Editar" para modificar ou "Excluir" para remover
3. Confirme a operação

#### Filtrar por Período
1. No quadro "Resumo", selecione as datas de início e fim
2. Clique em "Filtrar"
3. Os totalizadores serão atualizados para o período selecionado

#### Salvar/Carregar Dados
1. **Salvar**: Clique no botão "Salvar" no cabeçalho
2. **Carregar**: Clique no botão "Carregar" no cabeçalho
3. Os dados são armazenados localmente no navegador

### Atalhos de Teclado
- **Ctrl + S**: Salvar dados
- **Ctrl + L**: Carregar dados
- **ESC**: Fechar modais abertos

## 🎯 Categorias Predefinidas

### Despesas
- Alimentação
- Transporte
- Moradia
- Saúde
- Lazer
- Outros

### Receitas
- Salário
- Freelance
- Investimentos
- Vendas
- Outros

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização avançada com glass effects
- **JavaScript ES6+**: Lógica de aplicação
- **Chart.js**: Gráficos interativos
- **LocalStorage**: Persistência de dados
- **Google Fonts**: Fonte Ubuntu

## 📱 Compatibilidade

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Dispositivos móveis (iOS/Android)

## 🎨 Paleta de Cores

- **Fundo**: Gradiente #1a1a1a → #2d2d2d → #404040
- **Acentos**: #ffd700 (dourado)
- **Receitas**: #4ade80 (verde)
- **Despesas**: #f87171 (vermelho)
- **Texto**: #e0e0e0 (cinza claro)
- **Glass**: rgba(255, 255, 255, 0.1) com backdrop-blur

## 📄 Estrutura de Arquivos

```
controle-financeiro/
├── index.html          # Estrutura principal
├── style.css           # Estilos e efeitos visuais
├── script.js           # Lógica da aplicação
└── README.md           # Este arquivo
```

## 🔒 Privacidade

- Todos os dados são armazenados localmente no navegador
- Nenhuma informação é enviada para servidores externos
- Para backup, use as funções Salvar/Carregar integradas

## 🆘 Suporte

Para dúvidas ou problemas:
1. Verifique se todos os arquivos estão na mesma pasta
2. Certifique-se de usar um navegador moderno
3. Verifique se o JavaScript está habilitado
4. Em caso de problemas, recarregue a página (F5)

---

**Desenvolvido com ❤️ usando tecnologias web modernas**

