const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const POST = mongoose.model("POST")

//  Route
router.get("/allposts", requireLogin, (req, res) => {
    POST.find()
        .populate("postedBy", "_id name userName")
        .then(posts => res.json(posts))
        .catch(err => console.log(err))
})


router.post("/createPost", requireLogin, (req, res) => {
    const { caption, imageUrl } = req.body;
    console.log(imageUrl)
    if (!caption || !imageUrl) {
        return res.status(422).json({ error: "Please add both image and caption" })
    }
    // console.log(req.user);
    const post = new POST({
        caption,
        photo: imageUrl,
        postedBy: req.user
    })
    post.save().then((result) => {
        return res.json({ post: result })
    }).catch(err => console.log(err))
})


router.get("/myposts", requireLogin, (req, res) => {
    // console.log(req.user)
    POST.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name userName followers following")
        .populate("comments.commentedBy", "_id userName")
        .then(myposts => {
            res.json(myposts)
        })
})

router.put("/like", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    },
        {
            new: true
        })
        .populate("postedBy", "_id name userName")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })

})


// router.get("/myposts", requireLogin, (req, res) => {
//     // console.log(req.user)
//     POST.find({ postedBy: req.user._id })
//         .populate("postedBy", "_id name userName")
//         .then(myposts => {
//             res.json(myposts)
//         })
// })

router.put("/unlike", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    },
        {
            new: true
        })
        .populate("postedBy", "_id name userName")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })

})

router.put("/comment", requireLogin, (req, res) => {
    const com = {
        comment: req.body.text,
        commentedBy: req.user._id
    }
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { comments: com }
    },
        {
            new: true
        })
        .populate("comments.commentedBy", "_id userName")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        }) 
})


router.post("/allcomments", requireLogin, (req, res) => {
    // console.log(req.body)
    POST.find({_id: req.body.postId})
    .populate("comments.commentedBy", "_id userName")
        .then(post => res.json(post))
        .catch(err => console.log(err))
})


// Api to delete post
router.delete("/deletePost/:postId", requireLogin, (req,res) => {
    // console.log(req.params.postId)
    POST.findOne({_id: req.params.postId})
    .populate("postedBy", "_id")
    .exec((err,post)=>{
        if(err || !post){
            return req.status(422).json({error:err})
        }
        // console.log(post.postedBy._id.toString() , req.user._id.toString());
        if(post.postedBy._id.toString() , req.user._id.toString()){
            post.remove()
            .then(result => {
                return res.json({message:"Successfully Deleted"})
            }).catch((err) => {
                console.log(err)
            })
        }
    })


})

// to show following post
router.get("/myfollowingpost", requireLogin, (req, res) => {
    POST.find({postedBy: {$in: req.user.following}})
    .populate("postedBy", "_id name userName")
    .populate("comments.commentedBy", "_id name")
    .then(posts=>res.json(posts))
    .catch(err => {console.log(err)})
})


module.exports = router