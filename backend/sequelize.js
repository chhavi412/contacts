const Sequelize = require('sequelize')
const UserModel = require('./models/users')
const ContactModel = require('./models/contacts')

// const BlogModel = require('./models/blog')
// const TagModel = require('./models/tag')

const sequelize = new Sequelize('contacts', 'postgres', 'argusadmin', {
  host: 'localhost',
  dialect: 'postgres',
  
})

//testing connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Users = UserModel(sequelize, Sequelize)
const Contacts=ContactModel(sequelize,Sequelize)

// Contacts.belongsToMany(Contacts, { through: UserModel, unique: false })
// Contact.belongsTo(Users);

// comment once database created
// sequelize.sync({ force: true })
//   .then(() => {
//     console.log(`Database & tables created!`)
//   })

module.exports = {
  Users,
  Contacts
}