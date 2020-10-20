<template>
    <div>
        <p>Add question to database</p>
        <div class="q-head">
                <label class="col-form-label-sm">Question</label>
                <input type="text" v-model="question" class="form-control form-control-sm">

                <label class="col-form-label-sm">Answer(s)</label>
                <input type="text" v-model="answer" class="form-control form-control-sm">

                <label class="col-form-label-sm">Category</label>
                <select class="col-form-label-sm" name="category" id="category" v-model="category">
                    <option v-for="item in categories" :key="item" :value="item">{{item}}</option>
                </select>

                <label class="col-form-label-sm">Group</label>
                <input type="number" v-model="group" class="form-control form-control-sm">

                <label class="col-form-label-sm">Required</label>
                <ul>
                    <li>
                        <input type="radio" name="req" id="req" v-model="required" v-bind:value="true">True
                    </li>
                    <li>
                         <input type="radio" name="req" id="req" v-model="required" v-bind:value="false">False
                    </li>
                </ul>

                <button class="btn btn-primary" :disabled="!validate()" @click.prevent="addQuestion">Add Question</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'AddQuestion',
    data() {
        return{
            question:'',
            category:'',
            answer:'',
            group:1,
            required:false,
            categories:['select', 'text', 'date', 'checkbox', 'email', 'radio', 'country'],
            valid:false
        }
    },
    methods: {
        addQuestion(){
            console.log(this.question, this.category, this.answer, this.group, this.required);
        },
        validate(){
            if(this.question=='' || this.category=='' || this.answer=='' || this.group==''){
                return false;
            }else return true;
        }
    }
}
</script>

<style scoped>
    .q-head{
        display:flex;
        flex-direction: column;
        text-align: left;
        justify-content: space-evenly;
    }
    ul{
        list-style-type: none;
        padding:0;
        margin:0;
    }
    input{
        margin-bottom:30px;
    }
    select{
        margin-bottom:30px;
    }
</style>