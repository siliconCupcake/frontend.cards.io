import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../game-engine/state/reducers'

const preloadedState = {
	locked: false,
	gameData: {
		players: [
			{
				position: 1,
				name: 'Player1'
			},
			{
				position: 2,
				name: 'Player2'
			},
			{
				position: 3,
				name: 'Player3'
			},
			{
				position: 4,
				name: 'Player4'
			},
			{
				position: 5,
				name: 'Player5'
			},
			{
				position: 6,
				name: 'Player6'
			},
		]
	},
	playerData: {
		hand: [
			{
				shape: 'C',
				num: '2'
			},
			{
				shape: 'D',
				num: '6'
			}
		],
		playerId: 1,
		position: 1
	},
	error: null,
	inGame: false,
	isGameStarted: false
}
const rootStore = createStore(
	rootReducer,
	preloadedState,
	composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default rootStore
