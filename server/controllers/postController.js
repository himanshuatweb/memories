import mongoose from 'mongoose';
import PostModel from '../model/postModel.js';

// Get All Posts
export const getPosts = async (req, res) => {
  const { page } = req.query;
  console.log('In getPosts() controller', page);
  try {
    const LIMIT = 4;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    const total = await PostModel.countDocuments({});

    const posts = await PostModel.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({
      msg: 'Something went wrong in GET ALL POSTS',
      message: error.message,
    });
  }
};

//Get Single Post
export const getSinglePost = async (req, res) => {
  const _id = req.params.id;
  console.log('In getSinglePost() controller', _id);
  try {
    //Check for valid moongoose id.
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(404).json({ message: 'No post with that id' });
      return;
    }

    const post = await PostModel.findById(_id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({
      msg: 'Something went wrong in GET SINGLE POST',
      message: error.message,
    });
  }
};

//Get Post By Search
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  console.log('I ran in getPostsBySearch', req.query);

  try {
    const title = new RegExp(searchQuery, 'i');

    const posts = await PostModel.find({
      $or: [{ title }, { tags: { $in: tags.split(',') } }],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({
      msg: 'Something went wrong in SEARCH POSTS',
      message: error.message,
    });
  }
};

//Create Single Post
export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostModel({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();

    console.log('POST CREATED SUCCESSFULLY');
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({
      msg: 'Something went wrong in creating a post',
      message: error.message,
    });
  }
};

//Update Post
export const updatePost = async (req, res) => {
  const _id = req.params.id;
  const post = req.body;
  try {
    //Check for valid moongoose id.
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(404).json({ message: 'No post with that id' });
      return;
    }

    //Check for given passed present or not.
    const findPost = await PostModel.findById(_id);
    if (!findPost) {
      res.status(404).json({ message: 'No post with that id' });
      return;
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      _id,
      {
        ...post,
        _id,
      },
      { new: true }
    );
    console.log('POST UPDATED');
    console.log(updatedPost.title);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({
      msg: 'Something went wrong in creating a post',
      message: error.message,
    });
  }
};

//Delete Post
export const deletePost = async (req, res) => {
  const _id = req.params.id;

  try {
    //Check for valid moongoose id.
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(404).json({ message: 'No post with that id' });
      return;
    }

    //Check for given passed present or not.
    const findPost = await PostModel.findById(_id);
    if (!findPost) {
      res.status(404).json({ message: 'No post with that id' });
      return;
    }

    await PostModel.findByIdAndRemove(_id);
    console.log('Post delete Successfully');
    res.status(204).json({ message: 'Post delete Successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: 'Something went wrong deleting post',
      message: error.message,
    });
  }
};

//like Post on Particular Post
export const likePost = async (req, res) => {
  const _id = req.params.id;
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Not Authorized' });
    }

    //Check for valid moongoose id.
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(404).json({ message: 'No post with that id' });
      return;
    }

    //Check for given post present or not.
    const post = await PostModel.findById(_id);
    if (!post) {
      res.status(404).json({ message: 'No post with that id' });
      return;
    }

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostModel.findByIdAndUpdate(_id, post, {
      new: true,
    });
    console.log(`Likes Updated `, updatedPost.likes);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: 'Something went wrong updating like post value.',
      message: error.message,
    });
  }
};

//Comment on Particular Post
export const commentPost = async (req, res) => {
  const _id = req.params.id;
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Not Authorized' });
    }

    //Check for valid moongoose id.
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(404).json({ message: 'No post with that id' });
      return;
    }

    //Check for given post present or not.
    const post = await PostModel.findById(_id);
    if (!post) {
      res.status(404).json({ message: 'No post with that id' });
      return;
    }

    post.comments.push(req.body.comment);

    const updatedPost = await PostModel.findByIdAndUpdate(_id, post, {
      new: true,
    });

    console.log(`Comments Updated `, updatedPost.comments);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: 'Something went wrong on commenting on post.',
      message: error.message,
    });
  }
};
