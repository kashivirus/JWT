import { createError } from "../error.js"

import User from "../models/Users.js"
import Video from "../models/Video.js"




export const update = async (req, res, next) => {

    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate((req.params.id), {
                $set: req.body
            }, { new: true })

            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    } else {
        return next(createError(403, "You can only update your account"))
    }

}


export const getUser = async (req, res, next) => {

    try {
        const user = await User.findById(req.params.id)

        res.status(200).json(user)
    } catch (error) {
        next(error)
    }

}

export const testUser = async (req, res, next) => {

    try {

        res.status(200).json("testing")
    } catch (error) {
        next(error)
    }

}



export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete((req.params.id))

            res.status(200).json(" user has been deleted ")
        } catch (error) {
            next(error)
        }
    } else {
        return next(createError(403, "You can only delete your account"))
    }
}

export const subscribe = async (req, res, next) => {

    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id }
        })

        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        })
        res.status(200).json("subscritpion successfull")
    } catch (error) {
        next(createError(203, "could not finder persons id"))
    }

}


export const unSubscribe = async (req, res, next) => {

    try {

        try {
            await User.findByIdAndUpdate(req.user.id, {
                $pull: { subscribedUsers: req.params.id }
            })

            await User.findByIdAndUpdate(req.params.id, {
                $inc: { subscribers: -1 }
            })
            res.status(200).json("Unsubscritpion successfull")
        } catch (error) {
            next(error)
        }

    } catch (error) {
        next(error)
    }

}


export const like = async (req, res, next) => {
    const id = req.user.id;
    const videoID = req.user.videoID

    try {

        await Video.findByIdAndUpdate(videoID, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        })

        res.status(200).json("Video has been liked")
    } catch (error) {
        next(error)
    }
}


export const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoID = req.user.videoID

    try {

        await Video.findByIdAndUpdate(videoID, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        })

        res.status(200).json("Video has been liked")
    } catch (error) {
        next(error)
    }

}