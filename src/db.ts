import mongoose from 'mongoose'

const uri = 'mongodb://localhost:27017'

const databaseName = 'home_works'

export const runDb = async () => {
  try {
    await mongoose.connect(uri) + '/' + databaseName
    console.log('Client connected to Db')

  } catch (err) {
    console.log(err)
    await mongoose.disconnect()
  }
}