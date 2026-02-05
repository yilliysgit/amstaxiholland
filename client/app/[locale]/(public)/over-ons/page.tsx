import React from 'react'
import AboutUsHero from '@/app/components/mainpages/over-ons/AboutUsHero'  // ✅ CHANGE
import Breadcrumbs from '@/app/components/breadcrumbs/BreadCrumbs'
import OnsVerhaal from '@/app/components/mainpages/over-ons/TimeLineSection'
import OnzeWaarden from '@/app/components/mainpages/over-ons/OnzeWaarden'
import OnzeDiensten from '@/app/components/mainpages/over-ons/OnzeDiensten'
import RecruitmentCTA from '@/app/components/mainpages/over-ons/RecruitmentCTA'

export default function OverOns() {
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs />
        <AboutUsHero />  {/* ✅ CHANGE */}
        <OnsVerhaal />
        <OnzeWaarden />
        <OnzeDiensten />
        <RecruitmentCTA />
      </div>
    </>
  )
}