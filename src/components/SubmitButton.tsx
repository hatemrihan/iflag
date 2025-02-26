import React from 'react'
import { Button } from './ui/button'


interface ButtonProps {
    isLoading: boolean,
    className?: string,
    disabled?: boolean; 
    children: React.ReactNode,
}

const SubmitButton = ({isLoading, className, children}: ButtonProps) => {
  return (
 <Button type='submit' disabled={isLoading} className={ className ?? 'w-fill'}>
    {/* kan fe loon akhder ll submit : shad-primary-btn  */}
{
    isLoading ? (
        <div className='flex items-center gap-4'>
Loading...
        </div>
    ): children
}
 </Button>
  )
}

export default SubmitButton