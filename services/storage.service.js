import { join } from 'path'
import { homedir } from 'os'
import fs from 'fs/promises'

const filePath = join(homedir(), 'weather-data.json')

const isExist = async (path) => {
  try {
    await fs.stat(path)
    return true
  } catch (e) {
    return false
  }
}

export const saveKeyValue = async (key, value) => {
  let data = {}

  if (await isExist(filePath)) {
    const file = await fs.readFile(filePath)
    data = JSON.parse(file)
  }

  data[key] = value
  await fs.writeFile(filePath, JSON.stringify(data))
}

export const getValueByKey = async (key) => {
  if (await isExist(filePath)) {
    const file = fs.readFile(filePath)
    const data = JSON.parse(file)
    return data[key]
  }
}
