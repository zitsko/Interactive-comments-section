const router = require("express").Router();
const commentController = require("../controllers/commentController.js");

router.get("/", commentController.getAllComments);
router.post("/", commentController.postOneComment);
router.delete("/:id", commentController.deleteComment);
router.put("/:id", commentController.editComment);
router.get("/:userId", commentController.getAllUserComments);
router.post("/:commentId/reply", commentController.postReply);

module.exports = router; 