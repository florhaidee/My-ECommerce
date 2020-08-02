const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  // find all categories with its associated Products
  Category.findAll({
      include: [{
        model: Product, 
        where: { category_id: sequelize.col('category.id')}
      }]
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value and its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product, 
      where: { category_id: sequelize.col('category.id')}
    }]
  }).then(dbData => res.json(dbData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
