const path = require("path");
const favicon = require("serve-favicon");
const compress = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("./logger");

const feathers = require("@feathersjs/feathers");
const configuration = require("@feathersjs/configuration");
const express = require("@feathersjs/express");
const socketio = require("@feathersjs/socketio");

const middleware = require("./middleware");
const MyService = require("./services/MyService");
const appHooks = require("./app.hooks");
const channels = require("./channels");

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get("public"), "favicon.ico")));
// Host the public folder
app.use("/", express.static(app.get("public")));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
// app.configure(services);

function setupService(service) {
  // const filteredEvents = service.events.map(eachEvent => eachEvent.name);
  const { appUrl, events } = service;
  app.configure(app =>
    app.use(
      appUrl,
      new MyService(
        {
          events: events,
          path: appUrl
        },
        app
      )
    )
  );
  // Set up event channels (see channels.js)
  app.configure(channels);

  app.use(
    express.errorHandler({
      logger
    })
  );

  app.hooks(appHooks);
}

app.post("/registerService", (req, res) => {
  let { appUrl, events } = req.body;
  console.log("path:", appUrl);
  if (appUrl && events && events.length) {
    if (app.service(appUrl) == undefined) {
      if (!events.includes("broadcast")) {
        events.push("broadcast");
      }
      setupService(req.body);
      res.status(200).send(`Service started successfully at path: /${appUrl}`);
    } else {
      res.status(400).send({
        error: "Service already registered!",
        service: app.service(appUrl)
      });
    }
  } else {
    res.status(400).send({
      error: "Invalid payload provided!",
      payload: req.body
    });
  }
});

app.post("/editService", (req, res) => {
  const { service } = req.body;
  const thisService = app.service(service.path);
  console.log("Requested service: ", service);
  console.log("Found service: ", thisService);
  if (service.path == undefined || service.path.length < 1) {
    res.status(400).send({
      error: "Service path not provided."
    });
  } else if (service.events == undefined || service.events.length < 1) {
    res.status(400).send({
      error: "Service events not provided."
    });
  } else if (thisService !== undefined && service.events !== undefined) {
    console.log("Restarting service....");
    setupService(service);
    var myServiceIndex = myData.services.findIndex(
      newService => newService.path == service.path
    );
    console.log("Service index in array: ", myServiceIndex);
    if (myServiceIndex > -1) {
      myData.services[myServiceIndex] = {
        ...myData.services[myServiceIndex],
        ...service
      };
    }
    res.status(200).send({
      message: "Service restarted successfully"
    });
  } else {
    res.status(422).send({
      error: "Service not found"
    });
  }
});

// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
// app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
