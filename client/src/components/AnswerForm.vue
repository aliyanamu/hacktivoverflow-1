<template>
  <div class="ui form">
    <h1 style="font-size: 80px;">Edit Answer</h1>
    <div class="field">
      <label>Question</label>
      <h5 style="width: 500px"> {{quest.title}} </h5>
      <p style="width: 500px"> {{quest.question}} </p>
    </div>
    <div class="field">
      <label>Your Answer</label>
      <wysiwyg v-model="answer" style="border: 1px solid tomato; color: white;" />
    </div>
    <div class="ui submit red button" @click="editAnswer">Post</div>
    <div class="ui button" @click="$emit('editModal')">Cancel</div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'answer-form',
  props: ['editModal', 'upq', 'upa'],
  data () {
    return {
      answer: '',
      quest: '',
      baseurl: 'https://redoverflow-server.hanabc.xyz'
    }
  },
  methods: {
    ...mapActions([
      'getAllQuestion',
      'getQuestionById'
    ]),
    getAnswer () {
      let self = this
      self.quest = self.question
      let ans = self.question.answer
      ans.forEach(elem => {
        if (elem._id === self.upa) {
          self.answer = elem.answer
        }
      })
    },
    editAnswer () {
      axios({
        method: 'PUT',
        url: this.baseurl + `/answers/${this.upa}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          answer: this.answer
        }
      })
        .then(response => {
          console.log('update', response)
          this.$store.dispatch('getQuestionById', this.$route.params.id)
          this.$emit('editModal')
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
    this.getAnswer()
  },
  created () {
    this.getQuestionById(this.upq)
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
