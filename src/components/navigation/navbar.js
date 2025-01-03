/** @format */

'use client'

import Image from 'next/image'
import search from '../../../public/icons/search.svg'
import account from '../../../public/icons/account.svg'
import menu from '../../../public/icons/menu.svg'
import close from '../../../public/icons/close.svg'
import cart from '../../../public/icons/cart.svg'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  const toggleSearch = () => {
    setShowSearch((prev) => {
      const newValue = !prev
      if (newValue) {
        setTimeout(() => {
          inputRef.current?.focus()
        }, 0)
      }
      return newValue
    })
  }

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowSearch(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className='flex sticky top-0 z-50 justify-between md:justify-around text-white items-center bg-blue-950 gap-4 md:gap-10 px-4 lg:px-10 xl:px-28 py-5'>
      <div className='flex gap-4 items-center'>
        <Image
          src={menu}
          className='block md:hidden'
          alt=''
          width={27}
          height={27}
        />
        <h1 className='text-base md:text-2xl'>MGDSTV</h1>
      </div>
      <div className='text-center hidden md:flex'>
        <ul className='flex gap-10 lg:gap-12 relative'>
          <li>
            <Link href='/' className=''>
              Home
            </Link>
          </li>
          <li>
            <Link href='/subscription' className=''>
              Products
            </Link>
          </li>
          <li className='relative group'>
            Services
            <span className='absolute hidden group-hover:block top-full left-0  shadow-md rounded pt-7'>
              {' '}
              <ul className='bg-white rounded-b-md space-y-5 text-gray-700 p-4 text-start w-48 font-medium'>
                <li className=''>
                  <Link href='/subscription' className='hover:text-blue-800'>
                    Subscriptions
                  </Link>
                </li>
                <li className=''>
                  <Link href='/installation' className='hover:text-blue-800'>
                    Installation
                  </Link>
                </li>
              </ul>
            </span>
          </li>
          <li>
            <Link href='/subscription' className=''>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      {showSearch && (
        <>
          {/* Dark background overlay */}
          <div
            role='touch'
            onClick={toggleSearch}
            className='fixed inset-0 bg-black bg-opacity-50'></div>
          {/* Search input container */}
          <div className='absolute w-[70vw] md:w-[57vw] lg:w-[51vw] xl:w-[50vw] top-24 left-1/2 transform -translate-x-1/2 shadow-xl rounded-full'>
            <div className='relative w-full'>
              <input
                ref={inputRef}
                className='w-full text-gray-800 text-base px-7 py-3 rounded-full'
                placeholder='Search for products'
                autoFocus
              />
              <span className='absolute top-[6px] right-2 rounded-full bg-blue-950 p-1'>
                <Image src={search} alt='' width={27} height={27} />
              </span>
            </div>
            <Image
              onClick={toggleSearch}
              className='absolute cursor-pointer -right-10 top-1'
              src={close}
              alt=''
              width={35}
              height={35}
            />
          </div>
        </>
      )}

      <div className='flex gap-5 lg:gap-10 text-base items-center'>
        <button onClick={toggleSearch} className='rounded-full bg-blue-950 p-1'>
          <Image
            src={search}
            alt=''
            className=' cursor-pointer'
            width={30}
            height={30}
          />
        </button>
        <Link href='/auth/signin'>
          <button className=' w-fit flex gap-2 items-center'>
            <Image src={account} alt='' className='' width={27} height={27} />
          </button>
        </Link>
        <Link href='/cart'>
          <div className='flex flex-col w-fit md:flex-row md:gap-2 items-center'>
            <span className='relative'>
              <Image
                src={cart}
                alt='cart icon'
                className=''
                width={30}
                height={30}
              />
              <span className='absolute bg-green-500 border-2 border-green-700 text-[12px] font-medium min-w-[19px] min-h-[17px] pl-[2px] pr-[2px] text-center rounded-full -top-2 -right-2'>
                <p className='h-1 -mt-[5px]'>5</p>
              </span>
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}
