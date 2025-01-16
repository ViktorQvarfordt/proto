import { useState } from 'react'
import { trpc } from './trpc.js'
import { atom, useAtom, useAtomValue } from 'jotai'

const streamDataAtom = atom<{ status: 'running' | 'idle'; data: number[] }>({
  status: 'idle',
  data: [],
})

// Separate component to demonstrate atoms
const StreamData = () => {
  const streamData = useAtomValue(streamDataAtom)

  return (
    <div>
      {streamData.data.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  )
}

export const App = () => {
  const [singularData, setSingularData] = useState<number>()
  const [streamData, setStreamData] = useAtom(streamDataAtom)

  return (
    <>
      <h1>Proto</h1>

      <div>
        <button
          onClick={async () => {
            const data = await trpc.singular.query()
            setSingularData(data)
          }}
        >
          Get singular data
        </button>

        <div>{singularData}</div>
      </div>

      <div css='height: 16px;' />

      <div>
        <button
          disabled={streamData.status === 'running'}
          onClick={async () => {
            setStreamData({ status: 'running', data: [] })
            const data = await trpc.stream.query()
            for await (const item of data) {
              setStreamData((curr) => ({ ...curr, data: [...curr.data, item] }))
            }
            setStreamData((curr) => ({ ...curr, status: 'idle' }))
          }}
        >
          Get stream data
        </button>

        <StreamData />
      </div>
    </>
  )
}
