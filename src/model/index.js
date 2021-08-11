const connection = require('../config');
const cron = require('node-cron');

const scraping = require('../../scraping/scraping')

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {
         
             scraping.scraping()
            .then((result) => {
                query = `select updated_time from kurs where updated_time = '${result[0].updated_time}'`
                connection.query(query, (error, results) => {
                    if (error) {
                      throw error
                    }
                    if (results.rows.length > 0) {
                        resolve("no new data")
                    } else {
                        for (let i = 0; i < result.length; i++) {
                        const query = `INSERT INTO kurs(mata_uang_id, e_rate_beli, e_rate_jual, tt_counter_beli, tt_counter_jual, bank_notes_beli, bank_notes_jual, updated_time)
                        VALUES(${i+1}, '${result[i].e_rate_beli}', '${result[i].e_rate_jual}', '${result[i].tt_counter_beli}', '${result[i].tt_counter_jual}', '${result[i].bank_notes_beli}', '${result[i].bank_notes_jual}', '${result[i].updated_time}')
                        `
                        connection.query(query
                          
                            
                            , (error, results) => {
                                if (error) {
                                  throw error
                                reject(new Error(error))

                                }
                                if (results) {
                                    console.log(results);
                                }
                            })
                        }
                    }
                if (!error) {
                            resolve("data has been updated")
                        }
                  })
            })
            .catch((err) => {
                console.log(err);
            })
        })
    },
    getDataBetween: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT b.jenis_mata_uang, a.e_rate_beli, a.e_rate_jual, a.tt_counter_beli, a.tt_counter_jual, a.bank_notes_beli, a.bank_notes_jual, a.updated_time FROM kurs AS a  LEFT JOIN mata_uang AS b on a.mata_uang_id = b.mata_uang_id WHERE updated_time BETWEEN '${startDate}' AND '${endDate}';`, (err, result) => {
                if (!err) {
                    resolve(result.rows)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getCurrencyBetween: (startDate, endDate, currency) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT b.jenis_mata_uang, a.e_rate_beli, a.e_rate_jual, a.tt_counter_beli, a.tt_counter_jual, a.bank_notes_beli, a.bank_notes_jual, a.updated_time FROM kurs AS a  LEFT JOIN mata_uang AS b on a.mata_uang_id = b.mata_uang_id WHERE updated_time BETWEEN '${startDate}' AND '${endDate}' AND jenis_mata_uang = '${currency}';`, (err, result) => {
                if (!err) {
                    resolve(result.rows)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    addData: (data, id) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO kurs(mata_uang_id, e_rate_beli, e_rate_jual, tt_counter_beli, tt_counter_jual, bank_notes_beli, bank_notes_jual, updated_time)
            VALUES(${id}, '${data.e_rate.beli}', '${data.e_rate.jual}', '${data.tt_counter.beli}', '${data.tt_counter.jual}', '${data.bank_notes.beli}', '${data.bank_notes.jual}', '${data.date}') returning *`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateData: (data, id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE kurs SET e_rate_beli = '${data.e_rate.beli}', e_rate_jual = '${data.e_rate.jual}', tt_counter_beli = '${data.tt_counter.beli}', tt_counter_jual = '${data.tt_counter.jual}', bank_notes_beli = '${data.bank_notes.beli}', bank_notes_jual = '${data.bank_notes.jual}' WHERE updated_time = '${data.date}' AND mata_uang_id = ${id} RETURNING *;`, (err, result) => {
                if (!err) {
                    resolve(result.rows)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteData: (date) => {
        console.log(date)
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM kurs WHERE updated_time = '${date}'`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    searchDataBy: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT b.jenis_mata_uang, b.mata_uang_id, a.e_rate_beli, a.e_rate_jual, a.tt_counter_beli, a.tt_counter_jual, a.bank_notes_beli, a.bank_notes_jual, a.updated_time FROM kurs AS a  LEFT JOIN mata_uang AS b on a.mata_uang_id = b.mata_uang_id WHERE updated_time = '${data.date}' AND jenis_mata_uang = '${data.symbol}';`, (err, result) => {
                if (!err) {
                    resolve(result.rows)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getCurrencyId: (currency) => {
        return new Promise((resolve, reject) => {
            connection.query(`select mata_uang_id from mata_uang where jenis_mata_uang = '${currency}';`, (err, result) => {
                if (!err) {
                    resolve(result.rows)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    insertNewCurrency: (currency) => {
        return new Promise((resolve, reject) => {
            connection.query(`insert into mata_uang(jenis_mata_uang) values('${currency}') returning mata_uang_id;`, (err, result) => {
                if (!err) {
                    resolve(result.rows)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
}