// USER schema
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        enabled: DataTypes.BOOLEAN,
        nip: DataTypes.STRING,
        nama_lengkap: DataTypes.STRING,
        email: DataTypes.STRING,
        telepon: DataTypes.STRING,
        alamat: DataTypes.TEXT,
        gambar_id: {
            type: DataTypes.UUID,
			allowNull: true
        },
        token_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        kewenangan_id: DataTypes.INTEGER,
        consumer_id: DataTypes.STRING
    },
    {}
    );
    
    return Users;
}