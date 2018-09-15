import ajax from '@/utils/ajax'

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
