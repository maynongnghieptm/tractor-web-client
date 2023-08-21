import { setupWorker } from 'msw'
import { setupServer } from 'msw/node'


const start =
  process.env.NODE_ENV !== 'test'
   

export default {
  init: start,
}