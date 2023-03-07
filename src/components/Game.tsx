import React from 'react'
import { Engine } from '@/components/Engine'
import Controls from './Controls'

export default function Game({ canvas }: { canvas: HTMLCanvasElement }) {
  const [game] = React.useState<Engine>(new Engine({ canvas }))
  game.start()

  return (
    <>
      <Controls rotateCube={game.rotateCube} />
    </>
  )
}
