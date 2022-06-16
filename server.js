(async() => {
  try {
    // do not load dotenv if production ENV
    require('dotenv').config()
    require('module-alias/register')
    const express = require('express');
    
    const schedule = require('node-schedule');
    const cors = require('cors');
    
    const routes = require('~/routes');
    const { sequelize } = require('~/models');
    const virtualBus = require('~/services/virtual-loop-buses/virtual-loop-buses.service')

    

    const app = express();
    app.use(express.json());
    app.use(cors());

    // condition here
    if (true) {
      await sequelize.sync()
      console.log('Database sync complete.')
    }

    routes(app)
    virtualBus(schedule)

    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Application is listening on port ${process.env.SERVER_PORT}`)
    });
  } catch (err) {
    console.log(err);
  }
}
)();
