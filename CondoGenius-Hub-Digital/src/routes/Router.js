module.exports = app => {
  // const meetings = require("../controllers/MeetingsController.js");

  const postsController = require("../controllers/PostController.js");
  const commentsController = require("../controllers/CommentController.js");
  const pollController = require("../controllers/PollController.js");

  var router = require("express").Router();

  router.post("/post/", postsController.createPost);
  router.get("/post/", postsController.listPosts);
  router.get("/post/:id", postsController.getPost); 
  router.get("/post/user/:user_id", postsController.listPostsByUserId)
  router.delete("/post/:id", postsController.deletePost);
  router.put("/pin/:id", postsController.pinPost);

  router.post("/comment/", commentsController.createComment);
  router.get("/comment/:post_id", commentsController.listComments);
  router.get("/comment/:id", commentsController.getComment);
  router.delete("/comment/:id", commentsController.deleteComment);

  router.post("/poll/", pollController.createPoll);
  router.get("/poll/:id", pollController.getPoll);
  router.delete("/poll/:id", pollController.deletePoll);

  router.post("/poll_option", pollController.addPollOption);
  router.delete("/poll_option/:id", pollController.removePollOption);

  router.post("/vote", pollController.votePoll);

  app.use('/api', router);
};