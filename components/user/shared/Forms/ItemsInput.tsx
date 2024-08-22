import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import TextInput from "./TextInput";
import { Input } from "@/components/ui/input";
type ItemProps={

}
type ItemsInputProps={
    setItems:any, items:string[], itemTitle:string
}
const ItemsInput = ({ setItems, items, itemTitle }:ItemsInputProps) => {
  const [item, setItem] = useState("");
  function addItem() {
    if (!item) return null;
    setItems([...items, item]);
    setItem("");
  }
  function removeItem(index:any) {
    const newItems = [...items];
    newItems.splice(index, 1);
    /*  */
    setItems(newItems);
    
  }   
  const [showItemForm, setShowItemForm] = useState(false);
  return (
    <div className="sm:col-span-2">
      {showItemForm ? (
        <div className="flex  max-w-lg mx-auto">
          <div className="relative w-full">
            
            <Input value={item}
              onChange={(e) => setItem(e.target.value)}
              type="text"
              id="voice-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={`Create ${itemTitle}`} /> 
         
          </div>
          <button
            onClick={addItem}
            type="button"
            className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium dark:text-slate-50 text-slate-900 bg-slate-900 rounded-lg border border-slate-800 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-600 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
          >
            <Plus className="w-4 h-4 me-2" />
            Add 
          </button>
          <button
            onClick={() => setShowItemForm(false)}
            className="ml-3 shrink-0 w-8 h-8 bg-red-400 rounded-full flex items-center justify-center"
          >
            <X className="w-4 h-4 " />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowItemForm(true)}
          className="flex items-center space-x-2 text-slate-800 dark:text-slate-50"
        >
          <Plus />
          <span>Add {itemTitle}</span>
        </button>
      )}
      <div className="flex flex-wrap gap-4 mt-4">
        {items.map((item, i) => {
          return (
            <div
              key={i}
              className="flex space-x-2 dark:text-slate-300 text-slate-800 bg-slate-200 items-center dark:bg-slate-400 px-4 py-2 rounded-lg"
            >
              <p>{item}</p>
              <button onClick={() => removeItem(i)}>
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemsInput;
