'use client';
import { Categories } from "@/_constant";
import { StickyNote } from "lucide-react";
import { useState } from "react";

export default function TestPage(){
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    return <div className="w-350 mx-10 grid grid-cols-6">
  <div className="flex flex-col col-span-1 p-2 space-y-1 bg-white border-r border-gray-100">
    <h3 className="px-3 pb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
      Categories
    </h3>
    
    {/* All Category Button */}
    <button 
      onClick={() => setSelectedCategory("All")} 
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
        selectedCategory === "All"
          ? "bg-blue-50 text-blue-600 shadow-sm"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <StickyNote className="w-4 h-4" />
      <span>All</span>
    </button>

    {/* Mapped Categories */}
    {Categories?.map((category) => {
      const Icon = category.icon;
      const isActive = selectedCategory === category.label;
      
      return (
        <button 
          key={category.label} 
          onClick={() => setSelectedCategory(category.label)} 
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
            isActive
              ? "bg-blue-50 text-blue-600 shadow-sm"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
          <span>{category.label}</span>
        </button>
      );
    })}
  </div>
  
  {/* Your main content area for the remaining 5 columns can go here */}
  {/* <div className="col-span-5 ..."></div> */}
</div>
}
