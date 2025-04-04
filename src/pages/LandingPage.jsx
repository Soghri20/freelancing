import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import React from 'react'
import { Link } from 'react-router-dom'
import companies from '../data/companies.json'
import Autoplay from 'embla-carousel-autoplay'
import faq from '../data/faq.json'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Accordion, AccordionItem } from '@radix-ui/react-accordion'
import { AccordionContent, AccordionTrigger } from '@/components/ui/accordion'

const LandingPage = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      <section className='text-center'>
        <h1 className='flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tight py-4'>Find Your Dream Job <span className='flex items-center gap-2 sm:gap-6'>and get <img src='/logo2.png' className='h-14 sm:h-24 lg:h-32' /></span></h1>
        <p className='text-gray-300 sm:mt-4 text-xs sm:text-xl'>
          Explore thousands of job listings or find the perfect candidate.
        </p>
      </section>
      <div className='flex gap-6 justify-center'>
        {/* button */}
        <Link to='/jobs'>
           <Button variant={'blue'} size={'xl'}>Find Jobs</Button>
        </Link>
        <Link to='/post-jobs'>
           <Button size={'xl'}>Post a Jobs</Button>
        </Link>
      </div>
        {/* carousel */}
        <Carousel
         className="w-full py-10"
         plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
    >
      <CarouselContent className='flex gap-5 sm:gap-20 items-center'>
       {companies.map(({name,id,path})=>{
        return (
          <CarouselItem className='basis-1/3 lg:basis-1/6 '>
            <img src={path} name={name} className='h-9 object-contain' />
          </CarouselItem>
        )
       })}
      </CarouselContent>
    </Carousel>
     <img src="/banner.jpeg" className='w-full' />
      <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <Card>
       <CardHeader>
        <CardTitle>For Job Seekers</CardTitle>
       </CardHeader>
      <CardContent>
         <p>Card Content</p>
      </CardContent>
    </Card>
<Card>
  <CardHeader>
    <CardTitle>For Employers</CardTitle>
  </CardHeader>
  <CardContent>
    Post jobs , manage application, and find the best candidates
  </CardContent>

</Card>


      </section>
      <Accordion type="single" collapsible>
        {faq.map((item,index)=>{
          return (
            <AccordionItem key={index} value={`item-${index-1}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
          )
        })}
 
</Accordion>

      {/* accordiom */}
    </main>
  )
}

export default LandingPage
