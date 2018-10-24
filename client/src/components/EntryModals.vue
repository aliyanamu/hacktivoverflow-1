<template>
  <div cless='entry-modals'>
    <div id="gsign" class="g-signin2" style="margin-right: 20px" data-width="40" data-height="40" data-longtitle="true" data-onsuccess="onSignIn"></div>
    <div class='menu ui' v-if='isLogin === false'>
      <register-modal :switch2reg='switch2reg' @switch2log='switchLog' @closelog='switch2log === false'></register-modal>
      <login-modal :switch2log='switch2log' @switch2reg='switchReg' @closereg='switch2reg === false'></login-modal>
    </div>
    <div v-else>
      <div class='header'>
        <div class='profile segment'>
          <div class='profile__avatar i-block pull-left ui icon'>
            <i class="icon user inverted"></i>
          </div>
          <div class='profile__name i-block'> {{me.name}} </div>
          <ul class='promenu'>
            <li class='promenu__item'>Profile</li>
            <li class='promenu__item' @click='logout()' onclick='gsignOut()'>Logout</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterModal from '@/components/RegisterModal.vue'
import LoginModal from '@/components/LoginModal.vue'

export default {
  name: 'entry-modals',
  props: ['isLogin', 'me'],
  components: {
    RegisterModal,
    LoginModal
  },
  data () {
    return {
      token: localStorage.getItem('token'),
      switch2reg: false,
      switch2log: false
    }
  },
  methods: {
    switchReg (val) {
      this.switch2reg = val
      this.switch2log = !val
    },
    switchLog (val) {
      this.switch2log = val
      this.switch2reg = !val
    },
    logout () {
      localStorage.clear()
      location.reload()
      this.$router.push('/')
      this.$emit('isLogin', false)
    }
  }
}
</script>

<style>
.modal {
  position: fixed;
  left: 38%;
  top: 20%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 400px;
  height: fit-content;
  background: red;
  border-radius: 10px;
  box-shadow: 0px 0px 0px 3000px rgba(52, 56, 60, 0.6);
}

.modal .modal-exit {
  position: absolute;
  right: 0;
  font-weight: bold;
  color: black;
}

.modal-message {
  margin: 5% auto 10%;
  width: 60%;
  color: whitesmoke;
}
.modal-message h2 {
  text-align: center;
  line-height: 3;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.field {
  line-height: 2
}

.switch-field {
  line-height: 4
}

.ui.form input[type=text], .ui.form input[type=password] {
  text-align: center;
}

.log2reg {
  color: whitesmoke!important;
  cursor: pointer;
  margin-left: 5px;
}

.log2reg:hover {
  transform: scale(1.2);
  transition: transform .15s ease-in-out;
}

.close {
  color: #fffccc;
  border: none;
  font-weight: bold;
  background: transparent;
  position: absolute;
  right: 0;
  margin-right: 20px;
  font-size: larger;
}

ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.i-block {
  display: inline-block;
}

.pull-left {
  float: left;
}

.profile {
  height: 100%;
  min-width: 220px;
  width: auto;
  padding: 0 10px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: pointer;
  transition: all 0.2s;
}
.profile:after {
  content: '▾';
  display: inline-block;
  position: absolute;
  right: 0;
  top: 33%;
  color: #34383c;
  -webkit-transform: translate(-10px, -50%);
          transform: translate(-10px, -50%);
  transition: -webkit-transform 0.2s;
  transition: transform 0.2s;
  transition: transform 0.2s, -webkit-transform 0.2s;
}
.profile:hover:after {
  -webkit-transform: translate(-10px, -50%) rotate(180deg);
          transform: translate(-10px, -50%) rotate(180deg);
}

.profile__avatar {
  width: 30px;
  height: 30px;
  line-height: 30px;
  position: relative;
  top: 50%;
  margin-top: -17.5px;
  background: red;
  text-align: center;
}

.profile__name {
  padding: 0 20px 0 15px;
  color: #34383c;
}

.promenu {
  width: 220px;
  transition: all 0.2s;
  position: absolute;
  right: 0;
  top: 40px;
  background: red;
  color: #34383c;
}

.profile .promenu {
  visibility: hidden;
  opacity: 0;
  height: 0;
}
.profile:hover .promenu {
  visibility: visible;
  opacity: 1;
  height: 92px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
}
.profile:hover .promenu .promenu__item {
  visibility: visible;
  opacity: 1;
}
.profile:hover .promenu .promenu__item:nth-child(1) {
  transition: opacity 0.2s 0.12s, -webkit-transform 0.2s;
  transition: opacity 0.2s 0.12s, transform 0.2s;
  transition: opacity 0.2s 0.12s, transform 0.2s, -webkit-transform 0.2s;
}
.profile:hover .promenu .promenu__item:nth-child(2) {
  transition: opacity 0.2s 0.16s, -webkit-transform 0.2s;
  transition: opacity 0.2s 0.16s, transform 0.2s;
  transition: opacity 0.2s 0.16s, transform 0.2s, -webkit-transform 0.2s;
}

.promenu__item {
  display: block;
  height: 45px;
  line-height: 45px;
  cursor: pointer;
  padding: 0 10px 0 15px;
  visibility: hidden;
  opacity: 0;
}
.promenu__item:hover {
  background: #f2f2f2;
  color: red;
  -webkit-transform: scale(1.075);
          transform: scale(1.075);
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
}

@media only screen and (max-width: 767px) {
  .ui .menu>.ui.container {
    width: 70%!important;
  }
}

</style>
