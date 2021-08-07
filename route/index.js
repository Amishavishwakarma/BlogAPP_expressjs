const express = require("express")
const router = new express.Router()
const serve = require("../controller/index")
const auth = require("../auth")

router.post("/signup", serve.signup)

router.post("/login", serve.login)

router.post("/create_post", auth, serve.create_post)

router.get("/see_post", auth, serve.see_post)

router.post("/like_dislike", auth, serve.like_dislike)

router.get("/see_like_dislike", auth, serve.see_like_dislike)


module.exports = router