// /app/[locale]/(public)/diensten/taxi-schiphol/page.tsx

import React from 'react'
import Breadcrumbs from '@/app/components/breadcrumbs/BreadCrumbs'
import SchipholHero from '@/app/components/mainpages/schiphol-vervoer/SchipholHero'
import SchipholFilosofie from '@/app/components/mainpages/schiphol-vervoer/SchipholFilosofie'
import SchipholServices from '@/app/components/mainpages/schiphol-vervoer/SchipholServices'
import SchipholClassSection from '@/app/components/mainpages/schiphol-vervoer/SchipholClassSection'
import SchipholPricing from '@/app/components/mainpages/schiphol-vervoer/SchipholPricing'
import SchipholVloot from '@/app/components/mainpages/schiphol-vervoer/SchipholVloot'

export default function TaxiSchiphol() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs />
        <SchipholHero />
        <SchipholFilosofie />
        <SchipholServices />
        <SchipholClassSection />
        <SchipholPricing />
        <SchipholVloot />
      </div>
    </>
  )
}