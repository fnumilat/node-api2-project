const express = require("express")
const db = require("./data/db")

const router = express.Router()

//Getting all the posts
router.get("/", (req, res) => {
    db.find()
    .then((posts) => {
        res.json(posts)
    })
    .catch((error) => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

//Getting posts by their IDs
server.get("/:id", (req, res) => {
    db.findById(req.params.id)
    .then((post) => {
        if (post) {
            res.json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch((error) => {
        res.json(500).json({ error: "The post information could not be retrieved." })
    })
})

//Getting comments of a specific post
server.get("/:id/comments", (req, res) => {
    db.findPostComments(req.params.id)
    .then((post) => {
        if (post) {
            res.json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch((error) => {
        res.json(500).json({ error: "The comments information could not be retrieved." })
    })
})

//Posting a Post
server.post("/", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } 

    db.insert(req.body)
    .then((post) => {
        res.json(post)
    })
    .catch((error) => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})

//Posting a comment in a post using a specific ID
server.post("/:id/comments", (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }

    db.insertComment(req.body.text, req.params.id)
    .then((comment) => {
        res.status(201).json(comment)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    })
})

//Updating a Post with specific ID
server.put("/:id", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } 

    db.update(req.params.id, req.body)
    .then((post) => {
        res.json(post)
    })
    .catch((error) => {
        res.status(500).json({ error: "The post information could not be modified."})
    })
})

//Deleting a Post with specific ID
server.delete("/:id", (req, res) => {
    db.remove(req.params.id)
    .then((count) => {
        if (count > 0) {
            res.status(200).json({message: "The Post is deleted."})
        }
    })
    .catch((error) => {
        res.status(500).json({ error: "The post information could not be modified." })
    })
})


module.exports = router