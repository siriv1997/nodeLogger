// import express from 'express'
const express = require('express');
const app = new express()
const port = 3000;

//Log MOdules
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
 
const logger = createLogger({
  format: combine(
    label({ label: 'Debug' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console({ level: 'info' }),
    new transports.File({
      filename: 'combined-%DATE%.log',
      level: 'error',
      level: 'info',
      maxFiles:'1s'
    })
  ]
});

//Sample API
app.get('/',(req,res) =>{
    res.send('I am workin')
})

//PORT connections
app.listen(port,(data,err) =>{
    if(err)
    {
        logger.error(err)
    }
    else
    {
        logger.info(`Connected to ${port} Successfully`);
    }
})