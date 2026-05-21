Atividade: Desenvolvimento de Aplicativo Mobile - Lista de Compras
Estudante: Lucas Enzo Valim

Disciplina: Desenvolvimento Mobile

Framework: React Native (Expo Managed Workflow)

1. Descrição do Projeto
Este aplicativo foi desenvolvido para a gestão de itens de consumo, permitindo a organização de compras através de uma interface intuitiva. O projeto contempla o uso de estados do React, renderização de listas otimizadas e persistência de dados em armazenamento local.

2. Funcionalidades Implementadas
Cadastro de Itens: Inclusão de nome do produto e seleção de categoria (Geral, Alimento, Limpeza e Bebida).

Listagem Otimizada: Exibição dos dados através do componente FlatList para garantir performance.

Gestão de Status: Funcionalidade para marcar e desmarcar itens como finalizados, com alteração visual automática.

Contadores em Tempo Real: Painel superior que exibe a quantidade de itens pendentes e concluídos.

Persistência Local: Armazenamento dos dados via AsyncStorage, garantindo que as informações não sejam perdidas ao fechar o aplicativo.

Exclusão de Dados: Opção para remover itens individualmente ou limpar toda a lista mediante confirmação.

3. Requisitos de Ambiente
Node.js (LTS recomendado)

Gerenciador de pacotes npm ou yarn

Expo Go instalado no dispositivo móvel ou Emulador Android (Android Studio)

4. Instruções de Instalação e Execução
Passo 1: Clonar o repositório
Bash
git clone https://github.com/LucasEVAvila/lista_de_compras_mobile.git
cd lista_de_compras_mobile
Passo 2: Instalar as dependências
Bash
npm install
Passo 3: Sincronizar bibliotecas do Expo (SDK 55)
Bash
npx expo install expo@^55.0.0
npx expo install --fix
Passo 4: Instalar componentes específicos
Bash
npx expo install @react-native-async-storage/async-storage @react-native-picker/picker
Passo 5: Iniciar a aplicação
Bash
npx expo start -c
5. Tecnologias Utilizadas
React Native / Expo: Framework base para o desenvolvimento.

AsyncStorage: Persistência de dados local.

Picker: Componente de seleção de categorias.

Vector Icons: Biblioteca de ícones para interface.# lista_de_compras_mobile
