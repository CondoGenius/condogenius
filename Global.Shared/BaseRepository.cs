using MySql.Data.MySqlClient;

namespace Global.Shared;

public class BaseRepository
{
    public MySqlConnection GetConnection()
    {
        var connString = "server=mysql;uid=root;pwd=genius;database=genius";

        try
        {
            var conn = new MySqlConnection();
            conn.ConnectionString = connString;

            return conn;
        }
        catch (MySqlException ex)
        {
            throw ex;
        }
    }
}