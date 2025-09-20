"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'
import Providers from './../app/_components/providers/tanstackQueryProvider';
import ContextPasswordProvider from '@/context/contextPasswordProvider';
import ContextAddToCardProvider from '@/context/ContextAddToCardProvider';
import ContextCartProvider from '@/context/contextCartProvider';
import ContextWishlistProvider from '@/context/contextWishListProvider';
import ContextDeleteWishlistProvider from './../context/contextDeleteWishlist';

const MySessionProvider = ({ children }: { children: React.ReactNode }) => {


  return (
    <SessionProvider >
      <Providers>
        <ContextPasswordProvider>
            <ContextCartProvider>
          <ContextAddToCardProvider>
              <ContextWishlistProvider>
                <ContextDeleteWishlistProvider>
                {children}
                </ContextDeleteWishlistProvider>
              </ContextWishlistProvider>
          </ContextAddToCardProvider>
            </ContextCartProvider>
        </ContextPasswordProvider>
      </Providers>
    </SessionProvider>
  )
}

export default MySessionProvider
