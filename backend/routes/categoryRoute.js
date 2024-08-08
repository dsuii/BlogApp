
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/createcategory', categoryController.createCategory);
router.get('/getcategory', categoryController.getCategories);

module.exports = router;
