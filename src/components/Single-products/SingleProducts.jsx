import React from 'react'
import { useParams } from 'react-router-dom';

function SingleProducts() {
     const { productSlug } = useParams();
  return <div>{productSlug}</div>;
}

export default SingleProducts