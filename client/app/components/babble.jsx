import React from 'react';
import {Card, CardTitle, CardText, Dropdown, Button} from 'react-toolbox';
import {connect} from 'react-redux';
import * as babbleActions from '../actions/babble.actions';

class Babble extends React.Component {

	constructor(){
		super();
		this.state={
			selectedCat: "",
			generated: ""
		};
	}

	componentDidMount(){
		this.props.loadBabble();
	}
	
	handleSelection(cat){
		this.setState({
			selectedCat: cat
		},()=>{
			this.generateText();
		});
	}

	getPrefix() {
		if (!this.props.babble.prefix.length) {
			return "";
		}
		return this.props.babble.prefix[this.randomIntFromInterval(0, this.props.babble.prefix.length-1)];
	}
	
	generateText() {
		
		let generatedText = this.pullItem(this.props.babble.first) + ' ' + this.pullItem(this.props.babble.second) + ' ' + this.pullItem(this.props.babble.third);
		if (this.randomIntFromInterval(1,5) == 5){
			generatedText = this.getPrefix() + ' ' + generatedText;
		}
		this.setState({
			generated: generatedText
		});
	}
	
	pullItem(list){
		let primaryScore = 20;
		let secondaryScore = 15;
		let primaryGeneralScore = 10;
		let secondaryGeneralScore = 5;
		
		
		//first thing we do is allocate a score to the valid items
		let currentScore =0;
		//get primaries
		let primaries = list.filter(item=>{
			return item.primary === this.state.selectedCat;
		});
		//get secondaries
		let secondaries = list.filter(item=>{
			return item.secondary === this.state.selectedCat;
		});
		//get primary generals
		let primaryGenerals = list.filter(item=>{
			return item.primary === "general";
		});
		//get secondary generals
		let secondaryGenerals = list.filter(item=>{
			return item.secondary === "general";
		});
		
		let scoredItems = [];
		
		primaries.forEach(val => {
			scoredItems.push({
				name: val.name,
				min: currentScore +1,
				max: currentScore + primaryScore
			});
			currentScore += primaryScore;
		});
		
		secondaries.forEach(val => {
			scoredItems.push({
				name: val.name,
				min: currentScore +1,
				max: currentScore + secondaryScore
			});
			currentScore += secondaryScore;
		});
		
		primaryGenerals.forEach(val => {
			scoredItems.push({
				name: val.name,
				min: currentScore +1,
				max: currentScore + primaryGeneralScore
			});
			currentScore += primaryGeneralScore;
		});
		
		secondaryGenerals.forEach(val => {
			scoredItems.push({
				name: val.name,
				min: currentScore +1,
				max: currentScore + secondaryGeneralScore
			});
			currentScore += secondaryGeneralScore;
		});
		
		let random = this.randomIntFromInterval(1,currentScore);
		
		let value = scoredItems.filter(val=>{
			return ((val.min <= random) && (val.max >= random))
		})[0].name;
		
		return value;
	}
	
	randomIntFromInterval(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	}

	render() {
		let cats = this.props.babble ? this.props.babble.categories.map(cat=>{return {value: cat, label: cat.toUpperCase()}})
			: [];
		
		return <Card style={{overflow: "visible"}}>
			<CardTitle title="Babble Generator" />
			<CardText style={{overflow: "visible"}}>
				<Dropdown 
					source={cats}
					value={this.state.selectedCat}
					onChange={cat => this.handleSelection(cat)}
				/> <br />
				{this.state.generated && <span>{this.state.generated} <Button icon="refresh" onClick={()=>this.generateText()} /></span>}
			</CardText>
		</Card>
	}
}

const BabbleComponent = connect(
	state => {
		return {
			babble: state.babble
		}
	},
	dispatch => {
		return {
			loadBabble: () => dispatch(babbleActions.loadBabble())
		}
	}
)(Babble);

export default BabbleComponent;