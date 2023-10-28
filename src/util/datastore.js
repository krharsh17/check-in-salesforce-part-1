import { openDatabase, enablePromise } from 'react-native-sqlite-storage';

const TABLE_NAME = "CHECK_IN"

enablePromise(true)

const getDBConnection = async () => {
    return openDatabase({ name: 'checkin-data.db', location: 'default' });
};

const createTable = async (database) => {

    const query = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          email TEXT NOT NULL,
          checkinTime DATETIME DEFAULT CURRENT_TIMESTAMP
      );`;

    await database.executeSql(query);
};

export const getCheckins = async () => {

    const db = await getDBConnection()

    await createTable(db)


    try {

        const checkins = [];
        const results = await db.executeSql(`SELECT email,checkinTime FROM ${TABLE_NAME}`);

        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                checkins.push(result.rows.item(index))
            }
        });

        return checkins;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get checkins');
    }
};

export const addCheckin = async (checkinEmail) => {
    const db = await getDBConnection()

    await createTable(db)

    const insertQuery = `INSERT INTO ${TABLE_NAME}(email) VALUES('${checkinEmail}');`

    return db.executeSql(insertQuery);
};