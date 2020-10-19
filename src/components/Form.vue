<template>
    <form id="signup-form" type="submit">
        <!-- <div v-if="section==0" class="intro">
                <h5>{{startText}}</h5>
                <button class="btn btn-primary" :disabled="!agree" @click.prevent="test">Start</button>
                <span>
                    <input type="checkbox" name="agree" id="agree" v-model="agree">
                    I agree with the data processing.
                </span>
                <span class="form-control-sm text-danger" v-if="agree==false">You must agree with the data processing first.</span>
        </div> -->
        <Question/>
        
    </form>
</template>

<script>
//import axios from 'axios';
import Question from './Question'
//import JQuery from 'jquery'


export default {
    name: 'Form',
    components: {
        Question
    },
    data: function(){
        return {
            questions: [
                {q:'', a:[], group:1}
            ],
            answers:[],
            countries:[],
            agree:false,
            startText: 'You have 5 minutes to complete the form. All the questions marked with a red asterix are required. All the input data is registered and sent to the server after submitting. Good luck!'
        }
    },
    methods: {

    },

    created(){
        // axios.get("https://restcountries.eu/rest/v2/all")
        // .then(res => {
        //     this.countries = res.data
        //     })
        // .catch(err => console.log(err))
    }
}
</script>

<style scoped>

    .form-group{
        display:flex;
        flex-direction: column;
    }

    label{
        text-align:left;
    }
    
</style>

