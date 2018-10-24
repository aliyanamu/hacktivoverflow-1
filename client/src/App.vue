<template>
  <div id="app">
    <nav id="nav">
      <div class='ui inverted vertical center aligned segment'>
        <div class='ui'>
          <div class='ui large secondary inverted menu'>
            <div class='ui container item'>
              <a style="display: flex; justify-content: center; align-items: center; margin-right: 15px;">
                <img src="./assets/kiss.png" width="45" height="45" alt="Kiss"/>
                <span style="margin-left: 10px; text-align: left;"><p style="color: red; margin: 0;">RedOverflow</p>
                <small style="font-style: italic;">For Curiosity Lover</small></span>
              </a>
              <router-link class='item' to='/'>Home</router-link>
              <router-link class='item' to='/forum'>Forum</router-link>
            </div>
            <div class='right item'>
              <entry-modals class='item' :isLogin='isLogin' :me='me'/>
            </div>
            <a v-if="isLogin" class="ui chat-btn" @click="toggleChat"><i class="icon chat red"></i></a>
            <chat-modal v-if="isLogin" v-show="chat" style="position: fixed; z-index: 10000; right:3%; bottom: 10%;"></chat-modal>
          </div>
        </div>
      </div>
    </nav>
    <router-view :isLogin='isLogin' :me='me'/>
  </div>
</template>

<script>
import axios from 'axios'
import EntryModals from '@/components/EntryModals.vue'
import ChatModal from '@/components/ChatModal.vue'

export default {
  name: 'app',
  components: {
    EntryModals,
    ChatModal
  },
  data () {
    return {
      isLogin: false,
      me: [],
      chat: false,
      baseurl: 'https://redoverflow-server.hanabc.xyz'
    }
  },
  methods: {
    toggleChat () {
      this.chat = !this.chat
    },
    isSelf () {
      let self = this
      axios({
        url: this.baseurl + '/self',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          self.me = response.data.user
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  },
  created () {
    let token = localStorage.getItem('token')
    if (token) {
      this.isSelf()
      this.isLogin = true
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'Icons';
  src: url("https://semantic-ui.com/dist/themes/default/assets/fonts/icons.eot");
  src: url("https://semantic-ui.com/dist/themes/default/assets/fonts/icons.eot?#iefix") format('embedded-opentype'), url("https://semantic-ui.com/dist/themes/default/assets/fonts/icons.woff2") format('woff2'), url("https://semantic-ui.com/dist/themes/default/assets/fonts/icons.woff") format('woff'), url("https://semantic-ui.com/dist/themes/default/assets/fonts/icons.ttf") format('truetype'), url("https://semantic-ui.com/dist/themes/default/assets/fonts/icons.svg#icons") format('svg');
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  padding-top: 110px;
}

#nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

#nav a {
  font-weight: bold;
  color: #34383c!important;
}

#nav a:hover, #nav a.router-link-exact-active {
  color: red!important;
}

.ui.inverted.segment, .ui.primary.inverted.segment {
  background: white!important;
}

.nav.segment {
  min-height: 700px;
  padding: 1em 0em;
}

.nav .logo.item img {
  margin-right: 1em;
}

.nav .ui.menu .ui.button {
  margin-left: 0.5em;
}

.nav h1.ui.header {
  margin-top: 3em;
  margin-bottom: 0em;
  font-size: 4em;
  font-weight: normal;
}

.nav h2 {
  font-size: 1.7em;
  font-weight: normal;
}

.ui.vertical.stripe {
  padding: 8em 0em;
}

.ui.vertical.stripe h3 {
  font-size: 2em;
}

.ui.vertical.stripe .button + h3,
.ui.vertical.stripe p + h3 {
  margin-top: 3em;
}

.ui.vertical.stripe .floated.image {
  clear: both;
}

.ui.vertical.stripe p {
  font-size: 1.33em;
}

.ui.vertical.stripe .horizontal.divider {
  margin: 3em 0em;
}

.quote.stripe.segment {
  padding: 0em;
}

.quote.stripe.segment .grid .column {
  padding-top: 5em;
  padding-bottom: 5em;
}

.footer.segment {
  padding: 5em 0em;
}

@media only screen and (max-width: 700px) {
  .ui.fixed.menu {
    display: none !important;
  }
  .secondary.pointing.menu .item,
  .secondary.pointing.menu .menu {
    display: none;
  }
  .nav.segment {
    min-height: 350px;
  }
  .nav h1.ui.header {
    font-size: 2em;
    margin-top: 1.5em;
  }
  .nav h2 {
    margin-top: 0.5em;
    font-size: 1.5em;
  }
}

.ui.teal.button, .ui.teal.buttons .button {
    background-color: red;
    color: #fff;
    text-shadow: none;
    background-image: none;
}

.ui.teal.button:hover, .ui.teal.buttons .button:hover {
    background-color: #258a73;
    color: #fff;
    text-shadow: none;
}

.chat-btn {
  background: #e8dede;
  padding: 16px 15px 16px 18px;
  position: fixed;
  z-index: 10000;
  right:3%;
  bottom: 3%;
  border-radius: 50%;
  cursor: pointer;
}

.chat-btn:hover {
  background: #b1a7a7;
}

</style>
