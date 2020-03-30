import React from 'react'
import PropTypes from 'prop-types'
import {
	Card,
	CardContent,
	CardHeader,
	CardActionArea
} from '@material-ui/core'
import { Grid, Chip, IconButton, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import './HomePage.css'

const styles = (theme) => ({
	cards: {
		border: '1px solid',
		borderColor: theme.palette.primary.dark,
		margin: theme.spacing(1),
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
	chips: {
		backgroundColor: theme.palette.primary.dark,
		margin: theme.spacing(0.5)
	},
	btn: {
		margin: theme.spacing(1)
	}
})

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
	handleGameTypeChange = (e) => {
		console.log(e)
		// this.setState({
		// 	game: e.target.value
		// })
	}
	handlePositionInputChange = (e) => {
		this.setState({
			position: e.target.value
		})
	}
	handleCreateGameFormSubmit = () => {
		this.props.createGame(this.state)
	}
	render() {
		const { locked } = this.props
		const { classes } = this.props
		const data = [
			{ name: 'Literature', tags: ['Team', '6 to 8'], rules: 'link' },
			{ name: 'Ace', tags: ['4 to 8'], rules: 'link' },
			{ name: 'Hearts', tags: ['Team', 'Only 4'], rules: 'link' },
			{ name: 'Bridge', tags: ['Team', '6 to 8'], rules: 'link' },
			{ name: 'Rummy', tags: ['4 to 6'], rules: 'link' }
		]
		return (
			// <div className="homePageForm">
			// 	<input
			// 		name="name"
			// 		type="text"
			// 		placeholder="Name"
			// 		onChange={this.handleNameInputChange}
			// 	/>
			// 	<select name="game">
			// 		<option value="literature">Literature</option>
			// 	</select>
			// </div>
			<div className="home-page-form">
				<Grid container>
					<Grid container item>
						{data.map((game) => (
							<Grid
								item
								xs={12}
								sm={6}
								md={4}
								key={data.indexOf(game)}
							>
								<Card
									className={classes.cards}
									variant="outlined"
								>
									<CardHeader
										title={game.name}
										titleTypographyProps={{ variant: 'h6' }}
										action={
											<IconButton aria-label="Rules">
												<InfoOutlinedIcon
													fontSize="small"
													color="primary"
												/>
											</IconButton>
										}
									/>
									<CardContent>
										{game.tags.map((tag, i) => (
											<Chip
												key={i}
												className={classes.chips}
												size="small"
												label={tag}
											/>
										))}
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
					<Grid container item justify="center">
						<Button
							variant="outlined"
							className={classes.btn}
							color="primary"
							onClick={this.handleCreateGameFormSubmit}
							disabled={locked}
						>
							Create Game
						</Button>
					</Grid>
				</Grid>
			</div>
		)
	}
}
CreateGameForm.propTypes = {
	createGame: PropTypes.func.isRequired,
	locked: PropTypes.bool.isRequired
}
export default withStyles(styles)(CreateGameForm)
