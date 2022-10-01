const { validationResult } = require('express-validator');

const User = require('../models/User');

exports.getAll = (req, res, next) => {

    User.fetchAll().then(([rows, fieldData]) => {
        res.status(200).json(rows);
    }).catch(err => console.log(err));
};

exports.createUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'validation failed!',
            errors: errors.array(),
        })
    }
    const { name, email, mobile } = req.body;
    let user = new User(name, email, mobile);
    user.save();
    res.status(201).json({
        message: 'Record created successfully',
    })
};

exports.editUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'validation failed!',
            errors: errors.array(),
        });
    }
    const userId = req.params.id;
    const { name, email, mobile } = req.body;
    let user = new User(name, email, mobile);
    user.editById(userId).then((result) => {
        if (result[0].affectedRows == 1) {
            res.status(200).json({
                'message': 'Record updated successfully'
            });
        } else {
            res.status(201).json({
                'message': 'Record updated failed'
            });
        }
    }).catch(err => console.log(err));
};

exports.deleteUser = (req, res, next) => {
    const userId = req.params.id;
    User.deleteById(userId).then((result) => {
        if (result[0].affectedRows) {
            res.status(202).json({
                'message': 'Record deleted successfully'
            })
        } else {
            res.status(204).json({
                'message': 'Record deleted successfully'
            })
        }
    }).catch(err => console.log(err))
};