import { Box, Button, Center, Container, Flex } from '@chakra-ui/react'
import { useState } from 'react'

import { calculateWinner } from 'lib/ticTacToe'

function Square({
  value,
  onClick,
}: {
  value: number
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}) {
  return (
    <Button
      border="1px"
      borderRadius={0}
      mr="-1px"
      mt="-1px"
      h="40px"
      w="40px"
      onClick={onClick}
    >
      {value}
    </Button>
  )
}

function Board({
  squares,
  onClick,
}: {
  squares: number[]
  onClick: (i: number) => void
}) {
  function renderSquare(i: number) {
    return <Square value={squares[i]} onClick={() => onClick(i)} />
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }])
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)

  function handleClick(i: number) {
    const newHistory = history.slice(0, stepNumber + 1)
    const current = newHistory[newHistory.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = xIsNext ? 'X' : 'O'
    setHistory(newHistory.concat([{ squares }]))
    setStepNumber(newHistory.length)
    setXIsNext(!xIsNext)
  }

  function jumpTo(step: number) {
    setStepNumber(step)
    setXIsNext(step % 2 === 0)
  }

  const current = history[stepNumber]
  const winner = calculateWinner(current.squares)

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start'
    return (
      <li key={move}>
        <Button onClick={() => jumpTo(move)}>{desc}</Button>
      </li>
    )
  })

  let status
  if (winner) {
    status = `Winner: ${winner}`
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  return (
    <Container>
      <Center h="100vh">
        <Flex>
          <Center>
            <Board squares={current.squares} onClick={(i) => handleClick(i)} />
          </Center>
          <Box ml={12}>
            <div>{status}</div>
            <ol>{moves}</ol>
          </Box>
        </Flex>
      </Center>
    </Container>
  )
}
