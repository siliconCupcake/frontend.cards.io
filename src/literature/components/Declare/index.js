import React, { useState, useEffect, useCallback } from 'react'
import { Modal, Button, Tab, Tabs } from 'react-bootstrap'

import classes from './Declare.module.css'
import {literatureGameActions} from '../../state/actions/game.actions'
import {useDispatch, useSelector} from 'react-redux'
import { Friends } from './components/Friends'
import { DisplayCards } from './components/DisplayCards'
import { Suits } from './components/Suits'

export const Declare = ({ open, handleClose }) => {
	const [suit, setSuit] = useState(1)
    const [cards, setCards] = useState([]);
    const dispatch = useDispatch();
    const userCards = useSelector(state => state.playerData.hand)
    const locked = useSelector(state => state.locked)
    const user = useSelector(state => state.playerData)
    const game = useSelector(state => state.gameData)
    const isEven = user.position % 2 == 0;
    const friends = game.players.filter(player => 
        player.position !== user.position && ((player.position % 2 === 0) === isEven) 
    )
	const [selectedFriend, setselectedFriend] = useState(friends[0].position)
	const shapes = ['C', 'D', 'H', 'S']
	useEffect(() => {
		let nums;
		if (suit == 0) nums = ['2', '3', '4', '5', '6', '7']
		else nums = ['9', '10', 'J', 'Q', 'K', 'A']
		let ret = []
		for (let i = 0; i < 6; i++) {
			for (let j = 0; j < 4; j++) {
				ret.push({
					num: nums[i],
					shape: shapes[j],
					assignedTo: ''
				})
			}
		}
		ret = ret.filter(
            (item) =>
                !userCards.some(
                    (userCard) =>
                        userCard.num === item.num &&
                        userCard.shape === item.shape
                )
        )
		setCards(ret)
	}, [suit])
	const assign = (card) => {
		let prev = cards.map(item => {
			if (card.num === item.num && card.shape === item.shape)
				item.assignedTo = selectedFriend
			return item
		})
		setCards(prev)
    }
    const declare = useCallback(() => {
        if (cards.some(card => card.assignedTo === '')) return
        else {
            let declaration = [[]];
            let last_num, j = 0; 
            cards.sort((a, b) => a.assignedTo - b.assignedTo)
            last_num = parseInt(cards[0].assignedTo);
            declaration[j].push(cards[0].num + cards[0].shape);
            for (let i=1; i<cards.length; i++) {
                if (parseInt(cards[i].assignedTo) !== last_num) {
                    declaration.push([]);
                    j++;
                    last_num = parseInt(cards[i].assignedTo)
                }
                declaration[j].push(cards[i].num + cards[i].shape);
            }
            dispatch(literatureGameActions.playDeclare({
                code: game.gameCode,
                fid: user.playerId,
                declaration
            }))
        }
    }, [dispatch])

	return (
		<Modal show={open} onHide={handleClose} dialogClassName={classes.modal}>
			<Modal.Header closeButton>
				<Modal.Title>Declare cards</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Select friend</p>
                <Friends selectedFriend={selectedFriend} setselectedFriend={setselectedFriend}
                classes={classes} friends={friends} />
				<p>Select suit</p>
				<Suits classes={classes} suit={suit} setSuit={setSuit} />
				<p>Select cards</p>
                <DisplayCards classes={classes} cards={cards} assign={assign} />
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button disabled={locked} variant="primary" onClick={declare}>
					Declare
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
