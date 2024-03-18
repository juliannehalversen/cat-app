import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Favorites from "./favorites";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Loader = styled.div`
  border: 7px solid #f3f3f3;
  border-radius: 50%;
  border-top: 7px solid #ff6841;
  width: 60px;
  height: 60px;
  animation: ${spin} 2s linear infinite;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  margin: 50px 0;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const CatContainer = styled.div`
  margin: 30px 0;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CatHeader = styled.h2`
  color: #333132;
`;

const CatSubHeader = styled.h3`
  color: #333132;
`;

const CatDescription = styled.p`
  color: #333132;
  max-width: 80%;
  text-align: center;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

const StyledLi = styled.li`
  margin-bottom: 10px;
`;

const StyledButton = styled.a`
  display: inline-block;
  background-color: #ff6841;
  color: white;
  padding: 10px 20px;
  border: none;
  font-size: 16px;

  border-radius: 15px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-style: none;
  &:hover {
    background-color: #ec3000;
    transition: background-color 0.3s ease;
  }
`;

const AddToFavoritesButton = styled.button`
  background-color: #3498db;
  font-size: 16px;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s ease;
  font-style: none;

  .icon {
    margin-right: 5px;
  }

  &:hover {
    background-color: #2980b9;
    transition: background-color 0.3s ease;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Cats = () => {
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const breedIds = ["abys", "beng", "bslo", "cymr", "drex", "mcoo"];
  const apiKey =
    "live_YgaqY1hM1Y6Xob8ElxPlobsWYjBIADFfswjE0Iowbe9lEF45wdsAej3gHooZgW0i";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = breedIds.map(async (breedId) => {
          const response = await fetch(
            `https://api.thecatapi.com/v1/images/search?limit=5&has_breeds=true&api_key=${apiKey}&breed_id=${breedId}`,
          );
          const data = await response.json();
          return { breedId, data };
        });
        const catsData = await Promise.all(requests);
        setCats(catsData);
      } catch (error) {
        console.error("Error fetching cats data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToFavorites = (catName) => {
    if (!favorites.includes(catName)) {
      setFavorites([...favorites, catName]);
    }
  };

  const removeFromFavorites = (catName) => {
    setFavorites(favorites.filter((favorite) => favorite !== catName));
  };

  const isFavorite = (catName) => {
    return favorites.includes(catName);
  };

  return (
    <div>
      {loading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <Container>
          <Favorites
            favorites={favorites}
            removeFromFavorites={removeFromFavorites}
          />

          {cats.map((catBreed, index) => (
            <CatContainer key={index}>
              <CatHeader>{catBreed.data[0].breeds[0].name} Cats</CatHeader>
              <CatDescription>
                {catBreed.data[0].breeds[0].description}
              </CatDescription>
              <CatSubHeader>Stats</CatSubHeader>
              <StyledUl>
                <StyledLi>
                  Affection Level: {catBreed.data[0].breeds[0].affection_level}
                </StyledLi>
                <StyledLi>
                  Health Issues: {catBreed.data[0].breeds[0].health_issues}
                </StyledLi>
                <StyledLi>
                  Child Friendly: {catBreed.data[0].breeds[0].child_friendly}
                </StyledLi>
                <StyledLi>
                  Indoor:{" "}
                  {catBreed.data[0].breeds[0].indoor === 1 ? " Yes" : " No"}
                </StyledLi>
                <StyledLi>
                  Life Span: {catBreed.data[0].breeds[0].life_span} Years
                </StyledLi>
                <StyledLi>
                  Temperament: {catBreed.data[0].breeds[0].temperament}
                </StyledLi>
              </StyledUl>
              <StyledButton
                href={catBreed.data[0].breeds[0].wikipedia_url}
                target="_blank"
              >
                Learn More
              </StyledButton>
              <AddToFavoritesButton
                disabled={isFavorite(catBreed.data[0].breeds[0].name)}
                onClick={() => addToFavorites(catBreed.data[0].breeds[0].name)}
              >
                {isFavorite(catBreed.data[0].breeds[0].name) ? (
                  <>
                    <FontAwesomeIcon icon={faCheck} className="icon" />
                    Added to Favorites
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    Add to Favorites
                  </>
                )}
              </AddToFavoritesButton>

              <CardContainer>
                {catBreed.data.map((cat) => (
                  <Card key={`${cat.id}-${catBreed.breedId}-${cat.url}`}>
                    <Image src={cat.url} alt="cat" />
                  </Card>
                ))}
              </CardContainer>
            </CatContainer>
          ))}
        </Container>
      )}
    </div>
  );
};

export default Cats;
