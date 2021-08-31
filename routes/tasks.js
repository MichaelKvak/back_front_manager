var express = require('express')
var router = express.Router()
//1.Імпортували модуль
const mongoose = require('mongoose')

//2. Встановлюємо з"єднання
mongoose.connect('mongodb://localhost:27017/tasks_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

//3. Свторюємо схему
const Schema = mongoose.Schema
// Створення схеми моделі
const tasksSchema = new Schema({
  title: String,
  priority: Number,
})

//4. Створення моделі
const Task = mongoose.model('Task', tasksSchema)

/* GET tasks listing. */
router.get('/', function (req, res, next) {
  //5. Вибірка усіх документів з бази
  Task.find({}, function (err, docs) {
    // mongoose.disconnect();
    if (err)
      return res
        .status(500)
        .json({ success: false, err: { msg: 'Fetch faild!' } })
    res.status(200).json({ success: true, data: docs })
  })
})

//Обробляємо дані, які надіслано методом post
router.post('/add', function (req, res, next) {
  //5. Створення документа
  const task = new Task({
    title: req.body.taskTitle,
    priority: parseInt(req.body.taskPriority),
  })
  //6. Збереження документа
  task.save(function (err, prodDoc) {
    // mongoose.disconnect();  // від’єднання від бази даних
    if (err)
      return res
        .status(500)
        .json({ success: false, err: { msg: 'Saving faild!' } })
    res.status(200).json({ success: true, taskId: prodDoc._id })
  })

  // const dataPath = req.current_dir + '/data.json'
  // const list = require(dataPath)
  // list.push({
  //   id: new Date().getTime(),
  //   title: req.body.taskTitle,
  //   priority: parseInt(req.body.taskPriority),
  // })
  // fs.writeFile(dataPath, JSON.stringify(list), function (err) {
  //   if (err) {
  //     res.render('error', {
  //       message: 'Creation error',
  //       error: err,
  //     })
  //   }
  //   res.redirect('/tasks')
  // })
})

router.delete('/', function (req, res, next) {
  Task.findByIdAndDelete(req.body.taskId, function (err, doc) {
    if (err)
      return res
        .status(500)
        .json({ success: false, err: { msg: 'Delete faild!' } })
    res.status(200).json({ success: true })
  })
})
module.exports = router
