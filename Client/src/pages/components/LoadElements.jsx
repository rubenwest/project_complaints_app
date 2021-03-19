import React from 'react';
import '../css/maps.css';
import 'antd/dist/antd.css';
import { Select } from 'antd';

export default function LoadElements({elements}) {

    const { Option } = Select;
    console.log("Cargamos los elements: ",elements);
    console.log("Tamaño de elements: ",elements.length);

    if (elements.length > 0) {
        return (
            

                
        <>
            <Select
               showSearch
               style={{ width: '100%' }}
               placeholder="Elige (Farola, Papelera ...)"            
            >
                    {
                    elements.map(({element}) => {
    
                        return(

                                <Option key={element} value={element}>{element}</Option>

                        
                        )
                    })
    
                }
            </Select>
                    
                
        </>  
                 
        )
    }
    else{
        return null 
        console.log("loading");
    }
    
}