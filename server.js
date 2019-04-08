const express = require('express');
//const people = require('./people.json');
const homepagedata = require('./homepagedata.json');

const app = express();

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Imran G. MacMillan',
  //  people: people.profiles,
    homepagedata: homepagedata.competencies
  });
});

app.get('/comps', (req, res) => {
  const comp = homepagedata.competencies.find(p => p.id === req.query.id);
  res.render('comps', {
    title: `About ${comp.type} ${comp.qualifications}`,
    comp,
  });
});

const server = app.listen(7000, () => {
  console.log(`Express running -> PORT ${server.address().port}`);
});
