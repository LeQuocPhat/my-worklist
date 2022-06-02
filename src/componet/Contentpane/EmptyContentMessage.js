import React from 'react'
import { Message } from 'semantic-ui-react'

const EmptyContentMessage = (props) => {
  return (
    <Message>
        <Message.Header>
            No Work in the date '{props.workDate}'
        </Message.Header>
    </Message>
  )
}

export default EmptyContentMessage
