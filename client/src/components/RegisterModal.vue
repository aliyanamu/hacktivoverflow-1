<template>
  <div cless='right item'>
    <a class='ui inverted button' @click='regtoggle()'>Sign up</a>
    <div>
      <transition name='fade'>
        <div class='modal' v-show='regshow'>
          <div class='modal-message'>
            <button class="close" @click='close()'>x</button>
            <div>
              <h2>Sign Up</h2>
            </div>
            <p> {{notif}} </p>
            <div>
              <div class='ui form'>
                <div class='field'>
                  <label>Name</label>
                  <input placeholder='Enter your full name' type='text' v-model='name'>
                </div>
                <div class='field'>
                  <label>Email</label>
                  <input placeholder='Enter your email' type='text' v-model='email'>
                </div>
                <div class='field'>
                  <label>Password</label>
                  <input placeholder='Enter your password' type='password' v-model='password'>
                </div>
                <div class='actions'>
                  <button class='ui button signup-btn' @click='signup()'>Sign up</button>
                </div>
                <div class='field switch-field'>
                  <label>Already have an account? <span class='log2reg' @click='toLog()'>Login</span></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'register-modal',
  props: ['switch2reg'],
  data () {
    return {
      regshow: false,
      name: '',
      password: '',
      email: '',
      notif: '',
      baseurl: 'https://redoverflow-server.hanabc.xyz'
    }
  },
  methods: {
    close () {
      this.regtoggle()
      this.$emit('closereg', true)
      this.notif = ''
    },
    toLog () {
      this.$emit('switch2log', true)
      this.regtoggle()
    },
    regtoggle () {
      this.regshow = !this.regshow
    },
    signup () {
      let self = this
      axios({
        method: 'POST',
        url: this.baseurl + '/users/register',
        data: {
          name: self.name,
          email: self.email,
          password: self.password
        }
      })
        .then(response => {
          console.log('signup', response)
          let token = response.data.token
          localStorage.setItem('token', token)
          location.reload()
        })
        .catch(error => {
          console.log(error.response)
          if (!self.email) {
            self.notif = 'email is required'
          } else if (!self.password) {
            self.notif = 'password is required'
          } else if (!self.name) {
            self.notif = 'name is required'
          } else {
            let str = error.response.data.message
            if (str.substring(0, 31) === 'User validation failed: email: ') {
              self.notif = str.slice(31)
            } else if (str.substring(0, 34) === 'User validation failed: password: ') {
              self.notif = str.slice(34)
            } else if (str.substring(0, 30) === 'User validation failed: name: ') {
              self.notif = str.slice(30)
            } else {
              self.notif = str
            }
          }
        })
    }
  },
  watch: {
    switch2reg (val) {
      if (val === true) {
        this.regshow = true
      } else {
        this.regshow = false
      }
      return this.regshow
    }
  }
}
</script>

<style scoped>
.signup-btn {
  width: 100%;
  color: whitesmoke;
  background: tomato;
}
</style>
