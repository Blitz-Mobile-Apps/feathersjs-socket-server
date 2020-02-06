<a href="https://feathersjs.com/"><img src="https://raw.githubusercontent.com/feathersjs/website/master/assets/img/feathers-logo-wide.png" title="Feathersjs Socket-as-a-Service" alt="feathers logo"></a>

# Socket-as-a-Service implementation using Feathersjs

> Implement sockets in any application within minutes!

> #featherjs #socket #realtime #socket-as-a-service

[![Build Status](http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square)](https://travis-ci.org/badges/badgerbadgerbadger)
[![Coverage Status](http://img.shields.io/coveralls/badges/badgerbadgerbadger.svg?style=flat-square)](https://coveralls.io/r/badges/badgerbadgerbadger)
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

- These are the basic `steps` required to get started

### Clone

- Clone this repo to your local machine using `https://github.com/Blitz-Mobile-Apps/feathersjs-socket-server.git`

### Setup

> Navigate into the repo folder and install the required dependencies

```shell
$ cd path/to/feathersjs-socket-server
$ npm install
```

> wait patiently, it won't take long.

---

## Features

> Provides socket-as-a-service feature to enable socket real-time functionality in any app within minutes.
> This single server can provide many applications the capabilities of socket without a single line of code in their backend.
> Socket emits are supported by triggering them either by `socket emits`, or by `REST API` calls!

## Usage

> Register your application by making the following `POST` Request:

    - endpoint: yourdomain-where-this-server-is-deployed.com/registerService
    - provide the following keys in payload:
        1) appUrl: "This is the path your service will utilize on the server to listen for events."
        2) events: "This is an array of events that your service will trigger. Any event other than these will not be emitted."

---

## Contributing

> This is an early phase of an endless possibility. We are eagerly looking for contributions from the community.
> To get started:

### Step 1

- **Option 1**

  - 🍴 Fork this repo!

- **Option 2**
  - 👯 Clone this repo to your local machine using `https://github.com/Blitz-Mobile-Apps/feathersjs-socket-server.git`

### Step 2

- **HACK AWAY!** 🔨🔨🔨

### Step 3

- 🔃 Create a new pull request.

---

## Support

Reach out to us at our `Website`: <a href="https://blitzmobileapps.com" target="_blank">`Blitz Mobile Apps`</a>

---

## Donations

[![Support via Gratipay](https://cdn.rawgit.com/gratipay/gratipay-badge/2.3.0/dist/gratipay.png)](https://gratipay.com/Blitz-Mobile-Apps/)

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2020 © <a href="http://Blitz-Mobile-Apps.com" target="_blank">Blitz-Mobile-Apps productions</a>.
