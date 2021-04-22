const fs = require('fs')
let data = fs.readFileSync('./veritaData.json')
let parsed = JSON.parse(data)
let { features } = parsed

// console.log(features)
let result = []

for (let i = 0; i < features.length; i++) {
  if (features[i].geometry.type === 'Polygon') {
    // console.log(features[i].geometry.type)

    let coordinates = features[i].geometry.coordinates[0]
    // console.log(coordinates)

    for (let j = 0; j < coordinates.length; j++) {
      let save = `${coordinates[j][1]},${coordinates[j][0]}`
      // console.log(`${coordinates[j][1]},${coordinates[j][0]}\n`)

      result.push(save)
    }
  }

  else {
    // console.log(features[i].geometry.type)

    let coordinates = features[i].geometry.coordinates[0][0]
    // console.log(coordinates)

    for (let j = 0; j < coordinates.length; j++) {
      let save = `${coordinates[j][1]},${coordinates[j][0]}`
      // console.log(`${coordinates[j][1]},${coordinates[j][0]}\n`)

      result.push(save)
    }
  }
}

console.log(result)