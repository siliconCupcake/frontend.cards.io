import React from 'react'
import { Grid, Card, CardContent } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import './HomePage.css'

const styles = (theme) => ({
	cards: {
		border: '1px solid',
		borderColor: theme.palette.primary.dark,
		margin: theme.spacing(0.5),
		marginLeft: theme.spacing(15),
		marginRight: theme.spacing(15),
		'& > *': {
			padding: theme.spacing(1),
			paddingBottom: 0,
			'&:last-child': {
				paddingBottom: theme.spacing(1)
			}
		},
		'&:hover': {
			backgroundColor: theme.palette.primary.light
		}
	},
	selectedCard: {
		backgroundColor: theme.palette.primary.light
	},
	chips: {
		backgroundColor: theme.palette.primary.dark,
		margin: theme.spacing(0.5)
	},
	btn: {
		margin: theme.spacing(1)
	}
})

class JoinGamePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			position: 0,
			gameCode: ''
		}
	}
	handleNameInputChange = (e) => {
		this.setState({
			name: e.target.value
		})
	}
	handlePositionInputChange = (e) => {
		this.setState({
			position: e.target.value
		})
	}
	handleGameCodeInputChange = (e) => {
		this.setState({
			gameCode: e.target.value
		})
	}
	handleGameCodeSubmit = () => {
		this.props.probeGameRequest(this.state.gameCode)
	}
	joinGame = () => {
		if (
			this.state.position != 0 &&
			this.state.name != '' &&
			this.state.gameCode != ''
		)
			this.props.joinGame(this.state)
	}
	render() {
		const { classes } = this.props
		const data = [
			{ name: 'Nandha', position: 1 },
			{ name: 'Bharath', position: 2 },
			{ name: 'Naven', position: 3 },
			{ name: 'Tejus', position: 4 },
			{ name: 'Shohan', position: 5 },
			{ name: 'Vivek', position: 6 }
		]
		return (
			// <div className="homePageForm">
			// 	<input
			// 		name="gameCode"
			// 		type="text"
			// 		placeholder="Game Code"
			// 		onChange={this.handleGameCodeInputChange}
			// 	/>
			// 	<input
			// 		name="probeGame"
			// 		type="button"
			// 		value="Probe Game"
			// 		onClick={this.handleGameCodeSubmit}
			// 	/>
			// 	{this.props.players != undefined
			// 		? this.props.players.map((ele) => {
			// 				if (ele.name != '<Available>')
			// 					return <p>{ele.name}</p>
			// 		  })
			// 		: null}
			// 	<input
			// 		name="JoinName"
			// 		type="text"
			// 		placeholder="Name"
			// 		onChange={this.handleNameInputChange}
			// 	/>
			// 	<select onChange={this.handlePositionInputChange}>
			// 		<option value={0} selected>
			// 			No Position Selected
			// 		</option>
			// 		{this.props.players != undefined
			// 			? this.props.players.map((ele) => {
			// 					if (ele.name === '<Available>')
			// 						return (
			// 							<option value={ele.position}>
			// 								{ele.position}
			// 							</option>
			// 						)
			// 			  })
			// 			: null}
			// 	</select>
			// 	<input
			// 		type="button"
			// 		value="Join Game"
			// 		onClick={this.joinGame}
			// 	/>
			// </div>
			<div className="home-page-form">
				<Grid container item>
					{data.map((slot, i) => (
						<Grid item xs={12} key={i}>
							<Card className={classes.cards} variant="outlined">
								<CardContent>
									{slot.position + ' - ' + slot.name}
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</div>
		)
	}
}
export default withStyles(styles)(JoinGamePage)
