<img src="cartridges/int_stackla/cartridge/static/default/images/stackla/vugc-logo.png?raw=true" alt="VUGC | User-Generated Content (UGC) Platform & Asset Manager" width="180">

This is a repository for the SFCC VUGC Integration. It enables:

-   Product feed to VUGC
-   VUGC tracking pixels
-   VUGC front end widget for product detail pages
-   VUGC front end widget for page designer

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

2. Build VUGC:

    - cd into `./vugc-sfcc-main-cartridge`
    - Run `npm install` to install all of the local dependencies (node LTS release recommended)
    - Run `npm run build` to compile base js, css and plugins
    - Add the `int_stackla` cartridge to your cartridge path in _Administration > Sites > Manage Sites > RefArch - Settings_

## Platform

Read more information about the [VUGC | User-Generated Content (UGC) Platform & Asset Manager](https://stackla.com/).
