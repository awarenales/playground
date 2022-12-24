import { atom } from 'jotai'

export const userLocationAtom = atom('0_visitor')

export const userAtom = atom<
  Record<string, unknown> | Promise<Record<string, unknown>>
>({})
