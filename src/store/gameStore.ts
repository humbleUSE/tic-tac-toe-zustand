import { create } from 'zustand'
import type { BoardState, GameState, Player } from '../types'

const emptyBoard = (): BoardState => Array<SquareValue>(9).fill(null)

