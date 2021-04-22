const csv = require('csv-parser')
const createCsvwriter = require('csv-writer').createObjectCsvWriter
const fs = require('fs')

const dataCSV = []
const dataConverted = []

fs.createReadStream('./data/Data_Assignment.csv')
  .pipe(csv())
  .on('data', (data) => dataCSV.push(data))
  .on('end', () => {
    console.log(dataCSV[0])

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
      long = ''
      lat = ''
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

    console.log(dataConverted[0])

    const csvWriter = createCsvwriter({
      path: 'result.csv',
      header: ['hotspottime', 'provinsi', 'kabupaten', 'kecamatan', 'long', 'lat', 'satellite', 'confidence', 'titik']
    })

    csvWriter.writeRecords(dataConverted)
      .then(() => {
        console.log('done')
      })

  })