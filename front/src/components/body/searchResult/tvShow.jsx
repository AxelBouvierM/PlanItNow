import React from 'react';
import styled from 'styled-components';


// each result container
const TvShowContainer = styled.div`
  width: 100%;
  min-height: 6em;
  display: flex;
  border-bottom: 2px solid #d8d8d852;
  padding: 6px 8px;
  align-items: center;
`;

// result thumbnail (miniatura)
const Thumbnail = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex: 0.4;
  img {
    width: auto;
    height: 100%;
  }
`;

// result name
const Name = styled.h3`
  font-size: 15px;
  color: #000;
  margin-left: 10px;
  flex: 2;
  display: flex;
`;

// result rating 
const Rating = styled.span`
  color: #a1a1a1;
  font-size: 16px;
  display: flex;
  flex: 0.2;
`;

export function TvShow(props) {
	const { thumbnailSrc, name, rating } = props;

	return (
		<TvShowContainer>
			<Thumbnail>
				<img src={thumbnailSrc} alt="" />
			</Thumbnail>
			<Name>{name}</Name>
			<Rating>{rating || "N/A"}</Rating>
		</TvShowContainer>
	);
}