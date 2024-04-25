import React from 'react';

type TabType = {
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
};

function Tab({ tab, setTab }: TabType) {
  return (
    <ul className="flex">
      <li
        className={`${tab === 1 ? 'border-b-4 border-red-500 border-solid' : ''} text-black font-bold text-lg p-2 cursor-pointer`}
        onClick={() => setTab(1)}
      >
        Test 1
      </li>
      <li
        className={`${tab === 2 ? 'border-b-4 border-red-500 border-solid' : ''} text-black font-bold text-lg p-2 cursor-pointer ml-2`}
        onClick={() => setTab(2)}
      >
        Test 2
      </li>
    </ul>
  );
}

export default Tab;
