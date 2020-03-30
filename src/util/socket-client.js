import io from 'socket.io-client'
var socket
if (localStorage.getItem('playerId')) {
	socket = io('http://localhost:8000/literature', {
		query: { playerId: localStorage.getItem('playerId') }
	})
} else {
	socket = io('http://localhost:8000/literature')
}

export default socket
