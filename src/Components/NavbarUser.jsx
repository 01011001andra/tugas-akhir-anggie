import React from 'react'

export default function NavbarUser() {
  return (
    <section className='container flex justify-between items-center py-3'>
        {/* Logo */}
        <div className='flex items-center gap-5'>
            <img src="https://picsum.photos/200/200" alt="" className='w-14 h-14' />
            <h3 className='text-xl font-semibold'>
                VertiGrow
            </h3>
        </div>

        {/* Menu Navbar */}
        <ul className='flex gap-10 font-semibold'>
            <li>Edukasi Vertikultur</li>
            <li>Manajemen Limbah</li>
            <li>Mr.Grow</li>
        </ul>

        {/* Logout */}
        <button className='bg-orange-500 rounded-full w-20 text-white py-2'>
            Logout
        </button>
    </section>
  )
}
