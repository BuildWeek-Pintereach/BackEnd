module.exports = function restricted(req, res, next) {
    res.status(401).json({message: "invalid"});
};