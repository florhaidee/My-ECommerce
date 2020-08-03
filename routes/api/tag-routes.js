const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { associations } = require('../../models/Tag');

// The `/api/tags` endpoint

// get all tags with its associated Products data
router.get('/', (req, res) => {
  Tag.findAll({
    include: [{
      model: Product,
      through: {
        attributes: ['product_id', 'tag_id'],
      }
    }]
  })
  .then(dbData => res.json(dbData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// find a single tag by its `id` and include its associated Product data
router.get('/:id', (req, res) => {
  Tag.findOne({
    where:{
      id: req.params.id
    },
    include: [{
      model: Product,
      through: {
        attributes: ['product_id', 'tag_id'],
      },
    }]
  })
  .then(dbData => res.json(dbData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then(dbData => res.json(dbData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
