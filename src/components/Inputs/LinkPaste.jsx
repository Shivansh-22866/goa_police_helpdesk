import React from 'react'
import { IconLink } from '@tabler/icons-react'

const LinkPaste = ({handleLinkPaste}) => (
    <label htmlFor='link-input' className='cursor-pointer'>
        <IconLink size={21} />
        <input type='text' id='link-paper' className='hidden' onChange={handleLinkPaste} />
    </label>
)

export default LinkPaste