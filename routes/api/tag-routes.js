const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product
        }
      ]
    });
    res.status(200).json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
        },
      ]
    });
    if (!tag) {
      res.status(404).json({ error: 'No tag found with this ID!' });
      return;
    }
    res.status(200).json(tag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.post('/', async (req, res) => {
  // {tag_name: 'clumping litter'}
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    const tag = await Tag.findByPk(req.params.id);
    res.status(200).json(tag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
      res.status(404).json({ error: 'No tag found with this ID!' });
      return;
    };
    await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json({ deleted: tag });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
