const isFlag = (value) => value?.startsWith('-')

export const getArgs = (args) => {
  const res = {}

  for (let i = 2; i < args.length; i++) {
    if (isFlag(args[i])) {
      const key = args[i].slice(1)
      let value = args[i + 1]

      if (isFlag(value)) {
        value = true
      }

      res[key] = value ?? true
    }
  }

  return res
}
