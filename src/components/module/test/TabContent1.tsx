import React, { useState, useEffect } from 'react';

type ListType = {
  type: string;
  name: string;
};

function TabContent1() {
  const [dataList, setDataList] = useState<ListType[]>([
    {
      type: 'Fruit',
      name: 'Apple',
    },
    {
      type: 'Vegetable',
      name: 'Broccoli',
    },
    {
      type: 'Vegetable',
      name: 'Mushroom',
    },
    {
      type: 'Fruit',
      name: 'Banana',
    },
    {
      type: 'Vegetable',
      name: 'Tomato',
    },
    {
      type: 'Fruit',
      name: 'Orange',
    },
    {
      type: 'Fruit',
      name: 'Mango',
    },
    {
      type: 'Fruit',
      name: 'Pineapple',
    },
    {
      type: 'Vegetable',
      name: 'Cucumber',
    },
    {
      type: 'Fruit',
      name: 'Watermelon',
    },
    {
      type: 'Vegetable',
      name: 'Carrot',
    },
  ]);

  const [dataMove, setDataMove] = useState<ListType[] | []>([]);
  const [dataFruit, setDataFruit] = useState<ListType[] | []>([]);
  const [dataVegetable, setDataVegetable] = useState<ListType[] | []>([]);

  const handleMove = (name: string) => {
    const index = dataList.findIndex((data) => data.name === name);
    const newData = [...dataList];
    const moveData = newData.splice(index, 1);
    setDataList(newData);
    setDataMove([...dataMove, ...moveData]);
  };

  const handleRevert = (name: string) => {
    const index = dataMove.findIndex((data) => data.name === name);
    const newData = [...dataMove];
    const revertData = newData.splice(index, 1);
    setDataMove(newData);
    setDataList([...dataList, ...revertData]);
  };

  useEffect(() => {
    const fruit = dataMove.filter((data) => data.type === 'Fruit');
    setDataFruit(fruit);
    const vegetable = dataMove.filter((data) => data.type === 'Vegetable');
    setDataVegetable(vegetable);
  }, [dataMove]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (dataMove.length > 0) {
        const newData = [...dataMove];
        const revertData = newData.splice(0, 1);
        setDataMove(newData);
        setDataList([...dataList, ...revertData]);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [dataMove]);

  return (
    <div className="">
      <h2 className="text-lg font-normal">Auto delete todo list</h2>
      <div className="mt-2 flex gap-2 w-[800px]">
        <div className="w-1/3 flex flex-col gap-2 mr-2">
          {dataList.map((data) => (
            <div
              key={data.name}
              className="cursor-pointer flex justify-center border-2 border-gray-300 p-2 hover:bg-gray-100"
              onClick={() => handleMove(data.name)}
            >
              {data.name}
            </div>
          ))}
        </div>
        <div className="w-1/3 border-2 border-gray-300">
          <h3 className="flex justify-center font-bold bg-gray-100 p-2">Fruit</h3>
          <div className="flex flex-col gap-2 p-2 mt-1">
            {dataFruit.map((data) => (
              <div
                key={data.name}
                className="cursor-pointer flex justify-center border-2 border-gray-300 p-2 hover:bg-gray-100"
                onClick={() => handleRevert(data.name)}
              >
                {data.name}
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3 border-2 border-gray-300">
          <h3 className="flex justify-center font-bold bg-gray-100 p-2">Vegetable</h3>
          <div className="flex flex-col gap-2 p-2 mt-1">
            {dataVegetable.map((data) => (
              <div
                key={data.name}
                className="cursor-pointer flex justify-center border-2 border-gray-300 p-2 hover:bg-gray-100"
                onClick={() => handleRevert(data.name)}
              >
                {data.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabContent1;
