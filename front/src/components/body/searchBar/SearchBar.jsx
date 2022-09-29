import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IoClose, IoSearch } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import MoonLoader from 'react-spinners/MoonLoader';
import { useDebounce } from '../../../hooks/debounceHook';
import axios from 'axios';
import { TvShow } from '../searchResults/tvShow';

import '../../../styles/SearchBar.css';


// "&" SELECTOR REFERENCES TO THE PREVIOUS COMPONENT

// before click searchbar container
const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 3.8em;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
`;

// lens, input and x container
const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 4em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`;

// input tag handler (| color)
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

// lens icon
const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 27px;
  margin-right: 10px;
  margin-top: 6px;
  vertical-align: middle;
`;

// x on click button
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

// line between searchBar & search results
const LineSeperator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 2px;
  background-color: #d8d8d878;
`;

// search results container
const SearchContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

// loading icon when search takes time
const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// displayed container text
const WarningMessage = styled.span`
  color: #a1a1a1;
  font-size: 14px;
  display: flex;
  align-self: center;
  justify-self: center;
`;

// containers properties
const containerVariants = {
    expanded: {
        height: "20em",
        width: "calc(30% + 20%)",
    },
    collapsed: {
        height: "3.8em",
    },
};

// dict that defines the searchbar open transition
const containerTransition = { type: "spring", damping: 22, stiffness: 100 };

export function SearchBar(props) {
    // const [a, b] = useState(...) explanation:
    // a = variable name
    // b = function to update the current variable
    // ... = sets the variable value to ...
    const [isExpanded, setExpanded] = useState(false);
    const [parentRef, isClickedOutside] = useClickOutside();
    const inputRef = useRef();
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [tvShows, setTvShows] = useState([]);
    const [noTvShows, setNoTvShows] = useState(false);

    const isEmpty = !tvShows || tvShows.length === 0;

    // no results handler 
    const changeHandler = (searchResult) => {
        searchResult.preventDefault();
        if (searchResult.target.value.trim() === "") setNoTvShows(false);

        setSearchQuery(searchResult.target.value);
    };

    // expand container
    const expandContainer = () => {
        setExpanded(true);
    };

    // shrink container
    const collapseContainer = () => {
        setExpanded(false);
        setSearchQuery("");
        setLoading(false);
        setNoTvShows(false);
        setTvShows([]);
        // in case there are results displayed this condition cleans it up
        if (inputRef.current) inputRef.current.value = "";
    };

    // collapse container when clicking outside
    useEffect(() => {
        if (isClickedOutside) collapseContainer();
    }, [isClickedOutside]);

    // encodes the special characters incuded in the search such as !, spaces or &.
    const prepareSearchQuery = (query) => {
        const url = `http://api.tvmaze.com/search/shows?q=${query}`;

        return encodeURI(url);
    };

    // search process
    const searchTvShow = async () => {
        if (!searchQuery || searchQuery.trim() === "") return;

        setLoading(true);
        setNoTvShows(false);

        const URL = prepareSearchQuery(searchQuery);

        // request for remote data and waits for it response.
        const response = await axios.get(URL).catch((err) => {
            console.log("Error: ", err);
        });

        // no results error handler
        if (response) {
            console.log("Response: ", response.data);
            if (response.data && response.data.length === 0) setNoTvShows(true);

            setTvShows(response.data);
        }

        setLoading(false);
    };

    // looks for updates on search results every 500 seconds
    // Hook that helps to limit how many times a component is re-rendered,
    // it has an internal timer to execute the callback function every <2nd param> seconds
    useDebounce(searchQuery, 500, searchTvShow);

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
                    placeholder="Search for categories"
                    onFocus={expandContainer}
                    ref={inputRef}
                    value={searchQuery}
                    onChange={changeHandler}
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
            {isExpanded && <LineSeperator />}
            {isExpanded && (
                <SearchContent>
                    {isLoading && (
                        <LoadingWrapper>
                            <MoonLoader loading color="#000" size={20} />
                        </LoadingWrapper>
                    )}
                    {!isLoading && isEmpty && !noTvShows && (
                        <LoadingWrapper>
                            <WarningMessage>Start typing to Search</WarningMessage>
                        </LoadingWrapper>
                    )}
                    {!isLoading && noTvShows && (
                        <LoadingWrapper>
                            <WarningMessage>No Tv Shows or Series found!</WarningMessage>
                        </LoadingWrapper>
                    )}
                    {!isLoading && !isEmpty && (
                        <>
                            {tvShows.map(({ show }) => (
                                <TvShow
                                    key={show.id}
                                    thumbnailSrc={show.image && show.image.medium}
                                    name={show.name}
                                    rating={show.rating && show.rating.average}
                                />
                            ))}
                        </>
                    )}
                </SearchContent>
            )}
        </SearchBarContainer>
    );
}
