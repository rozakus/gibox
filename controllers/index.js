const { Raw, Converted } = require('../models')
const csv = require('csv-parser')
const createCsvwriter = require('csv-writer').createObjectCsvWriter
const fs = require('fs')

class MainController {
  static async addDataRaw(req, res) {
    try {

      const dataCSV = []

      fs.createReadStream('./data/Data_Assignment.csv')
        .pipe(csv())
        .on('data', (data) => dataCSV.push(data))
        .on('end', () => {

          Raw.bulkCreate(dataCSV)
            .then(() => {
              return Raw.findAll()
            })
            .then(raw => {
              // console.log(raw)
              res.status(200).json(raw)
            })

        })

    } catch (err) {
      return res.status(500).json(err)
    }
  }

  static async showRawData(req, res) {
    try {

      let data = await Raw.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })

      return res.status(200).json(data)

    } catch (err) {
      return res.status(500).json(err)
    }
  }

  static async addConvertedData(req, res) {
    try {
      let dataCSV = await Raw.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      const dataConverted = []

      for (let i = 0; i < dataCSV.length; i++) {
        let hotspottime = '',
          provinsi = '',
          kabupaten = '',
          kecamatan = '',
          long = '',
          lat = '',
          satellite = '',
          confidence = '',
          titik = ''

        hotspottime = dataCSV[i].source_date
        provinsi = dataCSV[i].provinsi
        kabupaten = dataCSV[i].kabupaten
        kecamatan = dataCSV[i].kecamatan
        long = 0
        lat = 0
        satellite = dataCSV[i].satellite
        confidence = dataCSV[i].confidence == 9 ? 'high' : dataCSV[i].confidence == 8 ? 'medium' : 'low'
        titik = 1

        dataConverted.push({ hotspottime, provinsi, kabupaten, kecamatan, long, lat, satellite, confidence, titik })
      }

      dataConverted.sort((a, b) => {
        if (a.kecamatan < b.kecamatan) { return -1 }
        if (a.kecamatan > b.kecamatan) { return 1 }
        return 0
      })

      dataConverted.sort((a, b) => {
        if (a.kabupaten < b.kabupaten) { return -1 }
        if (a.kabupaten > b.kabupaten) { return 1 }
        return 0
      })

      dataConverted.sort((a, b) => {
        if (a.provinsi < b.provinsi) { return -1 }
        if (a.provinsi > b.provinsi) { return 1 }
        return 0
      })

      let insertData = await Converted.bulkCreate(dataConverted)

      return res.status(200).json(insertData)

    } catch (err) {
      return res.status(500).json(err)
    }
  }

  static async showConvertedData(req, res) {
    try {
      let data = await Converted.findAll({
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
      })

      const csvWriter = createCsvwriter({
        path: 'result.csv',
        header: ['hotspottime', 'provinsi', 'kabupaten', 'kecamatan', 'long', 'lat', 'satellite', 'confidence', 'titik']
      })

      csvWriter.writeRecords(data)
        .then(() => {
          console.log('done')
        })

      return res.status(200).json(data)

    } catch (err) {
      return res.status(500).json(err)
    }
  }
}

module.exports = MainController