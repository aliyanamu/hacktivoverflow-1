<template>
  <div class="ui form">
    <h1 v-if="addModal" style="font-size: 80px;">Create Question</h1>
    <h1 v-else style="font-size: 80px;">Edit Question</h1>
    <div class="field">
      <label>Title</label>
      <input v-if="addModal" v-model="title" type="text" placeholder="Enter question title here...">
      <input v-else type="text" v-model="question.title" placeholder="Enter question title here...">
    </div>
    <div class="field">
      <label>Content</label>
      <wysiwyg v-if="addModal" v-model="desc" style="border: 1px solid tomato; color: tomato;" />
      <wysiwyg v-else v-model="question.question" style="border: 1px solid tomato; color: tomato;" />
    </div>
    <div v-if="addModal" class="ui submit red button" @click="createQuestion">Post</div>
    <div v-else class="ui submit red button" @click="editQuestion">Post</div>
    <div v-if="addModal" class="ui button" @click="$emit('addModal')">Cancel</div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'question-form',
  props: ['addModal'],
  data () {
    return {
      title: '',
      desc: '',
      id: this.$route.params.id,
      baseurl: 'http://localhost:3000'
    }
  },
  methods: {
    ...mapActions([
      'getAllQuestion',
      'getQuestionById'
    ]),
    createQuestion () {
      let self = this

      axios({
        method: 'POST',
        url: this.baseurl + '/questions',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: self.title,
          question: self.desc,
        }
      })
        .then(response => {
          this.$router.push('/forum')
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    editQuestion () {
      axios({
        method: 'PUT',
        url: this.baseurl + `/questions/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: this.question.title,
          question: this.question.question
        }
      })
        .then(response => {
          this.$store.dispatch('getAllQuestion')
          this.$router.push('/forum')
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    }
  },
   computed: {
    ...mapState([
      'questions',
      'question'
    ])
  },
  mounted () {
  },
  created () {
    if (this.$route.name === 'edit') {
      this.getQuestionById(this.$route.params.id)
    }
  }
}
</script>

<style scoped>
.form,
.field,
.ui.form input[type="text"],
.ui.form input[type="password"] {
  text-align: left;
}

.field label {
  width: 100%;
  color: tomato!important;
}

</style>
