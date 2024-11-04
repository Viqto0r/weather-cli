import chalk from 'chalk'
import dedent from 'dedent-js'

const { bgRed, bgGreen, bgCyan } = chalk

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
