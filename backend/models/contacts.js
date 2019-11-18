module.exports = (sequelize, type) => {
    return sequelize.define('contacts', {
        userid: {
          type: type.INTEGER
        },
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:type.STRING(15),
            validate: {
                min:1,
                // max: 15
               }
        },
        number1:{
            type:type.STRING(10),
            unique: true,
            validate: {
                is: ["^[0-9]+$"],
                min:10
                // max: 10
               }
        },
        email:{
            type:type.STRING,
            allowNull: true,
            unique: true,
            validate: {
             max: 50,
             isEmail:true
            }
        }
        

    })
}