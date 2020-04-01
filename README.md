# [Oodrive](https://www.oodrive.com) - Front-end technical test

This test is part of Oodrive's hiring process for a front-end developer position.

The up-to-date version of this document is located on the main branch, follow [this link](https://github.com/oodrive/front-technical-test/blob/master/README.md) to get there.

# 

[![github](https://badgen.net/badge/icon/Oodrive?icon=github&label)](https://www.oodrive.fr/)

## Table of Contents
   * [Goals Realized](#goals-realized)
   * [Project Structure](#project-structure)
   * [View Demo On FireBase](https://oodrive-files-manager.firebaseapp.com) (See ReadMe before - environement.prod)

## Goals Realized
- All the features that have developed 
    - [X] Display the root files and folders
    - [X] Download a file
    - [X] Upload a file

    - [X] Navigate inside folders
    - [X] Use routing for navigation
    - [X] Rename a file or folder
    - [X] Create a new folder
    - [X] Move a file / folder to another folder
    - [X] Delete a file or a folder
    - [X] Upload multiple files / folders
    - [X] Upload through drag and drop
    - [X] Make the app responsive
    - [X] Filter and search items

## Project Structure

```
    ├── <PROJECT_ROOT>
        └── /api
        └── /bin
        └── /db
        └── /src
            └── /app                                        -  App Module
                ├── app.component.ts
                ├── app.component.html
                ├── app.component.scss
                ├── app-routing.module.ts
                ├── app-routing.ts
                ├── app.module.ts
                └── /core
                    └── /decorators                           - Core Feature Module 
                        ├── auto-unsubscribe.ts
                    └── /services
                        ├── helper.service.ts
                └── /modules                                   - Modules (Components) 
                    └── /files-manager
                        └── /components
                            └── /drag-drop
                            └── /modal-form
                        └──/models 
                        └──/services 
                        ├── files-manager.component.ts  
                        ├── files-manager.component.html
                        ├── files-manager.component.scss   
                        ├── files-manager.component.spec.ts
                        ├── files-manager-routing.module.ts
                        ├── files-manager.module.ts      
                └── /shared                           - Shared Feature Module (shared Components, Directives and Pipes)
                    └── /directives
                        ├── drag-drop.directive.ts                
                    └── /mocks
                        ├── mock-item.ts                
                    └── /shared-module
                        ├── shared.module.ts                
                    └── /utils
                        ├── http-header.ts                
            └── /environments                         - Environment specific configuration   
                ├── environment.ts
                ├── environment.prod.ts
        └── /public                          
            ├── index.html
        ├── angular.json
        ├── extra-webpack.config.json                  - Webpack Configuration
        ├── .editorconfig
        ├── .gitignore
        ├── config.xml
        ├── karma.conf.json           
        ├── package.json
        ├── README.md     
        ├── tsconfig.json
        ├── tslint.json             
```
