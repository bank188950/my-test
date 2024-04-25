'use client';
import React, { useState } from 'react';
import AppProvider from '@/AppProvider';
import Tab from '@/components/ui/Tab';
import TabContent1 from '@/components/module/test/TabContent1';
import TabContent2 from '@/components/module/test/TabContent2';
export default function Home() {
  const [tab, setTab] = useState(1);

  return (
    <AppProvider>
      <main className="">
        <div className="ml-2">
          <Tab tab={tab} setTab={setTab} />
          <div className="mt-4">
            {tab === 1 && <TabContent1 />}
            {tab === 2 && <TabContent2 />}
          </div>
        </div>
      </main>
    </AppProvider>
  );
}
