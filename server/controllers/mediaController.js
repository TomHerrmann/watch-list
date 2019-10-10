const express = require('express');
const app = express();
const path = require('path');
const pool = require('../db');

const user = "Tom"
// get rid of this hard coding once user logins are setup
const name = user

module.exports = {
  getMedia: (req, res, next) => {
    // query SELECT movies FROM watchlist WHERE watch="false ;";
    const dbQuery = 'SELECT id, title, year, rt, plot FROM watchlist WHERE name = $1';
    const valuesArr = [name]
    res.locals.feedData = []
    pool.query(dbQuery, valuesArr)
      .then(data => {
        if (!data) return next()
        data.rows.forEach(elem => {
          res.locals.feedData.push(elem)
        })
        return next();
      })
  },

  postMedia: (req, res, next) => {
    const dbQuery = `INSERT INTO watchlist (id, name, title, watched, year, rt, plot) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    const { id, title, watched, year, rt, plot } = req.body;
    const valuesArr = [id, name, title, watched, year, rt, plot];
    pool.query(dbQuery, valuesArr);
    return next();
  },

  setToWatched: (req, res, next) => {
    const dbQuery = 'UPDATE watchlist SET watched="True" WHERE id = $1'
    const { id } = req.body;
    const valuesArr = [id];
    pool.query(dbQuery, valuesArr);
    return next()
  },

  // clearAllMedia: (req, res, next) => {
  //   const dbQuery = 'DELETE FROM watchlist'
  //   pool.query(dbQuery);
  //   return next();
  // },

  setAsWatched: (req, res, next) => {
    console.log('SET AS WATCHED WORKING')
    // const dbQuery
    // pool.query(dbQuery);
    // return next();
  }
};
