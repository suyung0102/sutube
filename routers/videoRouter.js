import express from "express";
// const express = require('express');
import routes from "../routes";
import {
  videoDetail,
  getUpload,
  postUpload,
  deleteVideo,
  getEditVideo,
  postEditVideo,
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

// Upload
videoRouter.get(routes.upload, getUpload);
// 라우터 하나에 여러개의 미들웨어를 넣을 수 있음
videoRouter.post(routes.upload, uploadVideo, postUpload);

// Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

// Delete
videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;
// module.exports = router;
