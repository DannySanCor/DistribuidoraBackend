export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    url: process.env.DB_URL,
  },
});
//Local DataBase mongo
//export const urlConfig = 'mongodb://localhost/distribuidora-nest';
//Production link DataBase mongoAtlas
export const urlConfig =
  'mongodb+srv://SanCorAdmin:Qwerty123456@sancorsystems.dzwti.mongodb.net/distribuidora-nest?retryWrites=true&w=majority';
