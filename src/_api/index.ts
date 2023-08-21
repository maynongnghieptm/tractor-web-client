import instance from './client'

import users from './users'
import config from '_config'

let apiMocks: any



const init = async () => {
  if (apiMocks) {
    // Remove all SW caches
    const cachesNames = await caches.keys()

    await Promise.all(cachesNames.map((name) => caches.delete(name)))

    await apiMocks.default.init()
  }

  return instance
}

export default { instance,users, init }
export { init, instance,  users }