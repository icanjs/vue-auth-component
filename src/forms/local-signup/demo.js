import SignupForm from './local-signup.vue'
import Vue from 'vue/dist/vue'

const dummyService = {
  create (data) {
    console.log('simulated signup using service.create', data)
    return Promise.resolve(data)
  }
}

const feathersClient = {
  authenticate (data) {
    console.log('Simulated signup with feathersClient.authenticate', data)
    return Promise.resolve(data)
  }
}

let app = new Vue({
  el: '#app',
  data () {
    return {
      dummyService,
      feathersClient
    }
  },
  components: {
    SignupForm
  }
})
