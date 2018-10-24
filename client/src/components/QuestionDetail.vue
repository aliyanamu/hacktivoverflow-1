<template>
  <div class="page">
    <div class="loader" v-if="Object.keys(question).length === 0"></div>
    <div class="post ui segment" v-else>
      <div class="anonymous">
        <h6 style="font-size: 14px; margin: 0 0 10px; font-style: italic; color: red"> {{question.author.name}} <span style="font-style: normal; color: black">ask</span></h6>
        <p> {{ timeDifference(question.createdAt) }} </p>
        <h2 style="color: tomato"> {{ question.title }} </h2>
        <p> {{ question.question }} </p>
      </div>
      <span class="vote-area">
      <button v-if="isLogin" @click="upvoteQuest(question._id)"><i class="fa fa-caret-up fa-2x"></i></button>
      <span><h4>{{question.vote}}</h4> votes</span>
      <button v-if="isLogin" @click="downvoteQuest(question._id)"><i class="fa fa-caret-down fa-2x"></i></button>
    </span>
    <wysiwyg v-if="isLogin" v-model="inputans" style="border: 1px solid tomato;" />
    <button v-if="isLogin" class="subut" @click="submitAnswer">Answer</button>
    <div class="comment-list">
    <hr>
      <div class="commentes" v-for="item in question.answer" :key="item._id">
          <div class="comment-box">
            <div class="comment-vote">
              <div style="width: 37px" v-if="isLogin">
                <button @click="upvoteAns(item._id)"><i class="fa fa-chevron-up"></i></button>
                <p style="display: flex; item-align: center; justify-content: center; margin: 0;">{{item.vote}}</p>
                <button @click="downvoteAns(item._id)"><i class="fa fa-chevron-down"></i></button>
              </div>
              <div style="width: 37px; margin-top: 20px;" v-else>
                <p style="display: flex; item-align: center; justify-content: center; margin: 0;">{{item.vote}}</p>
              </div>
            </div>
            <div class="comment-head">
              <h5 class="comment-name by-author"> {{item.owner.name}} answers :</h5>
              <p>{{item.answer}}</p>
              <a v-if="me._id === item.owner._id" class="editAns" @click="toogleEdit(question._id, item._id)">Edit</a>
            </div>
          </div>
        </div>
      </div>
      <div v-if="editModal">
      <answer-form class="openform" :editModal="editModal" :upq="upq" :upa="upa" @editModal="toogleEdit"></answer-form>
      <div class="overlay"></div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AnswerForm from '@/components/AnswerForm.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'question-detail',
  props: ['me', 'isLogin'],
  components: {
    AnswerForm
  },
  data () {
    return {
      inputans: '',
      notif: '',
      upq: '',
      upa: '',
      editModal: false,
      baseurl: 'http://localhost:3000'
    }
  },
  methods: {
    ...mapActions([
      'getAllQuestion',
      'getQuestionById',
      'upvoteQuest',
      'downvoteQuest'
    ]),
    toogleEdit (qid, aid) {
      this.editModal = !this.editModal
      if(this.editModal) {
        this.upq = qid
        this.upa = aid
      }
    },
    submitAnswer () {
      axios({
        method: 'POST',
        url: this.baseurl + `/answers/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          answer: this.inputans
        }
      })
        .then(response => {
          console.log('success add answer')
          this.$router.push('/')
        })
        .catch(err => {
          console.log('get error', err.message)
          this.$router.push('/')
        })
    },
    upvoteAns (id) {
      axios({
        method: 'PUT',
        url:  this.baseurl + `/answers/upvote/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.$store.dispatch('getQuestionById', this.$route.params.id)
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    },
    downvoteAns (id) {
      axios({
        method: 'PUT',
        url:  this.baseurl + `/answers/downvote/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.$store.dispatch('getQuestionById', this.$route.params.id)
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    },
    timeDifference (previous) {
      let current = new Date()
      var msPerMinute = 60 * 1000
      var msPerHour = msPerMinute * 60
      var msPerDay = msPerHour * 24
      var msPerMonth = msPerDay * 30
      var msPerYear = msPerDay * 365

      var elapsed = current - new Date(previous)

      if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago'
      } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago'
      } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago'
      } else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago'
      } else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago'
      } else {
        return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago'
      }
    }
  },
  mounted () {
    if (this.$route.params.id !== undefined) {
      this.getQuestionById(this.$route.params.id)
    }
  },
  computed: {
    ...mapState([
      'questions',
      'question',
      'voteCount'
    ])
  },
  // watch: {
  //   voteAnsCount () {
  //     this.$router.push(`/forum`)
  //   }
  // }
}
</script>

<style scoped>
.post {
  margin: 50px auto 20px;
  padding-bottom: 30px;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.4);
}
.post .anonymous {
  text-align: left;
  margin: 25px 30px;
}

.comment-list {
  margin-top: 100px;
}

.editr {
  width: 90%;
  border: 1px solid lightgrey;
  margin: 15px 0 20px 5%;
  text-align: left;
}

.subut {
  float: right;
  margin-right: 5%;
  font-size: 16px;
  width: 100px;
  height: 50px;
  border: none;
  background: tomato;
  color: white;
}

.delCom {
  margin-top: 20px;
  padding: 5px 10px;
  background: black;
}

.commentes {
  width: 90%;
  margin: 10px 5% 20px;
  padding: 15px 20px 30px 100px;
  text-align: left;
  background: red;
  color: #fff;
  display: flex;
}

.commentes .writer {
  text-align: right;
}

.comment-box {
  padding: 10px 0 0 20px;
}

.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #2973b7; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    margin: 25% auto;
}

.vote-area {
  padding: 0 15px;
  display: inline-flex;
}

.vote-area button{
  padding: 5px;
  margin: 0 20px;
  border: none;
  background: none;
  color: tomato;
}

.vote-area button:hover{
  transform: scale(1.2)
}

.comment-vote {
  position: absolute;
  left: 80px;
  margin-top: -5px;
}

.comment-vote button {
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  margin: 5px;
}

.comment-vote button:hover {
  transform: scale(1.1)
}

.editAns {
  color: deeppink;
  background: white;
  padding: 5px 10px;
  font-weight: bold;
  height: 30px;
}

.commentes .editr {
  width: 100%;
  margin: 5% 0 20px;
  background: #fff
}

a, a:hover, a:visited {
  text-decoration: none;
  cursor: pointer;
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.openform {
  position: fixed;
  z-index: 10000;
  top: 10%;
  left: 5%;
}
.overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 150%;
  height: 150%;
  background: dimgray;
  z-index: 1000;
}
</style>
