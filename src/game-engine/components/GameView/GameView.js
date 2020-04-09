import React, { useEffect, useState } from 'react'
import * as PIXI from 'pixi.js'

import Hand from '../Hand/Hand'

import './GameView.css'

const binom = (n, k) => {
	var coeff = 1
	var i
	if (k < 0 || k > n) return 0
	for (i = 0; i < k; i++) coeff = (coeff * (n - i)) / (i + 1)
	return coeff
}

const bezierEqn = (points, t) => {
	let result = { x: 0, y: 0 }
	let n = points.length - 1
	for (let i = 0; i < points.length; i++) {
		result.x +=
			binom(n, i) * Math.pow(t, i) * Math.pow(1 - t, n - i) * points[i].x
		result.y +=
			binom(n, i) * Math.pow(t, i) * Math.pow(1 - t, n - i) * points[i].y
	}
	return result
}

const findHandCoordinates = (width, height, px, py, count) => {
	let points = [],
		results = []

	width = width - 2 * px
	height = height - 2 * py

	points.push({ x: 0, y: 0 })
	console.log(window.screen.orientation.type)
	if (window.screen.orientation.type.startsWith('landscape')) {
		points.push({ x: 0, y: (2 * height) / 3 })
		points.push({ x: width / 3, y: height })
		points.push({ x: width / 2, y: height })
		points.push({ x: (2 * width) / 3, y: height })
		points.push({ x: width, y: (2 * height) / 3 })
	} else {
		points.push({ x: 0, y: height / 2 })
		points.push({ x: 0, y: (2 * height) / 3 })
		points.push({ x: 0, y: (5 * height) / 6 })
		points.push({ x: width / 3, y: height })
		points.push({ x: width / 2, y: height })
		points.push({ x: (2 * width) / 3, y: height })
		points.push({ x: width, y: (5 * height) / 6 })
		points.push({ x: width, y: (2 * height) / 3 })
		points.push({ x: width, y: height / 2 })
	}
	points.push({ x: width, y: 0 })

	let base = 1 / (count + 1)
	for (let i = 1; i < count + 1; i++) {
		let r = bezierEqn(points, i * base)
		r.y = height - r.y
		r.x += px
		r.y += py
		results.push(r)
	}

	return results
}

const GameView = (props) => {
	const { renderer, player, others, disabled } = props
	const [coordinates, setCoordinates] = useState(
		findHandCoordinates(
			renderer.app.screen.width,
			renderer.app.screen.height,
			50,
			50,
			others.length
		)
	)

	var otherContainer = new PIXI.Container({
		interactive: false
	})
	var playerContainer = new PIXI.Container({
		interactive: true
	})

	renderer.rootContainer.addChild(otherContainer)
	renderer.rootContainer.addChild(playerContainer)

	useEffect(() => {
		setCoordinates(
			findHandCoordinates(
				renderer.app.screen.width,
				renderer.app.screen.height,
				50,
				50,
				others.length
			)
		)
	}, [renderer, others])

	return (
		<>
			{others.map((player, index) => (
				<Hand
					parent={otherContainer}
					count={player.count}
					key={index}
					scale={renderer.cardsScale}
					x={coordinates[index].x}
					y={coordinates[index].y}
					disabled={disabled}
					position={player.position}
					name={player.name}
				/>
			))}
			<Hand
				parent={playerContainer}
				scale={0.8}
				x={renderer.app.screen.width / 2}
				y={renderer.app.screen.height}
				cards={player.hand}
			/>
		</>
	)
}

export default GameView