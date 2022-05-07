/* eslint-disable prettier/prettier */
import { BigInt } from '@graphprotocol/graph-ts'
import { SentNote as TSentNote } from '../generated/Gravity/Gravity'
import { SentNote } from '../generated/schema'

export function handleSendNote(event: TSentNote): void {
  const note = new SentNote(event.transaction.hash.toHex())
  note.note = event.params.note
  note.sender = event.params.sender
  note.timestamp = event.block.timestamp
  note.save()
}
