import Vue from 'vue'

export function query (str, variables) {
  return Vue.prototype.$apollo.query({
    query: gql(str),
    variables
  })
}

export function mutate (str, variables) {
  return Vue.prototype.$apollo.mutate({
    mutation: gql(str),
    variables
  })
}

export function subscribe (str, variables) {
  return Vue.prototype.$apollo.subscribe({
    query: gql(str),
    variables
  })
}
