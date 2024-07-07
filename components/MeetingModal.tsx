import React, { ReactNode } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Image from 'next/image';
import { Button } from './ui/button';
  

interface MeetingModalProps { 
    title :string,
    buttonText? : string,
    onClose : () => void,
    image ?: string,
    className?: string,
    buttonIcon? : string,
    isOpen: boolean,
    handleClick? : () => void,
    children?: ReactNode,


}


const MeetingModal = ({isOpen, className, handleClick, buttonText, title, onClose, children, image, buttonIcon} : MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className='flex flex-col gap-6 border-none bg-dark-1 text-white w-full max-w-[540px] px-6 py-9 '>
            <div className='flex flex-col gap-6'>
                {image && (
                    <Image alt='image' src={image} width={72} height={72}/>
                )
            }
                <h1 className={`${className} text-3xl font-bold leading-[42px]`}>
                    {title}
                </h1>
                    {children}
                    <Button className='bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0' onClick={handleClick}>
                        {buttonIcon && 
                        (
                            <Image alt='button iocn' src={buttonIcon} width={13} height={13}/>
                        )} &nbsp;
                        {buttonText || "Schedule meeting"}
                    </Button>
            </div>
            </DialogContent>
    </Dialog>

  )
}

export default MeetingModal