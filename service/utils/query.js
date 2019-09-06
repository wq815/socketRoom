// 连接 mysql 数据库
import mysql from 'mysql'
import { db, database } from '../config.js'
import fs from 'fs'
import path from 'path'
console.log(__dirname)
const sqlContent = fs.readFileSync(path.resolve(__dirname, '..', './sql/my_blog.sql'), 'utf-8');
// 这一次连接是为了 创建数据库 并执行 sql 文件建表
const init = mysql.createConnection(db)
init.connect();
let pool;
init.query("SHOW DATABASES LIKE 'wq_blog'", (err, data) => {
  Object.assign(db, { database })
  pool = mysql.createPool(db)
  console.log(data)
  if (data.length != 0) {
    console.log('已经创建数据库')
  } else {
    console.log('数据库第一次创建')
    // 如果数据库存在则不需要执行以下的代码
    init.query('CREATE DATABASE wq_blog', err => {
      if (err) {
        console.log('create database wq_blog err')
        console.log(err)
      } else {
        console.log('create database wq_blog success')
        query(sqlContent).then(res => {
          console.log('import sql is success')
        }).catch(err => {
          console.log(err)
        })
      }
    })
    init.end();
  }
  // console.log(data);
  // console.log(err)
})
export default function query(sql, value) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, collection) => {
      if (err) {
        reject(err)
      } else {
        collection.query(sql, value, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data)
          }
          collection.release();
        })
      }
    })
  })
}