// import React from 'react'

// const Color = (props) => {
//    const { colorData, setColor } = props
//    return (
//       <>
//          <ul className='colors ps-0'>
//             {
//                colorData && colorData?.map((item, index) => {
//                   return (
//                      <li onClick={() => setColor(item?._id)} style={{ backgroundColor: item?.title }} key={index}></li>
//                   )
//                })
//             }
//          </ul>
//       </>
//    )
// }

// export default Color

import React, { useState } from 'react';

const Color = (props) => {
   const { colorData } = props;
   const [selectedColor, setSelectedColor] = useState(null);

   const handleColorSelect = (colorId) => {
      setSelectedColor(colorId);
      props.setColor(colorId);
   };

   return (
      <>
         <ul className='colors ps-0'>
            {colorData &&
               colorData.map((item, index) => (
                  <li
                     onClick={() => handleColorSelect(item?._id)}
                     style={{
                        cursor: 'pointer',
                        backgroundColor: item?.title,
                        border: `3px solid ${selectedColor === item?._id ? 'gray' : 'transparent'}`,
                     }}
                     key={index}
                  ></li>
               ))}
         </ul>
      </>
   );
};

export default Color;
