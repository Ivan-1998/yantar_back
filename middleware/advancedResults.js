const advancedResults = (model) => async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };
  const removeFields = ['only', 'sort', 'page', 'limit'];

  removeFields.forEach(param => delete reqQuery[param]);
  query = model.find(reqQuery);

  if (req.query.only) {
    const fields = req.query.only.split(',').join(' ');
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);
  const results = await query;

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.advancedResults = {
    success: true,
    data: results,
    pagination
  };

  next();
}

module.exports = advancedResults;