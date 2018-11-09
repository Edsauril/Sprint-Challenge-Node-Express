const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const actionModel = require("./data/helpers/actionModel");
const projectModel = require("./data/helpers/projectModel");
const server = express();

server.use(helmet());
server.use(morgan("dev"));
server.use(express.json());

server.get("/", (req, res) => {
  res.status(500).json({ api: "running" });
});

//================================================================== <=== Get
server.get("/actions", (req, res) => {
  actionModel
    .get()
    .then(action => {
      console.log(action);
      res.status(200).json(action);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "we failed you, can't get the action", error: err });
      console.error(err);
    });
});

server.get("/projects", (req, res) => {
  projectModel
    .get()
    .then(project => {
      console.log(project);
      res.status(200).json(project);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "we failed you, can't get the project", error: err });
      console.error(err);
    });
});

server.get("/actions/:id", (req, res) => {
  actionModel
    .get(req.params.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: err });
      console.error(err);
    });
});

server.get("/projects/:id", (req, res) => {
  projectModel
    .get(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: err });
      console.error(err);
    });
});
//================================================================== <=== Post
server.post("/actions", (req, res) => {
  console.log("body", req);
  actionModel
    .insert(req.body)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: err });
      console.error(err);
    });
});

server.post("/projects", (req, res) => {
  console.log("body", req.body);
  projectModel
    .insert(req.body)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: err });
      console.error(err);
    });
});

//================================================================== <=== Put
server.put("/actions/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  actionModel
    .update(id, changes)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ message: "error updating this action" });
    });
});

server.put("/projects/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  actionModel
    .update(id, changes)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ message: "error updating this project" });
    });
});
//================================================================== <=== Delete
server.delete("/actions/:id", async function(req, res) {
  const id = req.params.id;
  actionModel
    .remove(id)
    .then(deleteCount => {
      res.status(200).json({
        message: `Delete success, number of actions deleted: ${deleteCount} `
      });
    })
    .catch(err => {
      res.status(500).json({ message: "error deleting this action" });
    });
});

server.delete("/projects/:id", async function(req, res) {
  const id = req.params.id;
  actionModel
    .remove(id)
    .then(deleteCount => {
      res.status(200).json({
        message: `Delete success, number of projects deleted: ${deleteCount} `
      });
    })
    .catch(err => {
      res.status(500).json({ message: "error deleting this project" });
    });
});

module.exports = server;
