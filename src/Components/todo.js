import React, { useState } from 'react'

const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items,setItems] = useState([]);
    const [editItems,setEditItems] = useState(null);
    const [toggleBtn, setToggleBtn] = useState(true);
    const [isEditItem,setIsEditItem] = useState(null);

    const addItem = ()=>{
        if(!inputData){
            alert("please fill data");
        } else if(inputData && !toggleBtn){
            setItems(
                items.map((elem)=>{
                    if(elem.id === isEditItem){
                        return {...elem, name: inputData}
                    }
                    
                    return elem;
                })
            )
            setToggleBtn(true);
            setInputData('');
            
            setIsEditItem(null);

        }
        else{
            const allInputData  = { id: new Date().getTime().toString(), name: inputData}
            setItems([...items,allInputData]);
            setInputData('');
        }
        // setToggleBtn(true);
    }

    const deleteItem = (index)=>{
        console.log(index);
        const updatedItems = items.filter((elem)=>{
            return index !== elem.id;
        });
        setItems(updatedItems);
        
    }

    const removeAllItems = ()=>{
        setItems([]);
    }
    const editItem = (id)=>{
        console.log(id);
        let newEditItem = items.find((elem)=>{
            return elem.id === id;
        });
        setToggleBtn(false);
        setInputData(newEditItem.name);
        setEditItems(id);
        setIsEditItem(id);
    }

    return (
    <div className='h-[800px]'>
        
        <div className='main-div flex justify-center '>
            <div className='child-div'>
                <div className='addItems my-12'>
                    <h1 className='font-bold font-mono text-xl my-2'>Todo List</h1>
                    <input className='w-[341px] p-[12px] border font-mono border-black font-bold bg-gray-200' type="text" placeholder='Add Itmes...' value={inputData} onChange={(e)=> setInputData(e.target.value)}/>
                    {toggleBtn ? <button className='border border-black w-[50px] h-[50px] bg-green-600' title='Add Items' onClick={addItem}>+</button> : 
                    <button className='border border-black w-[50px] h-[50px]' title='Add Items' onClick={addItem}>E</button>}
                    
                </div>
                <div className='showItems my-8'>
                    {
                        items.map((curr) => {
                           return (

                            <>
                                <div className='eachItem border  border-black w-[341px] bg-gray-300 p-1 font-bold my-2 overflow-scroll' key={curr.id}>
                                    <span className='mr-[123px] font-mono overflow-hidden'>{curr.name}</span>
                                   <div className=''>
                                   <button className='w-[35px] h-[35px] bg-red-600 mr-2' onClick={()=> deleteItem(curr.id)}>D</button>
                                        <button className=' w-[35px] h-[35px] bg-green-400' onClick={()=> editItem(curr.id)}>E</button>
                                   </div>

                                </div>
                               
                            
                            </>
                           ) 
                        })

                    }
                </div>
               <div>
                    <button className='bg-red-600 w-[8.5rem] h-[3.2rem]' onClick={removeAllItems}>Remove All</button>
               </div>
            </div>
        </div>
    </div>
  )
}

export default Todo;