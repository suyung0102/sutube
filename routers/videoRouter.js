import express from "express";
import routes from "../routes";
import { videos, upload, deleteVideo, videoDetail } from "../controllers/videoController";
import { editProfile } from "../controllers/userController";

const videoRouter = express.Router();

videoRouter.get(routes.videos, videos);
videoRouter.get(routes.upload, upload);
videoRouter.get(routes.videoDetail, videoDetail);
videoRouter.get(routes.editVideo, editProfile);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;