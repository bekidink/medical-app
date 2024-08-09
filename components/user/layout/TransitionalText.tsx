"use client"
import React,{useState,useEffect} from 'react'
import TextTransition,{presets} from 'react-text-transition'
export default function TransitionalText({TEXTS,className}:{TEXTS:string[],className:string}) {
    // const TEXTS = ['Forest', 'Building', 'Tree', 'Color'];
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(
          () => setIndex((index) => index + 1),
          3000, // every 3 seconds
        );
        return () => clearTimeout(intervalId);
      }, [])
    return (
        <span className={className}>
        <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
      </span>
  )
}
