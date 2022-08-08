import { createError } from "../error.js"
import User from "../models/Users.js"
import Video from "../models/Video.js"


export const debug = async (req, res, next) => {
    console.log("hello world")
    res.send("")
}



export const addVideo = async (req, res, next) => {

    const newVideo = new Video({ userId: req.user.id, ...req.body })

    try {
        const savedVideo = await newVideo.save()
        res.status(200).json(savedVideo)
    } catch (error) {
        next(error)
    }

}

export const updateVideo = async (req, res, next) => {

    try {
        const videos = await Video.findById(req.params.id)

        if (!videos) return next(createError(203, "there was  no video to update"))

        if (req.user.id === videos.userId) {
            const updateVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(updateVideo)

        } else {
            return next(createError(404, "You can update only your own video"))
        }

    } catch (error) {
        next(error)
    }
}

export const deleteVideo = async (req, res, next) => {
    try {
        const videos = await Video.findById(req.params.id)

        if (!videos) return next(createError(203, "Video Not Found"))

        if (req.user.id === videos.userId) {
            await Video.findByIdAndDelete(req.params.id)
            res.status(200).json("video has been deleted")

        } else {
            return next(createError(404, "You can update only your own video"))
        }

    } catch (error) {
        next(error)
    }

}


export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }
}



export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        });
        res.status(200).json("The view has been increased.");
    } catch (err) {
        next(err);
    }
};




export const random = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};



export const trend = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};





export const sub = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map(async (channelId) => {
                return await Video.find({ userId: channelId });
            })
        );

        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt))
    } catch (err) {
        next(err);
    }
};




export const getByTag = async (req, res, next) => {

    const tags = req.query.tags.split(",")
    try {


        const videos = await Video.find({ tags: { $in: tags } }).limit(20)

        res.send(tags)
    } catch (err) {
        next(err);
    }
};



export const search = async (req, res, next) => {

    const query = req.query.q
    try {
        const videos = await Video.find({ title: { $regex: query, $options: "i" } }).limit(40)
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};