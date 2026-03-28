import React, { useRef, useState } from 'react';
import '../Style/Components/HomeUploadCard.css'; 

export default function HomeUploadCard({ initialImage, onRemove }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(initialImage || null);
  const [status, setStatus] = useState(initialImage ? 'done' : 'waiting to upload'); 

  const handleClick = () => {
    if (inputRef.current) { 
        inputRef.current.click(); 
    }
  }; 
}