import React from 'react';
import { useQuery } from '@tanstack/react-query';

type HairColorSummary = {
  Black: number;
  Blond: number;
  Chestnut: number;
  Brown: number;
};

type Department = {
  male: number;
  female: number;
  ageRange: { min: number; max: number };
  hair: HairColorSummary;
  addressUser: Record<string, string>;
};

type DepartmentData = {
  [department: string]: Department | {};
}[];

function TabContent2() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['departmentDetail'],
    queryFn: function () {
      return fetchData(`https://dummyjson.com/users`);
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

  let showData: React.ReactNode = '';
  if (data) {
    // Get name department
    const arrDepartment: string[] = [];
    data.users.forEach((user: any) => {
      const department = user.company.department;

      if (!arrDepartment.includes(department)) {
        arrDepartment.push(department);
      }
    });

    // Create structure department
    let employeeData: DepartmentData = [];
    for (let i = 0; i < arrDepartment.length; i++) {
      employeeData.push({
        [arrDepartment[i]]: {
          male: 0,
          female: 0,
          ageRange: { min: 0, max: 0 },
          hair: { Black: 0, Blond: 0, Chestnut: 0, Brown: 0 },
        },
      });
    }

    // Cal data department
    data.users.forEach((user: any) => {
      const department = user.company.department;

      if (user.gender === 'male') {
        (employeeData[arrDepartment.indexOf(department)][department] as Department).male += 1;
      }

      if (user.gender === 'female') {
        (employeeData[arrDepartment.indexOf(department)][department] as Department).female += 1;
      }

      if (user.hair.color === 'Black') {
        (employeeData[arrDepartment.indexOf(department)][department] as Department).hair.Black += 1;
      }

      if (user.hair.color === 'Blond') {
        (employeeData[arrDepartment.indexOf(department)][department] as Department).hair.Blond += 1;
      }

      if (user.hair.color === 'Chestnut') {
        (employeeData[arrDepartment.indexOf(department)][department] as Department).hair.Chestnut += 1;
      }

      if (user.hair.color === 'Brown') {
        (employeeData[arrDepartment.indexOf(department)][department] as Department).hair.Brown += 1;
      }

      const age = user.age;
      if (
        age < (employeeData[arrDepartment.indexOf(department)][department] as Department).ageRange.min ||
        (employeeData[arrDepartment.indexOf(department)][department] as Department).ageRange.min === 0
      ) {
        (employeeData[arrDepartment.indexOf(department)][department] as Department).ageRange.min = age;
      }

      if (
        age > (employeeData[arrDepartment.indexOf(department)][department] as Department).ageRange.max ||
        (employeeData[arrDepartment.indexOf(department)][department] as Department).ageRange.max === 0
      ) {
        (employeeData[arrDepartment.indexOf(department)][department] as Department).ageRange.max = age;
      }
    });

    showData = employeeData.map((department) => {
      const departmentName = Object.keys(department)[0];
      const { male, female, hair, ageRange } = department[departmentName] as Department;
      const { Black, Blond, Chestnut, Brown } = hair;
      const { min, max } = ageRange;

      return (
        <div key={departmentName} className="text-base border border-solid p-2">
          <h4 className="text-lg font-bold">{departmentName}</h4>
          <div>
            <div>
              <span>Male</span> - {male}
            </div>
            <div>
              <span>Female</span> - {female}
            </div>
            <div>
              <span>ageRange</span> {min}-{max}
            </div>
            <div>
              <span>Hair</span> - Black: {Black}, Blond: {Blond}, Chestnut: {Chestnut}, Brown: {Brown}
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="text-lg font-normal">
      <h2>Create data from API</h2>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error fetch data</div>}
      <div className="mt-2">{data && showData}</div>
    </div>
  );
}

export default TabContent2;
