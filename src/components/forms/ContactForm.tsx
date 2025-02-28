import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Button from '../Button'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'

const ContactForm = () => {
  return (
    
    <section className='min-h-screen w-screen flex flex-col items-center justify-center px-5 bg-stone-900'>
        <h1 className='text-2xl font-bold mb-7 text-center text-white'>Join Our Ramadan Challenge!</h1>
<Card className='max-w[500px] w-full bg-stone-900'>
{/* <Image  */}
<Tabs defaultValue='sales'>
    <CardContent className='mt-5 bg-stone-900'>
        <TabsList className='grid grid-cols-2 bg-stone-700'>
            <TabsTrigger value='sales' className='text-black '>
                Get Appointment
            </TabsTrigger>
            <TabsTrigger value='Support' className='text-black'>
                Support
            </TabsTrigger>
        </TabsList>
        <TabsContent value='sales'>
<p className='text-muted-foreground text-sm text-center'>Get Your Appointment Session Now</p>
<form
 action="https://getform.io/f/bqokmylb" 
 method="POST" 
//  action={GetAppointmentAction}
 className='flex flex-col mt-5 gap-y-4'>
<input type="hidden" name="_gotcha" />
    <div className='grid space-y-1'>
<Label className='text-white'>Name</Label>
<Input className='bg-stone-900 text-white' name='name' placeholder='Hatem Rihan' />
    </div>
    <div className='grid space-y-1'>
    <Label className='text-white'>Email</Label>
    <Input className='bg-stone-900 text-white' name='email' placeholder='iflagbars@example.com' />
    </div>
    <div className='grid space-y-1'>
    <Label className='text-white'>Phone Number</Label>
    <Input className='bg-stone-900 text-white' name='phone' placeholder='+20 1234567899' />
    </div>
    <div className='flex flex-row gap-x-5 items-center space-y-1 sm:flex-col sm:gap-y-2 sm:space-y-0 sm:items-start'>
    <Label className='text-white'>Branch</Label>
<Select name='branch'>
<SelectTrigger className="w-[180px] bg-stone-900 text-white">
<SelectValue placeholder="Select a branch"/>
</SelectTrigger>
<SelectContent>
<SelectGroup>
<SelectLabel >Branch</SelectLabel>
<SelectItem value="Guc">Guc</SelectItem>
<SelectItem value="elementfive">ElementFive</SelectItem>
<SelectItem value="Online">Online</SelectItem>
</SelectGroup>
</SelectContent>
</Select><Label className='text-white'>Session Date</Label>
<Select name='Session Date'>
<SelectTrigger className="w-[180px bg-stone-900 text-white">
<SelectValue placeholder="Select a Session Date"/>
</SelectTrigger>
<SelectContent>
<SelectGroup>
<SelectLabel>Session Date</SelectLabel>
<SelectItem value="4:30pm">4:30 pm - preIftar</SelectItem>
<SelectItem value="9:00pm">9:00 pm</SelectItem>
<SelectItem value="10:00pm">10:00 pm</SelectItem>
</SelectGroup>
</SelectContent>
</Select>
    </div>
<Button className='flex items-center justify-center text-white' type='submit'>Submit</Button>
</form>
        </TabsContent>
        <TabsContent value='Support'>
        <p className='text-muted-foreground text-sm text-center'>Talk to our Support</p>
       <form
        action="https://getform.io/f/bqokmylb"
         method="POST"
        // action={GetAppointmentAction}
         className='flex flex-col gap-y-4 mt-5'>
       <input type="hidden" name="_gotcha" />
       <div className='grid space-y-1'>
<Label className='text-white'>Name</Label>
<Input className='bg-stone-900 text-white' name='name' placeholder='Hatem Rihan' />
    </div>
    <div className='grid space-y-1'>
    <Label className='text-white'>Email</Label>
    <Input className='bg-stone-900 text-white' name='email' placeholder='iflagbars@example.com' />
    </div>
    <div className='grid space-y-1'>
    <Label className='text-white'>Phone Number</Label>
    <Input className='bg-stone-900 text-white' name='phone' placeholder='+20 1234567899' />
    </div>
    <div className='grid space-y-1'>
    <Label className='text-white'>Message</Label>
  <Textarea className='bg-stone-900 text-white' name='message' placeholder='Write your message here' />
    </div>
    <Button className='flex items-center justify-center text-white' type='submit'>Submit</Button>
       </form>
        </TabsContent>
    </CardContent>
</Tabs>
</Card>

    </section>
  )
}

export default ContactForm
