import React from 'react'
import './HomePage.css'
import { Grid, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import CreateGameForm from './CreateGameForm'
import JoinGameForm from './JoinGameForm'
import { connect } from 'react-redux'
import { gameActions } from '../../state/actions'

const styles = (theme) => ({
	title: {
		margin: theme.spacing(4),
		textAlign: 'center',
		fontSize: '3em',
		fontWeight: 'bold'
	},
	root: {
		margin: theme.spacing(4)
	}
})

class HomePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			form: 'create'
		}
	}

	switchToCreateGame = () => {
		this.setState({
			form: 'create'
		})
	}
	switchToJoinGame = () => {
		this.setState({
			form: 'join'
		})
	}
	render() {
		const { locked } = this.props
		const { classes } = this.props
		return (
			<div className="home-page-container">
				<Grid container>
					<Grid item className={classes.title} xs={12}>
						cards.io
					</Grid>
					<Grid
						container
						item
						className={classes.root}
						xs={12}
						justify="center"
					>
						<TextField
							label="who art thou?"
							type="text"
							size="small"
							variant="outlined"
						/>
						<Grid item container className={classes.root}>
							<Grid item xs>
								<CreateGameForm
									createGame={this.handleCreateGameFormSubmit}
									locked={locked}
								/>
							</Grid>
							<Grid item xs={1}>
								{/* D */}
							</Grid>
							<Grid item xs>
								<JoinGameForm
									joinGame={this.handleJoinGameFormSubmit}
									probeGameRequest={
										this.props.probeGameRequest
									}
									players={this.props.players}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
		)
	}
	handleCreateGameFormSubmit = (user) => {
		this.props.createGame(user)
	}
	handleJoinGameFormSubmit = (user) => {
		this.props.joinGame(user)
	}
}
HomePage.propTypes = {
	createGame: PropTypes.func.isRequired,
	JoinGame: PropTypes.func.isRequired,
	locked: PropTypes.bool.isRequired,
	probeGameRequest: PropTypes.func.isRequired,
	players: PropTypes.array,
	inGame: PropTypes.bool.isRequired
}
const mapStateToProps = (state) => {
	return {
		locked: state.locked,
		players: state.gameData.players,
		inGame: state.inGame
	}
}
const mapDispatchToProps = (dispatch) => ({
	createGame: (user) => dispatch(gameActions.createGame(user)),
	probeGameRequest: (gameCode) =>
		dispatch(gameActions.getPlayersList(gameCode)),
	joinGame: (user) => dispatch(gameActions.joinGameRequest(user))
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(HomePage))
