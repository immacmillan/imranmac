'use strict';
let mongoose = require('mongoose'),
  	Counter = require('./Counter'),
  	User = require('./User');
const MSINDAY = 86400000;
// const LocalStorage = require('node-localstorage').LocalStorage;
// const localStorage = new LocalStorage('./html/assets/local');


var MessageSchema = mongoose.Schema({
  	title: {
      type: String,
  	},
  	user: [{
  		type: mongoose.Schema.Types.ObjectId,
  		ref: 'User'
  	}],
  	messageDescription: String,
    messageCategory: {
  		type: String,
  	},
  	updateCounter: {
  		type: Number,
  		default: 0
  	},
  	updatedAt: {
  		type: Date,
  		default: new Date(new Date().setHours(0, 0, 0, 0)),
  	},
  	createdAt: {
  		type: Date,
  		default: new Date().setHours(0, 0, 0, 0),
  	},
  	activeMessage: {
  		type: Boolean,
  		default: true,
  	},
  	customId: {
  		type: Number,
  		default: 1,
  		required: true,
  	},
  });
  /**
   * This function is called before a habit is saved
   */
  HabitSchema.pre('save', function (next) {
  	this.createdAt = new Date().setHours(0, 0, 0, 0);
  	next();
  });

  HabitSchema.pre('save', function (next) {
  	var habitCustomId = this.title;
  	Counter.count({}, function (err, c) {
  		if (err) return next(err);
  		else if (c === 0) {
  			Counter.update({
  				_id: '0',
  				seq: 2,
  			}, {
  					_id: '0',
  					seq: 2,
  				}, {
  					upsert: true
  				}).exec();
  			localStorage.setItem('habitId2', 1); //for multiple users i might need a different name for the item (based on users name or maybe habit name? probably habit title and enforce unique)
  		}
  		else if (c !== 0) {
  			Counter.findByIdAndUpdate({ _id: '0' }, { $inc: { seq: 1 } }, function (err, counted) {
  				var x = counted.seq;
  				localStorage.setItem('habitId2', counted.seq);
  				console.log('WORKED to increment seq   -' + x + ' counted.seq --   ' + counted.seq);
  			});
  		}
  	});
  	next();
});

HabitSchema.pre('findOneAndUpdate', function () {
	this.update({}, { $set: { updatedAt: new Date().setHours(0, 0, 0, 0) } });
});


module.exports = mongoose.model('Habit', HabitSchema);
