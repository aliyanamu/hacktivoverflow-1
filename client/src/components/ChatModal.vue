<template>
  <div class="ui segment red" style="background: #e8dede;">
    <div class="ui segment">
        <div class="header">
            <h3>Chat Group</h3>
            <hr>
        </div>
        <div class="segment" style="height: 45vh; overflow-y: scroll;">
            <div class="ui card red messages" v-for="(item, index) in messages" :key="index" style="text-align: left; padding: 5px 5px 5px 10px; margin: 10px 10px 10px 5px;">
                <label style="color: tomato; font-style: italic;"> {{item.user}} says</label>
                <span> {{item.message}} </span>
            </div>
        </div>
    </div>
    <div class="ui form segment" style="text-align: left;">
        <form @submit.prevent="sendMessage">
            <div class="field inline">
                <label style="width: 60px;" for="user">User:</label>
                <input type="text" v-model="user" class="form-control">
            </div>
            <div class="field inline">
                <label style="width: 60px;" for="message">Message:</label>
                <input type="text" v-model="message" class="form-control">
            </div>
            <button class="ui submit red button">Send</button>
        </form>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'chat-modal',
  props: ['me', 'isLogin'],
  data () {
    return {
      user: '',
      message: '',
      messages: [],
      socket: io('https://redoverflow-server.hanabc.xyz')
    }
  },
  methods: {
    sendMessage (e) {
      e.preventDefault()

      this.socket.emit('SEND_MESSAGE', {
        user: this.user,
        message: this.message
      })
      this.message = ''
    }
  },
  mounted () {
    this.socket.on('MESSAGE', (data) => {
      this.messages = [...this.messages, data]
      // you can also do this.messages.push(data)
    })
  }
}
</script>

<style scoped>
.ui.form input[type=text], .ui.form input[type=password] {
    text-align: left;
}
</style>
