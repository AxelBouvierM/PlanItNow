import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import { IoClose, IoSearch } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import { useNavigate } from 'react-router-dom';

// before click searchbar container
const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 34em;
  height: 3.8em;
  backdrop-filter: blur(15px);
  border: 3px solid #fafafa;
  border-radius: 40px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
  @media all and (max-width:600px) {
    	& {
			width: fit-content;
            margin: 0 1em;
		}
  	}
`;

const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 28px;
  margin: auto;
  vertical-align: middle;
`;

const SearchInputContainer = styled.div`
  width: 100%;
  min-height: fit-content;
  margin: 0.5em 0;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 1em;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 21px;
  color: #bebebe;
  font-weight: 500;
  border-radius: 6px;
  background-color: transparent;
  padding: 0 1em;
  margin: auto;
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
  @media all and (max-width:600px) and (min-width:301px){
    	& {
            font-size: 1em;
		}
  	}
    @media all and (max-width:300px) {
    	& {
            font-size: 0.8em;
		}
  	}
`;

const containerVariants = {
    expanded: {
        width: "calc(34em + 6em)",
        height: "24em",
    },
    collapsed: {
        height: "3.8em",
    },
};

const CloseIcon = styled(motion.span)`
  color: #bebebe;
  font-size: 23px;
  vertical-align: middle;
  transition: all 400ms ease-in-out;
  cursor: pointer;
  &:hover {
    color: #dfdfdf;
  }
`;
const SearchContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  color: white;
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const DataItem = styled.a`
    width: 100%;
    min-height: 4.5em;
    display: flex;
    border-bottom: 1px solid #d8d8d852;
    align-items: center;
    padding: 0 2em;
    cursor: pointer;
    transition: 1s ease-in-out;
    &:hover {
    transition: 1s ease-in-out;
    background-color: white;
    }
    &:hover .text {
        transition: 0.8s ease-in-out;
        transform: translateX(20px);
        font-size: 1.1em;
        color: #000;
    }
`

const Resultado = styled.p`
    transition: 0.8s ease-in-out;
`;

const Button = styled(motion.button)`
  display: flex;
  position: absolute;
  width: fit-content;
  height: fit-content;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1em;
  padding: 0.35em 3em;
  border: none;
  border-bottom: 2px solid #FFFFFF;
  box-sizing: border-box;
  text-decoration: none;
  font-family: 'Roboto',sans-serif;
  font-weight: 300;
  color: #FFFFFF;
  text-align:center;
  transition: all 0.2s;
  background-color: transparent;
  font-size: 0.9em;
  cursor: pointer;
  &:hover {
    color:#000000;
    background-color: #fafafa;
  }
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
        <SearchInputContainer>
            <SearchIcon>
                <IoSearch />
            </SearchIcon>
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
                                        <Resultado className="text">{value.categories}</Resultado>
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
