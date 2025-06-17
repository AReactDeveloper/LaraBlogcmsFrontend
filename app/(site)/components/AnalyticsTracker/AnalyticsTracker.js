'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { UAParser } from 'ua-parser-js'
import axiosInstance from '@/app/lib/axios'

export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const uaString = navigator.userAgent
    const parser = new UAParser(uaString)
    const uaResult = parser.getResult()

    const analyticsEvent = {
      eventType: 'pageview',
      url: window.location.href,
      path: pathname,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      userId: null,
      browserName: uaResult.browser.name || 'unknown',
      browserVersion: uaResult.browser.version || 'unknown',
      os: uaResult.os.name || 'unknown',
      deviceType: uaResult.device.type || 'desktop',
      deviceVendor: uaResult.device.vendor || 'unknown',
      deviceModel: uaResult.device.model || 'unknown',
      cpuArchitecture: uaResult.cpu.architecture || 'unknown',
      isArmCpu: uaResult.cpu.architecture?.includes('arm') || false,
      isMobile: uaResult.device.type === 'mobile',
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      connectionType: navigator.connection?.effectiveType || 'unknown',
    }

    const sendAnalyticsData = async ()=>{
      const res = await axiosInstance.post('/api/analytics',analyticsEvent)
      if(res.status == 200){
        console.log(res.data)
      }else if(res.status != 200){
        console.log(res.data)
      }
    }
    
    sendAnalyticsData()
    
  }, [pathname])

  return null
}
