<template>
  <div class="sidebar">
    <h1 v-if="questions.length === 0">No Question</h1>
    <ul>
      <li><div class="ui icon input card" style="margin: 10px auto 20px;">
        <input type="text" v-model="search" placeholder="Search..." @keyup="getAllQuestion(search)">
        <i class="inverted circular search link icon"></i>
      </div></li>
      <li v-if="isLogin"><div class="ui labeled red icon button" @click="toogleCreate">
        Create New Article
      <i class="add icon"></i></div>
      <div v-if="addModal"><div class="overlay"></div>
      <question-form class="openform" :addModal="addModal" @addModal="toogleCreate"></question-form></div>
      </li>
      <li v-for="question in questions" :key="question._id">
        <router-link :to='{name:"details", params: {id: `${question._id}`}}'><div id="post">
        <div class="flex">
          <div class="vote">
            <div class="up" @click="upvoteQuest(question._id)" v-if="isLogin">
              <i style="color: tomato" class="fa fa-caret-up fa-2x" aria-hidden="true"></i>
            </div>
            <div class="votes" style="color: black">{{ question.vote }}</div>
            <div class="down" @click="downvoteQuest(question._id)" v-if="isLogin">
              <i style="color: tomato" class="fa fa-caret-down fa-2x" aria-hidden="true"></i>
            </div>
          </div>
          <div class="title">{{ question.title.substring(0, 95) }}</div>
          <div v-if="question.author.name === me.name" style="position: absolute; right:0">
            <router-link :to='{name:"edit", params:{id: question._id}}' style="display: grid; cursor: pointer;">Edit</router-link>
            <a style="display: grid; color: red; cursor: pointer;"  @click="deleteQuestion(question._id)">Delete</a>
          </div>
        </div>
        <a class="comments">{{ question.answer.length }} Comments</a>
      </div></router-link></li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import QuestionForm from '@/components/QuestionForm.vue'

export default {
  name: 'side-bar',
  props: ['me', 'isLogin'],
  components: {
    QuestionForm
  },
  data () {
    return {
      search: '',
      addModal: false,
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
    toogleCreate () {
      this.addModal = !this.addModal
    },
    deleteQuestion (id) {
      axios
        .delete(this.baseurl + `/questions/${id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          this.$store.dispatch('getAllQuestion')
          this.$router.push('/forum')
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
  computed: {
    ...mapState([
      'questions',
      'question',
      'voteCount'
    ])
  },
  watch: {
    voteCount () {
      this.getAllQuestion()
    }
  },
  created () {
    this.getAllQuestion()
  }
}
</script>

<style scoped>

/* Question List */
.flex {
  display: flex;
  align-items: center;
  margin-top: 14px;
}

#post {
  position: relative;
  height: 112px;
  background: #fff;
  font-family: Roboto, Arial, sans-serif;
  border-radius: 5px;
}

.comments {
  position: absolute;
  right: 0;
  bottom: 15px;
  font-size: .8em;
  font-weight: bold;
  color: #999;
}

.vote {
  margin: 0 25px;
  font-weight: bold;
}
.vote i {
  transition: all 50ms ease;
}
.vote i:hover {
  -webkit-transform: scale(1.3);
          transform: scale(1.3);
  color: #777;
}

.votes {
  margin-top: 3px;
}

.up, .down {
  height: 30px;
  width: 30px;
  cursor: pointer;
}

.title {
  margin-top: 5px;
  margin-right: 15px;
  text-align: left;
  padding: 0 15px;
  font-weight: bold;
  font-size: 16px;
  color: dimgray;
}

a {
  text-decoration: none;
}

.openform {
  position: fixed;
  z-index: 10000;
  top: 10%;
}
.overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 150%;
  height: 150%;
  background: dimgrey;
  z-index: 1000;
}
</style>
