var express = require('express')
var router = express.Router()
const fs = require('fs')

/* GET tasks listing. */
router.get('/', function (req, res, next) {
  const dataPath = req.current_dir + '/data.json'
  const list = require(dataPath)
  res.render('task_list', {
    title: 'My tasks list',
    list,
  })
})
router.get('/add', function (req, res, next) {
  res.render('task_add_form', {
    title: 'Creation of new task',
  })
})
//Обробляємо дані, що надіслано методом get
router.get('/add_new', function (req, res, next) {
  const dataPath = req.current_dir + '/data.json'
  const list = require(dataPath)
  list.push({
    id: new Date().getTime(),
    title: req.query.taskTitle,
    priority: parseInt(req.query.taskPriority),
  })
  fs.writeFile(dataPath, JSON.stringify(list), function (err) {
    if (err) {
      res.render('error', {
        message: 'Creation error',
        error: err,
      })
    }
    res.redirect('/tasks')
  })
})
//Обробляємо дані, які надіслано методом post
router.post('/add', function (req, res, next) {
  const dataPath = req.current_dir + '/data.json'
  const list = require(dataPath)
  list.push({
    id: new Date().getTime(),
    title: req.body.taskTitle,
    priority: parseInt(req.body.taskPriority),
  })
  fs.writeFile(dataPath, JSON.stringify(list), function (err) {
    if (err) {
      res.render('error', {
        message: 'Creation error',
        error: err,
      })
    }
    res.redirect('/tasks')
  })
})
module.exports = router
