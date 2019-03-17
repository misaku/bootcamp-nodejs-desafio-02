module.exports = {
    dialect: "postgres",
    host: "localhost",
    username: "docker",
    password: "docker",
    database: "barbershop",
    operatorsAliases: false,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
