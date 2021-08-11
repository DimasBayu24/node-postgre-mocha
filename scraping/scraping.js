require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
 

module.exports = {
    scraping: async() => {
        try {
            const urlSite = process.env.URL;
            const {data} = await axios({
                method: "GET",
                url : urlSite,
            });
            const keys = [
                'jenis_mata_uang',
                'e_rate_beli',
                'e_rate_jual',
                'tt_counter_beli',
                'tt_counter_jual',
                'bank_notes_beli',
                'bank_notes_jual'
            ];
            const kursArr = [];
            const result = [];
            const $ = cheerio.load(data)
            const dateSelector = '#kurs-hari-ini-content > div.col-md-8.col-xs-12.col-sm-12 > div.o-grid-list.o-grid-list--column.active > div.o-kurs-refresh-wrapper.pt-16 > div > span > span.desc-ref-kurs.refresh-date'
            const selector = '#scrolling-table > table > tbody > tr'
            dateValue = $(dateSelector).text()
            dateValue = dateValue.slice(0, -6)
            date = formatDate(dateValue)
            $(selector).each((parentIdx, parentElem) => {
                let keyIdx = 0;
                const obj = {};
                $(parentElem).children().each((childIdx, childElem) => {
                    const value = $(childElem).text().trim();
                    if (value) {
                        obj['updated_time'] = date
                        obj[keys[keyIdx]] = value;
                        keyIdx++
                    }
                })
                kursArr.push(obj);
            })
            result.push(kursArr)
            return kursArr
        } catch (error) {
            console.log(error);
        }
    }
}
