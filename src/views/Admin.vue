<template>
  <div class="about">
    <div class="top">
      <h5>Modify Questions</h5>
      <button class="btn btn-secondary" @click.prevent="addQuestion()">Add Question</button>
    </div>

    <!-- <div class="modal" is-active>
  <div class="modal-background"></div>
  <div class="modal-content">
  </div>
  <button class="modal-close is-large" aria-label="close"></button>
</div> -->
    

    <table class="table">
  <thead>
    <tr>
      <th scope="col">#id</th>
      <th scope="col">Question</th>
      <th scope="col">Answers</th>
      <th scope="col">Group</th>
      <th scope="col">Category</th>
      <th scope="col">isRequired</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in questions" :key="item.id">
      <th scope="row">{{item.id}}</th>
      <td>{{item.q}}</td>
      <td>{{item.a}}</td>
      <td>{{item.group}}</td>
      <td>{{item.category}}</td>
      <td>{{item.required}}</td>
      <td><button class="btn btn-danger" id="delete" v-on:click="deleteQ(item.id)">Delete</button></td>
    </tr>
  </tbody>
</table>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      questions: [
        {id:0, q:'', a:[], group:0, category:'', required:false}
      ],
      clicked:false
    }
  },
  methods:{
      deleteQ(id) {
        axios.delete(`http://localhost:8081/q/del/${id}`)
        .then(msg => {console.log(msg)})
        .catch(err=>console.log(err));
      },

      addQuestion(){
        this.clicked = true;
      }
  },

  created(){
    axios.get('http://localhost:8081/q')
            .then((res) => {
                    this.questions = res.data.map( z => {
                        return {
                            id: z.id,
                            q: z.question,
                            a: z.answer.split(" "),
                            group: z.group,
                            category: z.category,
                            required: z.required
                        }
                    })
            })
  }
}
</script>

<style scoped>

  .about {
    text-align:left;
  }
  .top{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
  }

</style>