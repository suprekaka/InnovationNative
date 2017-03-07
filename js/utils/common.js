import get from 'lodash/get'
import isString from 'lodash/isString'

export const genKey = (...args) => args.join('_')

export const getValueOfObject = (
  object,
  key,
  notFoundReturnValue = '',
  notFoundErrorMsg = `Missing value as the key is ${key}.`,
) => {
  if (!isString(key)) {
    throw new Error(`The param ${key} must to be a string`)
  }
  const result = get(object, key)
  if (result === undefined) {
    console.error(notFoundErrorMsg, 'The object is ', object)
    return notFoundReturnValue
  }
  return result
}
