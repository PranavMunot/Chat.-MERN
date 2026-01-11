const asyncHandler = (executerFn) => async (req, res, next) => Promise.resolve(executerFn(req, res, next)).catch(next)
module.exports = asyncHandler