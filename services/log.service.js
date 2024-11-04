import chalk from 'chalk'
import dedent from 'dedent-js'

const { bgRed, bgGreen, bgCyan, bgYellow } = chalk

export const printError = (error) => {
  console.log(`${bgRed(' ERROR ')} ${error}`)
}

export const printSuccess = (text) => {
  console.log(`${bgGreen(' SUCCESS ')} ${text}`)
}

export const printHelp = () => {
  console.log(
    dedent`${bgCyan(' HELP ')}
    Без параметров - вывод погоды
    -s [CITY] - для установки города
    -h для вывода помощи
    -t [API_KEY] - для сохранения токена`
  )
}

export const printWeather = (res, icon) => {
  const city = res.name
  const temp = Math.round(res.main.temp)
  const feelsLike = Math.round(res.main.feels_like)
  const description = res.weather[0].description
  const humidity = res.main.humidity
  const windSpeed = res.wind.speed

  console.log(
    dedent`${bgYellow(' WEATHER ')} Погода в городе ${city}:
    ${icon}  ${description}
    Температура: ${temp}° (ощущается как ${feelsLike}°)
    Влажность: ${humidity}%
    Скорость ветра: ${windSpeed}м/c`
  )
}
