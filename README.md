# Stackla

This is a repository for the SFCC Stackla Integration. It enables:

-   Product feed to stackla
-   Stackla tracking pixels
-   Stackla front end widget for product detail pages
-   Stackla front end widget for page designer

## VS Code Setup

We will be using VS code as our standard IDE. Please install the following plugins:

-   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Opinionated Code Formatter
-   [Prophet](https://marketplace.visualstudio.com/items?itemName=SqrTT.prophet) - SFCC Plugin

## Getting Started

1. Build SFRA:

    - cd into `./storefront-reference-architecture`
    - Run `npm install` to install all of the local dependencies (node LTS release recommended)
    - Run `npm run build` to compile base js, css and plugins
    - Add the SFRA storefront cartridge to your cartridge path in _Administration > Sites > Manage Sites > RefArch - Settings_

2. Build Stackla:

    - cd into `./int_stackla`
    - Run `npm install` to install all of the local dependencies (node LTS release recommended)
    - Run `npm run build` to compile base js, css and plugins
    - Add the `int_stackla` cartridge to your cartridge path in _Administration > Sites > Manage Sites > RefArch - Settings_
