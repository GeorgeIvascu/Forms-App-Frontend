<template>
     <div class=row>
            <div v-if="section==0" class="intro">
                <h5>{{startText}}</h5>
                <button class="btn btn-primary" :disabled="!agree" @click.prevent="next">Start</button>
                <span clas="agree">
                    <input type="checkbox" name="agree" v-model="agree">
                    I agree with the data processing.
                </span>
                <span class="form-control-sm text-danger" v-if="agree==false">You must agree with the data processing first.</span>
            </div>

            <!-- dynamic form rendering -->
            <div class="q-head">
                <h6 v-if="section!=0"> Step {{section}} / {{questions[questions.length-1].group}}</h6>
                <template v-if="startTimer">{{(timerCount/60).toString()[0]}}:{{timerCount%60}}</template>
            </div>
            
            <div class="col-12 form-group" v-for="item in questions" :key="item.q">

                <div v-if="item.group == section">
                    <label class="col-form-label-sm">{{item.q}} <span class="text-danger" v-if="item.required">*</span></label>

                    <!-- radio -->
                    <div v-if ="item.category=='radio'">
                        <ul>
                            <li v-for="i in item.a" :key="i.a">
                                <input type="radio" name="exp" v-model="radio" v-bind:value="i">
                                {{i}}
                            </li>
                        </ul>
                    </div>

                    <!-- checkbox -->
                    <div v-if ="item.category=='checkbox'">
                        <ul>
                            <li v-for="i in item.a" :key="i.a">
                                <input type="checkbox" name="exp" v-model="checkbox" v-bind:value="i">
                                {{i}}
                            </li>
                        </ul>
                    </div>

                    <!-- text + email -->
                    <div v-if="item.category=='text' || item.category=='email'">
                        <input v-if="item.category=='email'" type="email" v-model="email" class="form-control form-control-sm">
                        <input v-else type="text" class="form-control form-control-sm" v-model="fullname">
                    </div>

                    <!--country -->
                    <div v-if="item.category=='country'">
                        <select class="form-control form-control-sm" name="" id="" v-model="country">
                            <option disabled value="">Select country</option>
                            <option v-for="c in countries"  :key="c.name" :value="c.name">{{c.name}}</option>
                        </select>
                    </div>

                    <!-- select-->
                    <div v-if="item.category=='select'">
                        <select class="form-control form-control-sm" name="" id="" v-model="select">
                            <option disabled value="">Select option</option>
                            <option v-for="i in item.a"  :key="i" :value="i">{{i}}</option>
                        </select>
                    </div>

                    <!-- date -->
                    <div v-if="item.category=='date'">
                        <input type="date" class="form-control form-control-sm" v-model="date">
                    </div>

                </div>
            </div>

            <div v-if="section>0" id="btns">
                <button v-if="section>1" class="btn btn-primary" @click.prevent="prev">Previous</button>
                <button v-if="section<questions[questions.length-1].group" class="btn btn-primary" @click.prevent="next" :disabled="!validate()">Next</button>
                <button v-if="section==questions[questions.length-1].group" @click.prevent="submit" class="btn btn-primary" id="submit">Submit</button>
            </div>

            <div v-if="submitted"><p>Thank you. The data has been submitted.</p></div>
     </div>
     
</template>

<script>
import axios from 'axios'


export default {
    name:'Question',
    //props: ['section'],
    data(){
        return {
            section:0,
            radio:'',
            country:'',
            checkbox:[],
            date:'',
            select:'',
            questions: [
                {q:'', a:[], group:1, category:'',required:false}
            ],
            //category: ['radio', 'text', 'email', 'password', 'date', 'select', 'checkbox'],
            selectedAnswer: [
                {q:[], a:[]}
            ],
            fullname:'',
            email:'',
            agree:false,
            submitted: false,
            timerCount:5*60,
            startTimer: false,
            startText: 'You have 5 minutes to complete the form. \n All the questions marked with a red asterix are required. All the input data is registered and sent to the server after submitting. Good luck!'

        }
    },

     created(){
        axios.get("https://restcountries.eu/rest/v2/all")
        .then(res => {
            this.countries = res.data
            })
        .catch(err => console.log(err))

        axios.get('http://localhost:8081/q')
            .then((res) => {
                    this.questions = res.data.map( z => {
                        return {
                            q: z.question,
                            a: z.answer.split(" "),
                            group: z.group,
                            category: z.category,
                            required: z.required
                        }
                    })
            })

    },
   
    methods: {
        submit() {
            this.submitted = true;

            for(let i=0; i<this.questions.length-1; i++){
                this.selectedAnswer[i].q[i] = this.question[i].q
                if(this.question[i].category=='select'){
                    this.selectedAnswer[i].a[i] = this.select;
                }
                if(this.question[i].category=='text'){
                    this.selectedAnswer[i].a[i] = this.fullname;
                }
            }

            console.log(this.selectedAnswer);
        },
         next(){
            this.section++;
            this.countDownTimer()
            this.startTimer = true;

            var currentQuestions =[
                {q:'', group:0, required:false}
            ];
            
            axios.get(`http://localhost:8081/q/${this.section}`)
            .then((res) => {
                    currentQuestions = res.data.map( z => {
                        return {
                            q: z.question,
                            group: z.group,
                            required: z.required
                        }
                    })
            })

            currentQuestions.forEach(e => console.log(e.q));

            //console.log(this.fullname, this.email, this.country, this.date, this.radio, this.checkbox, this.select)
            

            //this.selectedAnswer.push(this.fullname, this.email)
           // console.log(this.selectedAnswer);
            
        },
        prev(){
            this.section--;
        },
        validate(){
            if(this.email =='' || this.fullname=='' || this.date=='' || this.country ==''){
                return false;
            }else return true;
        },
        countDownTimer(){
            if(this.timerCount > 0) {
                    setTimeout(() => {
                        this.timerCount -= 1
                        this.countDownTimer()
                    }, 1000)
            }else{
                this.submitted = true;
            }
        }
    }
   
}
</script>

<style scoped>

    div{
        text-align:left;
    }

    ul{
        list-style: none;
        padding:10px;
    }
    .row{
        display:block;
    }
     #btns , .q-head{
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 15px;
    }
    .intro{
        display:flex;
        flex-direction: column;
        text-align: left;
    }
    .agree{
        padding-top:30px !important;
    }
    
    
</style>