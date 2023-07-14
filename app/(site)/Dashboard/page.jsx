'use client'

import React, { useEffect, useState } from "react"
import { Sidebar, Header } from '../../components'
import { Button, Dropdown } from "@nextui-org/react";
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { CardList } from '../../components/CardList';
import data from '../../assets/data/final.json';

const Dashboard = () => {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
      if (session?.status != 'authenticated') {
        router.push('/Login') 
      }
    })

    const [ type, setType ] = useState('any');
    const [inputValue, setInputValue] = useState('');
    const allWords = data;
    const [words, setWords] = useState([]);
    const [filteredWords, setFilteredWords] = useState([]);

    const ChangeCatalogedWords = () => {
      if (type == 'any') {
          setWords(allWords)
      }
      else {
        setWords(allWords.filter((word) => word.catalog?.indexOf(type.currentKey) > -1))
      }
      
      if (type.currentKey == 'any') {
          setWords(allWords)
      }
      
    }

    useEffect(() => {
        ChangeCatalogedWords()
    }, [type.currentKey]);

    useEffect(() => {
        Search(inputValue)
    }, [words])

    const Search = (text) => {
      if (text) {
          const Startwith = words.filter((item) => {
              const itemData = item.title ? item.title.toString().toUpperCase() : ''.toUpperCase();
              return itemData.startsWith(text.toString().toUpperCase())
          })
          const NotStartWith = words.filter((item) => {
              const itemData = item.title ? item.title.toString().toUpperCase() : ''.toUpperCase();
              if (itemData.startsWith(text.toString().toUpperCase()) == false) {
                  return itemData
              }
          }).filter((item) => {
              const itemData = item.title ? item.title.toString().toUpperCase() : ''.toUpperCase();
              return (itemData.indexOf(text.toString().toUpperCase()) > -1)
          }).sort((a, b) => {
              return a.value - b.value;
          });
          setFilteredWords([...Startwith, ...NotStartWith]);
      } else {
          setFilteredWords(words)
      }
      setInputValue(text)
  }

  return (
    <Sidebar>
        <div className='bg-gray-100 min-h-screen'>
            <Header />
            <div className="flex m-4 justify-between">
              <div>
                <Dropdown>
                  <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
                    {type}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Single selection actions"
                    color="secondary"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={type}
                    onSelectionChange={setType}
                  >
                    <Dropdown.Item key="any">any</Dropdown.Item>
                    <Dropdown.Item key="Энгийн ">Энгийн </Dropdown.Item>
                    <Dropdown.Item key="Санхүү ">Санхүү </Dropdown.Item>
                    <Dropdown.Item key="Инженер ">Инженер </Dropdown.Item>
                    <Dropdown.Item key="Уул уурхай ">Уул уурхай </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div class="relative">
                  <input type="search" id="search" 
                    class="w-80 h-6 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Search"
                    value={inputValue}
                    onChange={e => Search(e.target.value)}
                  />
              </div>
              <div>
                <Button shadow color="gradient" auto>New Word</Button>
              </div>
            </div>
            <div className="mt-6">
              <CardList words={filteredWords}/>
            </div>
        </div>
    </Sidebar>
  )
}

export default Dashboard