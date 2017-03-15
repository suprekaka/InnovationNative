// import 'isomorphic-fetch'
// import fetchCookieDecorator from 'fetch-cookie';

// const fetch = typeof window === 'object' ? global.fetch : require('fetch-cookie')(fetch)
// console.log('cookie', fetchCookieDecorator)
// fetch = fetchCookieDecorator ? fetchCookieDecorator(fetch) : fetch

export const service = (api, params, transformer) => {
  // console.time(`${api}: ${JSON.stringify(params)}`)
  // console.log('csrfToken', service.csrf)
  return fetch(`${service.URL}${/auth/.test(api) ? 'bin/auth' : 'json'}`, {
    method: 'POST',
    headers: {
      'X-Webtop-CSRF-Token': getSyncCsrfToken(),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
    body: `r=${api}${encodeURIComponent(JSON.stringify(params) || '')}`,
  })
    .then((response) => {
      // console.timeEnd(`${api}: ${JSON.stringify(params)}`)
      if (!response.ok) {
        const rspErr = new Error(response.statusText)
        rspErr.response = response
        throw rspErr
      }

      return transformer === 'text' ? response.text() : response.json()
    })
    .then((json) => {
      if (json.error) {
        console.log('err', json)
        // return Promise.reject(json.error)
        // TODO TEST
        if (json.error.data.code === 'AUTHENTICATION_REQUIRED' && !/auth/.test(api)) {
          return service('auth.loginByToken')
            .then(() => service(api, params, transformer))
        }

        return Promise.reject(json.error)
      }

      const data = json.result
      if (Array.isArray(data) && data.length === 0) {
        return Promise.reject('NO data')
      }

      // service.csrf is used to dev mode
      if (data && data.csrfToken) {
        const { csrfToken, softTimeoutMillis, hardTimeoutMillis } = data
        setSyncCsrfToken(csrfToken, softTimeoutMillis, hardTimeoutMillis)
      }

      return undefined === transformer || 'text' === transformer ? data : transformer(data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getSyncCsrfToken = () => service.csrf

const setSyncCsrfToken = (csrf) => {
  service.csrf = csrf
}

service.csrf = ''
service.URL = ''

// export const API = Symbol('WEBTOP')
export const API = 'WEBTOP'
export default store => next => (action) => {
  const api = action[API]
  if (undefined === api) {
    return next(action)
  }

  // const [requestType, successType, failureType] = api.types
  const { types: [requestType, successType, failureType], name, params, transformer } = api
  delete action[API]
  next({
    ...action,
    api,
    type: requestType,
  })
  return service(name, params, transformer)
    .catch(error => Promise.reject(next({ type: failureType, api, error: error || `Fail to ${api.name}` })))
    // .catch(error => console.warn('service throw', error))
    .then(
      data => next({
        type: successType,
        api,
        data,
      }),
      error => Promise.reject(next({ type: failureType, api, error: error || `Fail to ${api.name}` })),
    )
}
