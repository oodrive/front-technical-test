# [Oodrive](https://www.oodrive.com) - Front-end technical test

This test is part of Oodrive's hiring process for a front-end developer position. It should take 3 to 6 hours of your time.

> **Feel free to apply!**  
> **Contact us through [our application page](https://careers.oodrive.com/fr/candidature/spontanee).**
>
> You can also find the list of open positions at Oodrive on [our careers page](https://careers.oodrive.com/fr/annonces).

## Objective

The goal of this technical test is to code a small file manager app. It will require you to read, understand and implement an unknown API using JavaScript, and create a basic user interface to present the data.

### Structure

In this repository's main branch you are provided with a webpack-based boilerplate that allows you to quickly start developing your app in **TypeScript** and **Sass** (the stack also supports **JavaScript** and **CSS**). That being said, you are free to change anything you want.

The following branches have also been initialized with their appropriate tooling:

- [Angular](https://github.com/oodrive/front-technical-test/tree/angular)
- [React](https://github.com/oodrive/front-technical-test/tree/react)

Although we are working with Angular at Oodrive, there is _no limitation_ in the frameworks and libraries you can use for this test.

### API

The **api** directory contains the code for the mock file manager API you will be using, so you don't have to change anything in those files (you can of course take a look inside if you want). For more convenience, you can [check out the OpenAPI documentation here](https://generator.swagger.io?url=https://raw.githubusercontent.com/oodrive/front-technical-test/master/openapi.yml).

From your code, you can access it at `/api` (technically `http://localhost:8080/api` but the former is preferred, to allow us to deploy your app automatically for our internal review).

### What we're expecting

We expect your code to work without bugs and implement the following features:

- Display the root files and folders
- Download a file
- Upload a file

We also expect your code to be a reflection of yourself at work, so we will be attentive to the choices you'll make regarding code architecture, readability and performance.

### What we're not expecting

We suggest you don't spend too much time on your UI, we know how time intensive it can be. The same can be said for browser compatibility, just make sure your app works in one evergreen browser, like Chrome for instance.

### Bonus features

If you have some time left and want to go a little bit further, here are some feature ideas you can add to this app:

- Navigate inside folders
- Use routing for navigation
- Rename a file or folder
- Create a new folder
- Move a file / folder to another folder
- Delete a file or a folder
- Upload multiple files / folders
- Upload through drag and drop
- Make the app responsive

## Quick start

```
npm ci
npm start
```

## Submission

The quickest way to submit your work is by [forking](https://github.com/oodrive/front-technical-test/fork) this repository, then sending us a Pull Request after you're done.

Alternatively, you can copy this repository to your personal space, and send us a link to your branch (if you make your repo private, you'll need to [invite us as collaborators](https://help.github.com/en/articles/inviting-collaborators-to-a-personal-repository)).

If this is an unsolicited application, you can contact us with the link to your pull request on [our application page](https://careers.oodrive.com/fr/candidature/spontanee).

