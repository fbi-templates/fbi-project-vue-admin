import ajax from '@/utils/ajax'
import { query, mutate, subscribe } from '../utils/graphql'

export default {
  login: data => ajax.post('/login', data),

  roles: () => ajax.get('/roles'),

  current: params =>
    ajax.get('/users', {
      params
    }),

  list: params =>
    ajax.get('/users', {
      params
    })
}
