import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import { IoClose, IoSearch } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import { useNavigate } from 'react-router-dom';

// lens, input and x container
const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 4em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 25px 10px 25px;
`;

// before click searchbar container
const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 34em;
  height: 3.8em;
  background-color: transparent;
  border-radius: 40px;
  border: solid;
  border-color: #fafafa;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.20);
  backdrop-filter: blur(10px);
  margin: 0 1em 0 1em;
`;

const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 28px;
  margin-left: 10px;
  margin-top: 10px;
  vertical-align: middle;
`;
const SearchInput = styled.input`
  width: 90%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 21px;
  color: #bebebe;
  font-weight: 500;
  border-radius: 6px;
  background-color: transparent;
  margin-top: -95px;
  margin-left: 20px;
  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
      overflow: auto;
    }
  }
  // in bar text color.
  &::placeholder {
    color: #bebebe;
    transition: all 250ms ease-in-out;
  }
`;

const containerVariants = {
    expanded: {
        height: "25em",
        width: "calc(34em + 6em)",
    },
    collapsed: {
        height: "3.8em",
    },
};
const CloseIcon = styled(motion.span)`
  color: #bebebe;
  font-size: 2em;
  vertical-align: middle;
  margin-top: -95px;
  transition: all 400ms ease-in-out;
  z-index: 3;
  cursor: pointer;
`;
const SearchContent = styled.div`
  position:absolute;
  margin-top: 0.5em;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 25px 25px;
  flex-direction: column;
  font-size: 23px;
  color: #bebebe;
  //backdrop-filter: blur(10px);
`;

const DataItem = styled.a`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    color:white;
    cursor: pointer;
`

const Resultado = styled.p`
  &:hover {
    background-color: lightgrey;
    width: 100%;
  }
`
const Button = styled.button`
  background-color: transparent;  
  padding: 10px 15px;
  border-radius: 10px;
  outline: 0;
  margin: auto;
  cursor: pointer;
  font-size: 20px;
  border-color: white;
  color: #bebebe;
`;

const containerTransition = { type: "spring", damping: 22, stiffness: 100 };

export function SearchBar({ placeholder, data }) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [isExpanded, setExpanded] = useState(false);
    const inputRef = useRef();
    const [parentRef, isClickedOutside] = useClickOutside();
    const [isLoading, setLoading] = useState(false);

    const isEmpty = !wordEntered;
    let navigate = useNavigate();

    const expandContainer = () => {
        setExpanded(true);
        setLoading(false);
    };

    const collapseContainer = () => {
        setExpanded(false);
        // in case there are results displayed this condition cleans it up
        if (inputRef.current) inputRef.current.value = "";
    };

    useEffect(() => {
        if (isClickedOutside) collapseContainer();
    }, [isClickedOutside]);

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.categories.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    /*const clearInput = () => {
      setFilteredData([]);
      setWordEntered("");
    };*/

    return (
        <SearchBarContainer
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={containerVariants}
            transition={containerTransition}
            ref={parentRef}
        >
            <SearchIcon>
                <IoSearch />
            </SearchIcon>
            <SearchInputContainer>
                <SearchInput
                    value={wordEntered}
                    ref={inputRef}
                    onFocus={expandContainer}
                    onChange={handleFilter}
                    placeholder="Buscar categorías"
                />
                <AnimatePresence>
                    {isExpanded && (
                        <CloseIcon
                            key="close-icon"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={collapseContainer}
                            transition={{ duration: 0.2 }}
                        >
                            <IoClose />
                        </CloseIcon>
                    )}
                </AnimatePresence>
            </SearchInputContainer>
            {isExpanded && (
                <SearchContent>
                    {!isLoading && isEmpty && (
                        <Button
                            onClick={() => {
                                navigate("/categorias");
                            }}
                        >
                            Ver todas las categorias
                        </Button>
                    )}
                    {filteredData.length !== 0 && (
                        <>
                            {filteredData.map((value, key) => {
                                return (
                                    <DataItem onClick={() => { navigate(value.route); }}>
                                        <Resultado>{value.categories} </Resultado>
                                    </DataItem>
                                );
                            })}
                        </>
                    )}
                </SearchContent>
            )}
        </SearchBarContainer>
    );
}
