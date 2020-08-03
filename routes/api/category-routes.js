const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Category, Product } = require('../../models');
const Op = sequelize.Op

// find all categories with its associated Products
router.get('/', (req, res) => {
  Category.findAll({
      include: [{
        model: Product, 
        foreingKey: 'category_id',
      }]
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// find one category by its `id` value and its associated Products
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product, 
     // where: { category_id: sequelize.col('category.id')}
    }]
  })
  .then(dbData => {
    if (!dbData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// create a new category
router.post('/', (req, res) => { 
  Category.create({
    category_name: req.body.category_name,
  })
  .then(dbData => res.json(dbData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbData => {
      if (!dbData[0]) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
      }
      res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});  

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    } 
  })
    .then(dbData => {
      console.log(dbData)
      if (!dbData) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
      }
      res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
