import React from 'react';
import { useQuery } from '@tanstack/react-query';

function TabContent2() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['departmentDetail'],
    queryFn: function () {
      return fetchData(`https://dummyjson.com/users`);
      //return fetchData(`https://jsonplaceholder.typicode.com/posts`);
    },
    staleTime: 0,
  });

  async function fetchData(url: string): Promise<any> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  }

  if (data) console.log('data:', data);

  return (
    <div className="text-lg font-normal">
      <h2>Create data from API</h2>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error fetch data</div>}
      {/* {data && (
        <div>
          {data.map((item: any) => (
            <div key={item.id}>
              <p>
                {item.id} {item.title}
              </p>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}

export default TabContent2;
