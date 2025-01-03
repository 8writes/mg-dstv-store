/** @format */

import FeaturedProduct from '@/components/landing-page-sections/featured-products'
import Subscription from '@/components/landing-page-sections/subscription'

export default function Home() {
  return (
    <div className='bg-white text-white'>
      <Subscription />
      <FeaturedProduct />
    </div>
  )
}
