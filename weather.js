#!/usr/bin/env node
import axios from 'axios'
import { getArgs } from './helpers/args.js'
import { getIcon, getWeather } from './services/api.service.js'
import {
  printError,
  printWeather,
  printHelp,
  printSuccess,
} from './services/log.service.js'
import {
  getValueByKey,
  saveKeyValue,
  TOKEN_DICTIONARY,
} from './services/storage.service.js'

const saveToken = async (token) => {
  if (!token.length) {
    return printError('Не передан токен')
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token)
    printSuccess('Токен сохранён')
  } catch (e) {
    printError(e.message)
  }
}

const saveCity = async (city) => {
  if (!city.length) {
    return printError('Не передан город')
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city)
    printSuccess('Город сохранён')
  } catch (e) {
    printError(e.message)
  }
}

const getForecast = async () => {
  try {
    const city =
      process.env.CITY ?? (await getValueByKey(TOKEN_DICTIONARY.city))
    const weatherData = await getWeather(city)
    const icon = weatherData.weather[0].icon

    printWeather(weatherData, getIcon(icon))
  } catch (e) {
    const status = e?.response?.status
    let errorMessage = e.message

    switch (status) {
      case 404:
        errorMessage = 'Неверно указан город'
        break
      case 401:
        errorMessage = 'Неверно указан токен'
        break
    }

    printError(errorMessage)
  }
}

const initCLI = async () => {
  const args = getArgs(process.argv ?? [])
  const isEmptyArgs = !Object.keys(args).length

  if (args.h) {
    printHelp()
  }

  if (args.s) {
    await saveCity(args.s)
  }

  if (args.t) {
    await saveToken(args.t)
  }

  if (isEmptyArgs) {
    return getForecast()
  }
}

initCLI()
