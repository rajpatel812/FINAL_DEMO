'use client'

import React from 'react'
import { Menu, X, MapPin } from 'lucide-react'
import UserLayout from '../UserLayout'
import ContactUs from '@/components/ui-component/contactUs/ContactUs'

export default function ContactPage() {
    return (
      <div>
        <UserLayout>
          <ContactUs/>
        </UserLayout>
      </div>
    );
}
