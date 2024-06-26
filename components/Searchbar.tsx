"use client"

import { FormEvent, useState } from "react"

const isValidAmazonProductLink=(url: string)=>{
    try{
      const parsedURL = new URL(url)
      const hostname=parsedURL.hostname
      if (hostname.includes('amazon.com') || 
      hostname.includes('amazon.') || 
      hostname.endsWith('amazon')){
        return true;
      }
    }catch(error){
      return false;
    }
    return false;
}

const Searchbar = () => {
  const [searchPrompt,setSearchPrompt]=useState('')
  const [isLoading,setIsLoading]=useState(false)

  const handleSubmit=(event: FormEvent<HTMLFormElement>)=>{
    event.preventDefault();

    const isValidLink=isValidAmazonProductLink(searchPrompt)
    if (!isValidLink){
      return alert('Please provide a valid Amazon link')
    }
    try{
        setIsLoading(true)
    }catch(error){
        console.log(error)
    }finally{
      setIsLoading(false)
    }

    }
  return (
    <form className='flex flex-wrap gap-4 mt-12' 
    onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Enter product link"
        className="searchbar-input"
        value={searchPrompt}
        onChange={(e)=>{setSearchPrompt(e.target.value)}}
        />
        <button type="submit"
        disabled={searchPrompt===''}
        className="searchbar-btn">{isLoading? 'Searching...': 'Search'}</button>
    </form>
  )
}

export default Searchbar