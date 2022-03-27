import React from 'react';


const CarDetail = ({cars}) =>{
    return(
        <div className="CarDetail">
            <ol>
            <li>Tên Xe: <p>{cars.name} </p></li>
            <li>Giá Xe: <p>{cars.price} VNĐ</p></li>
            </ol>
        </div>
    );
}
export default CarDetail;