import React, { useEffect, useRef, useState } from 'react'
import {Text, TouchableOpacity, View} from "react-native";

const Category = ({ data }) => {
  return (
      <TouchableOpacity>
        <Text style={{
          fontSize: 16,
          color: '#1C6DD0',
          fontWeight: 'bold',
          padding: 7
        }}>{data.title}</Text>
      </TouchableOpacity>
  )
}

export default Category