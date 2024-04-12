import express from 'express';
import mysql from 'mysql2';

const connect = mysql.createConnection({
    host: '', // AWS RDS 엔드포인트
    user: '', // AWS RDS 계정명
    password: '', // AWS RDS 비밀번호
    database: '', // 연결할 MySQL DB 이름
});

const app = express();
const SERVER_PORT = 3017;

app.use(express.json());

/**
 * TABLE 생성 API
 */
app.post('/api/tables', async (req, res, next) => {
    const { tableName } = req.body;

    await connect.promise().query(`
        CREATE TABLE ${tableName}
        (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name varchar(255) NOT NULL,
            createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `);

    return res.status(201).json({ message: '테이블 생성에 성공하였습니다.' });
});

/**
 * TABLE 목록 조회 API
 */
app.get('/api/tables', async (req, res, next) => {
    // Array 구조 분해 할당
    const [tableList] = await connect.promise().query(` 
        SHOW TABLES
    `);
    //// 첫번 째 [tableList] -> SQL query를 했을 때 반환되는 데이터 가공을 위해 변수에 할당
    // obj property중 우측에 있는 value값만 필요 -> Object.values() 사용
    const tableName = tableList.map((table) => Object.values(table)[0]);

    return res.status(200).json({ tableList: tableName });
});

/**
 * TABLE 데이터 삽입 API
 */
app.post('/api/tables/:tableName/items', async (req, res, next) => {
    // 테이블 이름, name 컬럼에 할당될 값
    const { tableName } = req.params;
    const { name } = req.body;

    // 특정 테이블을 ${tableName} 지정해주고, 우측엔 사입하게 될 컬럼(name) 지정
    // req.body;에서 전달 받은 name을 VALUES ('${name}')에 할당해서 구현
    await connect.promise().query(`
        INSERT INTO ${tableName} (name) 
        VALUES ('${name}')
    `);

    return res.status(201).json({ message: '데이터 생성에 성공하였습니다.' });
});

/**
 * TABLE 데이터 조회 API
 */
app.get('/api/tables/:tableName/items', async (req, res, next) => {
    const { tableName } = req.params;

    // 특정 배열 첫 번째 배열에 데이터가 할당
    const [itemList] = await connect.promise().query(`
        SELECT id, name, createdAt
        FROM ${tableName}
    `);

    return res.status(200).json({ itemList: itemList });
});

app.listen(SERVER_PORT, () => {
    console.log(SERVER_PORT, '포트로 서버가 열렸습니다.');
});
