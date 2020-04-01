import React from 'react'
import PropTypes from 'prop-types'
import './HomePage.css'

import { withStyles } from '@material-ui/core/styles'
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	Chip,
	Grid,
	IconButton
} from '@material-ui/core'

import { InfoOutlined as InfoIcon } from '@material-ui/icons'

const styles = (theme) => ({
	root: {},
	flexGrow: {
		flexGrow: 1
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	card: {
		border: '3px solid',
		borderRadius: '8px',
		margin: theme.spacing(0.8),
		'&:hover': {
			cursor: 'pointer'
		}
	},
	chip: {
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.5)
	},
	itemGrid: {
		alignContent: 'center'
	},
	cardHeader: {
		padding: theme.spacing(0.5),
		paddingLeft: theme.spacing(1.5),
		'&:last-child': {
			paddingBottom: theme.spacing(1)
		},
		'& > .MuiCardHeader-content > .MuiTypography-h5': {
			fontSize: '1.2rem',
			fontWeight: 'bold'
		}
	},
	cardContent: {
		padding: theme.spacing(0.5),
		paddingTop: 0,
		paddingBottom: 0,
		'&:last-child': {
			paddingBottom: theme.spacing(1)
		}
	},
	joinBtnContainer: {
		marginTop: theme.spacing(2)
	},
	formButton: {
		'&:focus': {
			outline: 'none'
		}
	},
	infoButton: {
		color: 'black',
		'&:focus': {
			outline: 'none'
		}
	}
})

const createGameData = [
	{ name: 'Literature', tags: ['Team', '6 to 8'], rules: 'link' },
	{ name: 'Ace', tags: ['4 to 8'], rules: 'link' },
	{ name: 'Hearts', tags: ['Team', 'Only 4'], rules: 'link' },
	{ name: 'Bridge', tags: ['Team', '6 to 8'], rules: 'link' },
	{ name: 'Rummy', tags: ['4 to 6'], rules: 'link' }
]
class CreateGameForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			position: 0,
			game: 'literature'
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
	handleCreateGameFormSubmit = () => {
		this.props.createGame(this.state)
	}

	handleCreateGameCardClick = (e) => {
		console.log('card', e)
	}

	handleCreateGameInfoClick = (e) => {
		// Stop click event propagation to parent(handleCreateGameCardClick)
		e.stopPropagation()
		console.log('info', e)
	}

	render() {
		const { classes, locked } = this.props
		return (
			<>
				{createGameData.map((game) => (
					<Grid
						item
						xl={4}
						md={4}
						sm={6}
						xs={12}
						className={classes.itemGrid}
					>
						<Card
							className={classes.card}
							variant="outlined"
							onClick={this.handleCreateGameCardClick}
						>
							<CardHeader
								className={classes.cardHeader}
								action={
									<div>
										<IconButton
											aria-label="settings"
											className={classes.infoButton}
											onClick={
												this.handleCreateGameInfoClick
											}
										>
											<InfoIcon fontSize="small" />
										</IconButton>
									</div>
								}
								title={game.name}
							/>
							<CardContent className={classes.cardContent}>
								{game.tags.map((tag, i) => (
									<Chip
										key={i}
										className={classes.chip}
										size="small"
										label={tag}
									/>
								))}
							</CardContent>
						</Card>
					</Grid>
				))}
				<Grid
					container
					xs={12}
					sm={12}
					xl={12}
					justify="center"
					className={classes.joinBtnContainer}
				>
					<Button
						className={classes.formButton}
						size="small"
						variant="contained"
						color="primary"
					>
						Host
					</Button>
				</Grid>
			</>
		)
	}
}
CreateGameForm.propTypes = {
	createGame: PropTypes.func.isRequired,
	locked: PropTypes.bool.isRequired
}

export default withStyles(styles)(CreateGameForm)
