import React from 'react'
import parse from 'html-react-parser';
export default function MessageBody({body}:{body:string}) {
  return (
    <div className='prose lg:prose-xl'>
      {parse(`<p> ${body}</p>`)}
    </div>
  )
}

