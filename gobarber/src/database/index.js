import Sequelize from 'sequelize';

//import dos Models
import User from '../app/models/User';

import databaseConfig from '../config/database';
//declara um Array
const models = [User];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    //percorrer os Array
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
