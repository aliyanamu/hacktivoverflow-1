<template>
  <div cless='right item'>
    <a class='ui inverted button' @click='logtoggle()'>Log in</a>
    <div>
      <transition name='fade'>
        <div class='modal' v-show='logshow'>
          <div class='modal-message'>
            <button class="close" @click='close()'>x</button>
            <div>
              <h2>Log In</h2>
            </div>
            <p> {{notif}} </p>
            <div>
              <div class='ui form'>
                <div class='field'>
                  <label>Email</label>
                  <input placeholder='Enter your email' type='text' v-model='email'>
                </div>
                <div class='field'>
                  <label>Password</label>
                  <input placeholder='Enter your password' type='password' v-model='password'>
                </div>
                <div class='actions'>
                  <button class='ui button signup-btn' @click='login()'>Log in</button>
                </div>
                <div class='field switch-field'>
                  <label>Do not have an account? <span class='log2reg' @click='toReg()'>Signup</span></label>
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
  name: 'login-modal',
  props: ['switch2log'],
  data () {
    return {
      logshow: false,
      password: '',
      email: '',
      notif: '',
      baseurl: 'http://localhost:3000'
    }
  },
  methods: {
    close () {
      this.logtoggle()
      this.$emit('closelog', true)
      this.notif = ''
    },
    toReg () {
      this.$emit('switch2reg', true)
      this.logtoggle()
    },
		logtoggle () {
			this.logshow = !this.logshow
    },
    login () {
      let self = this
      axios ({
        method: 'POST',
        url: this.baseurl + '/users/login',
        data: {
          email: self.email,
          password: self.password
        }
      })
      .then(response => {
        console.log('login', response)
        let token = response.data.token
        localStorage.setItem('token', token)
        location.reload()
      })
      .catch(error => {
        console.log(error.response)
        if( !self.email) {
          self.notif = 'email is required'
        } else if (!self.password) {
          self.notif = 'password is required'
        } else {
          self.notif = error.response.data.message
        }
      })
    }
  },
  watch: {
    switch2log (val) {
      if(val === true) {
        this.logshow = true
      } else {
        this.logshow = false
      }
      return this.logshow
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
