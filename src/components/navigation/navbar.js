/** @format */

import Image from 'next/image'

import search from '../../../public/icons/search.svg'
import account from '../../../public/icons/account.svg'
import menu from '../../../public/icons/menu.svg'
import cart from '../../../public/icons/cart.svg'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className='flex sticky top-0 justify-around text-white items-center bg-blue-900 gap-4 md:gap-10 px-3 lg:px-10 xl:px-20 py-5'>
      <div className='flex gap-2 flex-none xl:w-60 items-center'>
        <Image src={menu} className='block md:hidden' alt='' width={27} height={27} />
        {/**  <Image src={logo} alt="MicgrandDSTV Logo" width={200} height={100} />*/}
        <h1 className='text-base md:text-2xl'>MG</h1>
      </div>
      <div className='w-full'>
        <div className='relative w-full'>
          <input
            className='w-full text-gray-800 text-base px-7 py-3 rounded-full'
            placeholder='Search for products'
          />
          <span className='absolute top-[6px] right-2 rounded-full bg-blue-900 p-1'>
            <Image src={search} alt='' width={27} height={27} />
          </span>
        </div>
      </div>

      <div className='flex flex-none xl:60 md:gap-7 text-base items-center'>
        <Link href='/auth/signin'>
          <button className='hidden w-fit md:flex gap-2 items-center'>
            <Image src={account} alt='' width={24} height={24} />
            <h1>Sign In</h1>
          </button>
        </Link>
        <Link href='/cart'>
          <div className='flex flex-col w-fit md:flex-row md:gap-2 items-center'>
            <span className='relative'>
              <Image src={cart} alt='cart icon' width={27} height={27} />
              <span className='absolute bg-green-500 border-2 border-green-700 text-[12px] font-medium min-w-[20px] min-h-[17px] pl-[2px] pr-[2px] text-center rounded-full -top-2 -right-2'>
                <p className='h-1 -mt-[5px]'>2</p>
              </span>
            </span>
            <h1 className='text-[0.6rem] md:text-sm'>₦0.00</h1>
          </div>
        </Link>
      </div>
    </div>
  )
}
