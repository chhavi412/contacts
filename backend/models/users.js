module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name:{
            type:type.STRING(10),
            validate:{
                max:10,
                min:1
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
        },
        password:{
            type:type.STRING,
            validate:{
                is:/.(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}/
            }
        },

        address:{
            type:type.STRING
        },

        phone:{
            type: type.STRING(10),
            // len:10,
            unique: true,
            validate:{
                is: ["^[0-9]+$"],
                min:10
                // max:10
            }
        }

    })
}