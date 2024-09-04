# Getting Started

Welcome to the educational CAP on TypeScript monorepo project - Mortgage calculator.

It contains these folders and files

Workspaces | Purpose
---------|----------
`database/` | Package @mortgagecalc/database for the shared domain model and data. Important: see the build config in root folder of the project. Reason: artifacts generated by cds services must be deployed as well.
`app/` | content for UI frontends goes here
`packages/foundation` | package @mortgagecalc/foundation contains shared cds (including i18n - for this at least an empty index.cds is required) and classes
`srv/calculator` | package @mortgagecalc/calculatorservice contains the service which is responsible for only mortgage calculations
`srv/site` | package @mortgagecalc/siteservice contains the service for the site UI

Every CAP package has the standard structure, following CAP recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`database/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide

## Installation

###### 1. Install [TypeScript](https://www.typescriptlang.org/download/)
    npm install typescript -g

###### 2. Install dependencies.
    npm i

Due to the monorepo structure it has to be done just once in the root folder.

###### 3. Deploy tables / views and master data to SQLite
    cds d

## Run

All listed run commands have respective run configurations in in .vscode/launch.json

### Run CAP services
    npx cds-ts serve -p @mortgagecalc/cap-server

The @mortgagecalc/cap-server package is designed for local run of all CAP services in one Node.js instance.

### Run approuter
    npm run dev -w @mortgagecalc/approuter

Current approuter is a PoC in the PoC:
it's based on non-official [@sap/approuter](https://www.npmjs.com/package/@sap/approuter) extension: [dev-approuter](https://www.npmjs.com/package/dev-approuter). This extension should be able to raise CAP and approuter hosts with one console command instead of two. But it appears that it doesn't allow to select a command to start CAP server => it can't work with TypeScript so that it's working as a regular approuter.

## Build

- To perform the build run `mbt build`.
- The required build sequence can be seen in the `build-parameters` section of mta.yaml
- Related duscussion: https://github.com/cap-js/cds-typer/issues/271

## Deploy

As per usual, deploy mtar created by `mbt build`.

## Remote debug

cf ssh -N -L 9229:127.0.0.1:9229 mortgagecalc-calculator-service
cf ssh -N -L 9229:127.0.0.1:9229 mortgagecalc-site-service

## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.

## Q&A

Q: Any known issues to track?
A: Waiting for next Typer issue to be resolved: https://github.com/cap-js/cds-types/issues/136. Until then the package "@cap-js/cds-types": ">=0.6.1" must be installed manually.
