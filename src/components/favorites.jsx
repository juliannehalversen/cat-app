import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const FavoritesContainer = styled.div`
  background: white;
  padding: 30px 40px;
  margin-top: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 25%;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const FavoriteItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const FavoriteHeader = styled.h2`
  color: #333132;
  margin-top: 0;
`;

const FavoriteName = styled.span`
  margin-right: 5px;
  color: #333132;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: red;
`;

const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <FavoritesContainer>
      <FavoriteHeader>Favorites</FavoriteHeader>
      {favorites.length === 0 ? (
        <FavoriteName>No favorites yet, add some below!</FavoriteName>
      ) : (
        <>
          {favorites.map((favorite, index) => (
            <FavoriteItem key={index}>
              <FavoriteName>{favorite}</FavoriteName>
              <DeleteButton onClick={() => removeFromFavorites(favorite)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </DeleteButton>
            </FavoriteItem>
          ))}
        </>
      )}
    </FavoritesContainer>
  );
};

export default Favorites;
