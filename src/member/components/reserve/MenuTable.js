import React from 'react';

const MenuTable = () => {
  const groupedData = [
    {
      service: '목욕',
      items: [
        { weight: '5~8kg', price: 30000 },
        { weight: '9~12kg', price: 40000 },
        { weight: '13~15kg', price: 60000 },
      ],
    },
    {
      service: '목욕+위생',
      items: [
        { weight: '5~8kg', price: 40000 },
        { weight: '9~12kg', price: 70000 },
        { weight: '13~15kg', price: 90000 },
      ],
    },
    {
      service: '위생',
      items: [
        { weight: '5~8kg', price: 20000 },
        { weight: '9~12kg', price: 35000 },
        { weight: '13~15kg', price: 50000 },
      ],
    },
    {
      service: '클리핑',
      items: [
        { weight: '5~8kg', price: 45000 },
        { weight: '9~12kg', price: 55000 },
        { weight: '13~15kg', price: 65000 },
      ],
    },
    {
      service: '가위컷',
      items: [
        { weight: '5~8kg', price: 90000 },
        { weight: '9~12kg', price: 110000 },
        { weight: '13~15kg', price: 130000 },
      ],
    },
    {
      service: '스포팅',
      items: [
        { weight: '5~8kg', price: 80000 },
        { weight: '9~12kg', price: 100000 },
        { weight: '13~15kg', price: 120000 },
      ],
    },
  ];

  const styles = {
    table: {
      fontSize: '30px', // Adjust font size as desired
      fontFamily: 'sans-serif', // Choose a preferred font family
    },
    th: {
      padding: '10px', // Adjust cell padding as desired
    },
    td: {
      padding: '10px', // Adjust cell padding as desired
    },
  };

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th colSpan="2" style={styles.th}>
            서비스
          </th>
          {groupedData[0].items.map((item) => (
            <th key={item.weight} style={styles.th}>
              {item.weight}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {groupedData.map((group) => (
          <tr key={group.service}>
            <td colSpan="2" style={styles.td}>
              {group.service}
            </td>
            {group.items.map((item) => (
              <td key={item.weight} style={styles.td}>
                {item.price.toLocaleString('ko-KR')} 원
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MenuTable;
