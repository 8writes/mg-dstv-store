/** @format */
'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import dstv from '../../../public/images/dstv.png'
import gotv from '../../../public/images/gotv.jpg'
import showmax from '../../../public/images/showmax.png'
import dropdown from '../../../public/icons/dropdown.svg'

// Custom Dropdown Component
const CustomDropdown = ({ label, options, value, onChange, name }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleOptionClick = (optionValue) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='mb-4 text-gray-800' ref={dropdownRef}>
      <label
        htmlFor={name}
        className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
      </label>
      <div className='relative'>
        <button
          type='button'
          className='w-full bg-gray-50 border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center'
          onClick={() => setIsOpen((prev) => !prev)}>
          {value
            ? options.find((option) => option.value === value)?.label ||
              `Select ${label.toLowerCase()}`
            : `Select ${label.toLowerCase()}`}
          <span className='ml-2'>
            <Image src={dropdown} alt='' width={27} height={27} />
          </span>
        </button>
        {isOpen && (
          <ul className='absolute max-h-44 overflow-y-auto z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg'>
            {options.map((option, index) => (
              <li
                key={index}
                className='py-2 px-3 hover:bg-gray-100 cursor-pointer'
                onClick={() => handleOptionClick(option.value)}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

// Main Component
export default function Subscription() {
  const [activeTab, setActiveTab] = useState('gotv')
  const [formData, setFormData] = useState({
    email: '',
    package: '',
    iucNumber: '',
    decoderType: '',
    smartCardNumber: '',
    months: '',
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const apiPayload = {
      service: activeTab,
      ...formData,
    }
    console.log('Submitting data:', apiPayload)
    // Add API call logic here
  }

  const packageOptions = [
    { label: 'Basic', value: 'basic' },
    { label: 'Premium', value: 'premium' },
    { label: 'Family', value: 'family' },
  ]

  const decoderOptions = [
    { label: 'Standard', value: 'standard' },
    { label: 'HD', value: 'hd' },
    { label: 'Explora', value: 'explora' },
    { label: 'Ultra', value: 'ultra' },
    { label: 'Compact', value: 'compact' },
    { label: 'Premium', value: 'premium' },
  ]

  const monthOptions = Array.from({ length: 11 }, (_, i) => ({
    label: `${i + 1} Month(s)`,
    value: i + 1,
  }))

  return (
    <div className='hero pt-20 text-white h-[70rem] md:h-[72rem]'>
      <div className='flex flex-col gap-10 lg:w-9/12 z-10 mx-auto px-5'>
        <div className='space-y-4 pb-5'>
          <h1 className='text-5xl md:text-6xl font-sans font-semibold'>
            Subscriptions
          </h1>
          <p className='text-lg font-sans leading-relaxed'>
            Stay connected and ensure seamless access to your services.
          </p>
        </div>

        <div className='tab flex justify-center gap-5 md:gap-10'>
          {[
            { id: 'dstv', image: dstv },
            { id: 'gotv', image: gotv },
            { id: 'showmax', image: showmax },
          ].map(({ id, image }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`${
                activeTab === id
                  ? 'active shadow-xl scale-110 transition-all ease-in-out -translate-y-2 -z-10'
                  : ''
              }`}>
              <Image
                src={image}
                className='h-24 md:h-40 rounded-lg'
                alt={id}
                width={200}
                height={200}
              />
            </button>
          ))}
        </div>

        <div className='h-[100vh]'>
          {['dstv', 'gotv'].includes(activeTab) && (
            <div id={activeTab} className='tabcontent relative'>
              <h3 className='text-3xl font-medium'>
                {activeTab.toUpperCase()}
              </h3>
              <p className='text-base'>
                {activeTab === 'dstv'
                  ? 'Enjoy the best of DSTV.'
                  : 'Bringing entertainment to your home.'}
              </p>

              <form
                onSubmit={handleSubmit}
                className='bg-white rounded-lg shadow-lg my-10 p-5 md:p-10'>
                <h2 className='text-2xl text-gray-800 font-semibold mb-5'>
                  Subscription Details For {activeTab.toUpperCase()}
                </h2>

                <div className='mb-4'>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700 mb-1'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className='block w-full bg-gray-50 border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Enter your email'
                  />
                </div>

                <CustomDropdown
                  label='Packages'
                  name='package'
                  options={packageOptions}
                  value={formData.package}
                  onChange={(value) => handleInputChange('package', value)}
                />

                <div className='mb-4'>
                  <label
                    htmlFor='iuc-number'
                    className='block text-sm font-medium text-gray-700 mb-1'>
                    IUC Number
                  </label>
                  <input
                    type='text'
                    id='iuc-number'
                    name='iuc-number'
                    value={formData.iucNumber}
                    onChange={(e) =>
                      handleInputChange('iucNumber', e.target.value)
                    }
                    className='block w-full bg-gray-50 border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Enter IUC Number'
                  />
                </div>

                <CustomDropdown
                  label='Decoder Type'
                  name='decoderType'
                  options={decoderOptions}
                  value={formData.decoderType}
                  onChange={(value) => handleInputChange('decoderType', value)}
                />

                <div className='mb-4'>
                  <label
                    htmlFor='iuc-number'
                    className='block text-sm font-medium text-gray-700 mb-1'>
                    Smart Card Number
                  </label>
                  <input
                    type='text'
                    disabled={activeTab === 'gotv'}
                    id='smartCard-number'
                    name='smartCard-number'
                    value={formData.smartCardNumber}
                    onChange={(e) =>
                      handleInputChange('smartCardNumber', e.target.value)
                    }
                    className={`${
                      activeTab === 'gotv'
                        ? 'cursor-not-allowed bg-gray-300'
                        : 'cursor-default'
                    }
                      block w-full bg-gray-50 border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder='Enter Smart Card Number'
                  />
                </div>

                <CustomDropdown
                  label='Months'
                  name='months'
                  options={monthOptions}
                  value={formData.months}
                  onChange={(value) => handleInputChange('months', value)}
                />

                <button
                  type='submit'
                  className='w-full bg-blue-900 text-white py-3 px-4 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                  Subscribe
                </button>
              </form>
            </div>
          )}

          {activeTab === 'showmax' && (
            <div id='showmax' className='tabcontent'>
              <h3 className='text-3xl font-medium'>SHOWMAX</h3>
              <p className='text-base'>
                Stream exclusive content with SHOWMAX.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
