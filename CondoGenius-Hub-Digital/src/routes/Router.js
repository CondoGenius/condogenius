module.exports = app => {
  // const meetings = require("../controllers/MeetingsController.js");

  const posts = require("../controllers/PostsController.js");
  const comments = requires("../controllers/CommentsController.js");
  const pollController = requires("../controllers/PollController.js");

  var router = require("express").Router();

  router.post("/post/", posts.createPost);
  router.get("/post/", posts.listPosts);
  router.get("/post/:id", posts.getPost); 
  router.get("/post/resident/:resident_id", posts.listPostsByUserId)
  router.delete("/post/:id", posts.deletePost);

  router.post("/comment/", comments.createComment);
  router.get("/comment/", comments.listComments);
  router.get("/comment/:id", comments.getComment);
  router.delete("/comment/:id", comments.deleteComment);

  router.post("/poll/", pollController.createPoll);
  router.get("/poll/", pollController.listPolls);
  router.get("/poll/:id", pollController.getPoll);
  router.delete("/poll/:id", pollController.deletePoll);

  router.post("/poll_option", pollController.addPollOption);
  router.delete("/poll_option/:id", pollController.deletePollOption);

  router.post("/vote", pollController.votePoll);

  app.use('/api', router);
};