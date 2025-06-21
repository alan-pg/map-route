# Resumo do Projeto: Map Route

Este documento resume o escopo, as tecnologias e as funcionalidades implementadas no projeto "Map Route", uma aplicação moderna de roteirização e monitoramento construída com Next.js.

## Tecnologias Principais

A arquitetura do projeto foi construída sobre um conjunto de tecnologias modernas e robustas, visando alta performance, excelente experiência de desenvolvimento e manutenibilidade.

- **Framework:** Next.js 15+ (com App Router)
- **Linguagem:** TypeScript
- **Estilização:** TailwindCSS + shadcn/ui
- **Mapa:** Leaflet com react-leaflet
- **Ícones:** lucide-react e react-icons
- **Requisições HTTP:** axios
- **Gerenciamento de Estado:**
  - **Zustand:** Para estado global persistente (ex: estado da sidebar de navegação).
  - **Hooks Customizados (`useMap`):** Para estado local e complexo de funcionalidades específicas.

## Funcionalidades Implementadas

O projeto evoluiu de uma aplicação básica para um sistema com funcionalidades complexas e uma arquitetura bem definida.

### 1. Estrutura e Estilização da UI

- **Sistema de Design Moderno:** Integração completa com `shadcn/ui` para componentes de UI acessíveis, consistentes e customizáveis.
- **Tema Light/Dark:** Suporte nativo a temas claro e escuro.
- **Sidebar de Navegação Persistente:** A sidebar principal, que dá acesso a todas as páginas, mantém seu estado (aberta/fechada) mesmo após a atualização da página, utilizando `zustand` e `localStorage`.

### 2. Mapa Interativo (`/map`)

A página do mapa é o coração da aplicação e conta com:

- **Visualização de Itens e Rotas:** Uma barra lateral secundária com abas permite alternar entre a visualização de itens rastreáveis individuais e rotas pré-definidas.
- **Marcadores (Markers) Customizados:** Ícones em SVG, de alta qualidade e com design profissional, para representar diferentes tipos de itens (veículos, tags, smartphones) e pontos de uma rota (início, fim, paradas).
- **Desenho de Rotas:** Capacidade de renderizar rotas completas no mapa, com uma polilinha estilizada (efeito de "casing") e marcadores para cada ponto de parada.
- **Centralização Inteligente:** O mapa se ajusta automaticamente para enquadrar uma rota completa (`fitBounds`) ou para centralizar em um item individual selecionado (`setView`).
- **Cálculo de Rota via API:**
  - Um endpoint de backend (`/api/calculate-route`) foi criado para fazer a interface com a API de Rotas do Google.
  - O endpoint é "funcional" para desenvolvimento, retornando dados de mock, e está preparado para receber uma chave de API real via variáveis de ambiente (`.env.local`) de forma segura.
  - A rota pode ser solicitada com múltiplos pontos de parada e data/hora de partida.


### 3. Arquitetura e Boas Práticas

- **Componentização:** A lógica foi dividida em componentes pequenos e reutilizáveis, como o `<CustomMarker />`, que é autossuficiente.
- **Hooks Customizados:** O estado complexo da página de mapa foi abstraído para o hook `useMap`, limpando o componente da página e tornando a lógica reutilizável.
- **Renderização no Servidor (SSR):** Todos os problemas de `window is not defined` foram resolvidos utilizando a abordagem correta de `dynamic import` com `ssr: false` para componentes que dependem de bibliotecas de cliente como o Leaflet.
- **Separação de Código:** A lógica de criação de ícones, tipos, dados de mock e estado foi mantida em arquivos e pastas separadas, seguindo as melhores práticas de organização de projetos.