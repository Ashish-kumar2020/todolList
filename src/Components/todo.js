import React, { useState } from 'react'

const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items,setItems] = useState([]);
    const [editItems, setEditItems] = useState(null);
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
    <>
        <div className='main-div'>
            <div className='child-div'>
                <div className='addItems'>
                    <input type="text" placeholder='Add Itmes...' value={inputData} onChange={(e)=> setInputData(e.target.value)}/>
                    {toggleBtn ? <button title='Add Items' onClick={addItem}>+</button> : 
                    <button title='Add Items' onClick={addItem}>Edit</button>}
                    
                </div>
                <div className='showItems'>
                    {
                        items.map((curr) => {
                           return (
                                <div className='eachItem' key={curr.id}>
                                    <span>{curr.name}</span>
                                    <button onClick={()=> deleteItem(curr.id)}>Delete</button>
                                    <button onClick={()=> editItem(curr.id)}>Edit</button>
                                </div>
                           ) 
                        })

                    }
                </div>
               <div>
                    <button onClick={removeAllItems}>Remove All</button>
               </div>
            </div>
        </div>
    </>
  )
}

export default Todo;