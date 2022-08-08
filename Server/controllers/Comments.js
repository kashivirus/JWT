import Comments from "../models/Comments.js"
import Video from "../models/Video.js"


export const TestingCommments = (req, res) => {
    res.send("hello world")
    console.log("oj")
}




export const addComment = async (req, res, next) => {
    const newCommment = new Comments({ ...req.body, userId: req.user.id })
    try {

        const savedCommnet = await newCommment.save()
        res.status(200).send(savedCommnet)
    } catch (error) {
        next(error)

    }
}

export const getComment = async (req, res, next) => {

    try {
        const comments = await Comment.find({ videoId: req.params.videoId })
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }

}

export const deleteComment = async (req, res, next) => {
    const comment = await Comment.findById(req.params.id)
    const video = await Video.findById(req.params.id)

    try {
        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("the comment has been deleted")

        } else {
            return next(createError(403, "you can delete only  your own comment"))
        }

    } catch (error) {

    }

}

