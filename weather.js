#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { getWeather } from './services/api.service.js'
import { printError, printHelp, printSuccess } from './services/log.service.js'
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'

const saveToken = async (token) => {
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token)
    printSuccess('Токен сохранён')
  } catch (e) {
    printError(e.message)
  }
}

const initCLI = async () => {
  const args = getArgs(process.argv ?? [])

  if (args.h) {
    printHelp()
  }

  if (args.s) {
    // Сохранить город
  }

  if (args.t) {
    return saveToken(args.t)
  }

  await getWeather('Saransk')
}

initCLI()
