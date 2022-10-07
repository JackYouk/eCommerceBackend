const router = require('express').Router();
const { Category, Product } = require('../../models');

// `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product
        }
      ]
    });
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
        },
      ]
    });
    if (!category) {
      res.status(404).json({ error: 'cant find this id' });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.post('/', async (req, res) => {
  // {category_name: 'Cat Litter'}
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    const category = await Category.findByPk(req.params.id);
    res.status(200).json({ updated: category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ error: 'No category found with this ID!' });
      return;
    }
    await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json({deleted: category});
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
