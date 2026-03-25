const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/postsController');
const { validateCreate, validateUpdate } = require('../middleware/validation');

// IMPORTANT: /search must come before /:id so Express doesn't treat "search" as an id
router.get('/search', ctrl.searchPosts);

router.get('/', ctrl.listPosts);
router.get('/:id', ctrl.getPost);
router.post('/', validateCreate, ctrl.createPost);
router.put('/:id', validateUpdate, ctrl.updatePost);
router.delete('/:id', ctrl.deletePost);

module.exports = router;
