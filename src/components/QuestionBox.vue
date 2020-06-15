<template>
  <div class="question-box-container">
		<b-jumbotron>

			<template v-slot:lead>
				{{currentQuestion.question}}
			</template>

			<hr class="my-4">

			<b-list-group>
				<b-list-group-item v-for="(answer, index) in shuffledAnswers"
				:key="index"
				@click="selectedAnswer(index)"
				:class="answerClass(index)">
					{{answer}}
					</b-list-group-item>
			</b-list-group>

			<b-button id="submit-btn" variant="primary"
			@click="submitAnswer"
			:disabled="selectedIndex === null || answered"
			>Submit</b-button>
			<b-button variant="success" href="#"
			@click="next">Next</b-button>
		</b-jumbotron>
	</div>
</template>
<script>
import _ from 'lodash'
export default {
	props:{
		currentQuestion:Object,
		next:Function,
		increment:Function
	},
	data (){
		return {
			selectedIndex: null,
			correctIndex:null,
			answered:false,
			shuffledAnswers:[]
		}
	},
	computed:{
    answers(){
			let answers = [...this.currentQuestion.incorrect_answers]// Creating a copy of actual array by using ...
			answers.push(this.currentQuestion.correct_answer);
			return answers;
    }
	},
	watch:{
		// currentQuestion(){
		// 	this.selectedIndex = null
		// 	this.shuffleAnswers()
		// }
		currentQuestion: { // to effect shuffled answers on page load it self
			immediate:true, // instead of watching currentQuestion when it updates it check when currentQuestion passed as props
			handler () {
				this.selectedIndex = null
				this.answered = false
				this.shuffleAnswers()
			}
		}
	},
	methods:{
		selectedAnswer(index){
			this.selectedIndex = index;
		},
		shuffleAnswers(){
			let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
			this.shuffledAnswers = _.shuffle(answers);
			this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer)
		},
		submitAnswer(){
			let isCorrect = false;

			if(this.selectedIndex === this.correctIndex){
				isCorrect = true;
			}
			this.answered = true;
			this.increment(isCorrect);
		},
		answerClass(index){
				let answerClass = '';

				if(!this.answered && this.selectedIndex === index){
					answerClass = 'selected';
				} else if (this.answered && this.correctIndex === index){
					answerClass = 'correct';
				}
				else if(this.answered && this.selectedIndex == index && this.correctIndex !== index){
					answerClass = 'incorrect'
				}

				return answerClass
		}
	}
}
</script>

<style scoped>
.list-group{
	margin-bottom: 15px;
}
.btn{
	margin: 0 5px;
}
.list-group-item:hover{
	background: #eee;
	cursor: pointer;
}
.selected{
	background: lightblue;
}
.correct{
	background: lightgreen;
}
.incorrect{
	background: red;
}
</style>