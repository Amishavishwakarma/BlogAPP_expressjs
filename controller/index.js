const Knex = require('knex')
const connection = require('../knexfile')
const knex = Knex(connection["development"])
const jwt = require("jsonwebtoken")


exports.signup = (req, res) => {
    knex("userDetail").insert({
        UserName: req.body.name,
        Email_id: req.body.email,
        password: req.body.password
    }).then(() => {
        const tokon = jwt.sign({ Email_id: req.body.email }, "amishavishwakarma");
        res.cookie('jwt', tokon, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.status(200).send("you have signup sucessfully");
    }).catch((err) => {
        res.send(err)
    })
}

exports.login = (req, res) => {
    knex("userDetail").select("Email_id").where({ Email_id: req.body.email } && { password: req.body.password }).then((result) => {
        if (result.length != 0) {
            const tokon = jwt.sign({ Email_id: req.body.email }, "amishavishwakarma");
            res.cookie('jwt', tokon, { httpOnly: true, secure: true, maxAge: 3600000 });
            res.status(200).send("you have login sucessfully")
        }
        else {
            res.send("you have to signup first")
        }
    }).catch((err) => {
        res.send(err)
    })
}

exports.create_post = (req, res) => {
    knex("post").insert({
        Images: req.body.image,
        like: 0,
        dislike: 0

    }).then((result) => {
        if (result != 0) {
            res.status(200).send("post has been created");
        }
        else {
            res.send("not created")
        }

    }).catch((err) => {
        res.send(err)
    })
}

exports.see_post = (req, res) => {
    knex("post").select("Images")
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        })
}

exports.like_dislike = (req, res) => {
    detail = req.user
    console.log(detail.Email_id)
    knex("post").select("*").where({ Images: req.body.image })
        .then((result) => {
            like = req.body.like
            dislike = req.body.dislike
            if (result.length != 0) {
                if (like == "true") {
                    user_like = result[0]["like"] + 1
                    knex("postDetail").select("Email_Id").where({ Email_id: detail.Email_id }, { images: req.body.image })
                        .then((result_sel) => {
                            if (result_sel.length != 0) {
                                if (result_sel[0]["Email_Id"] != detail.Email_id) {
                                    knex("post").where({ Image: req.body.image }).update({
                                        like: user_like
                                    }).then((result_update) => {
                                        knex("postDetail").insert({
                                            Email_id: detail.Email_id,
                                            Images: req.body.image,
                                            like_or_dislike: like

                                        }).then((result_insert) => {
                                            if (result_insert != 0) {
                                                res.send("thanks for liking the post")
                                            }
                                            else (
                                                res.send("error")
                                            )

                                        }).catch((err) => {
                                            res.send(err)
                                        })
                                    }).catch((err) => {
                                        res.send(err)
                                    })

                                } else {
                                    res.send("you have already like/dislike the post")
                                }
                            } else {
                                knex("post").where({ Images: req.body.image }).update({
                                    like: user_like
                                }).then((result_update) => {
                                    knex("postDetail").insert({
                                        Email_id: detail.Email_id,
                                        Images: req.body.image,
                                        like_or_dislike: like

                                    }).then((result_insert) => {

                                        res.send("thanks for liking the post")


                                    }).catch((err) => {
                                        res.send(err)
                                    })
                                }).catch((err) => {
                                    res.send(err)
                                })
                            }

                        }).catch((err) => {
                            res.send(err)
                        })
                }
                else if (dislike == "false") {
                    user_dislike = result[0]["dislike"] + 1
                    knex("postDetail").where({ Email_id: detail.Email_id }, { images: req.body.image }).select("Email_Id")
                        .then((result_sel) => {
                            console.log(result_sel)
                            if (result_sel.length != 0) {
                                if (result_sel[0]["Email_Id"] != detail.Email_id) {
                                    knex("post").where({ Images: req.body.image }).update({
                                        dislike: user_dislike
                                    }).then((result_update) => {
                                        knex("postDetail").insert({
                                            Email_id: detail.Email_id,
                                            Images: req.body.image,
                                            like_or_dislike: dislike

                                        }).then((result_insert) => {

                                            res.send("thanks for disliking the post")

                                        }).catch((err) => {
                                            res.send(err)
                                        })
                                    }).catch((err) => {
                                        res.send(err)
                                    })

                                } else {
                                    res.send("you have already like/dislike the post")
                                }
                            } else {
                                knex("post").where({ Images: req.body.image }).update({
                                    dislike: user_dislike
                                }).then((result_update) => {
                                    knex("postDetail").insert({
                                        Email_id: detail.Email_id,
                                        Images: req.body.image,
                                        like_or_dislike: dislike

                                    }).then((result_insert) => {

                                        res.send("thanks for disliking the post")


                                    }).catch((err) => {
                                        res.send(err)
                                    })
                                }).catch((err) => {
                                    res.send(err)
                                })
                            }

                        }).catch((err) => {
                            res.send(err)
                        })
                }
                else {
                    res.send("you cannot like/dislike")
                }
            } else {
                res.send("no such data are there")
            }
        }).catch((err) => {
            res.send(err)
        })
}

exports.see_like_dislike = (req, res) => {
    knex("post").select("*")
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        })
}