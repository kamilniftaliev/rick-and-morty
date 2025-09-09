import { renderRouter, screen, waitFor } from "expo-router/testing-library";
import { MockedProvider } from "@apollo/client/testing/react";
import { GetCharacterDocument } from "../src/graphql";
import CharacterScreen from "../app/character/[id]";
import NotFoundScreen from "../app/+not-found";

const completeInfoMock = [
  {
    request: {
      query: GetCharacterDocument,
      variables: {
        id: "1",
      },
    },
    result: {
      data: {
        character: {
          id: "1",
          name: "Rick Sanchez",
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          species: "Human",
          status: "Alive",
          gender: "Male",
          origin: {
            name: "Earth (C-137)",
          },
          location: {
            name: "Citadel of Ricks",
            type: "Space station",
          },
          __typename: "Character",
        },
      },
    },
  },
];

const notFoundInfoMock = [
  {
    request: {
      query: GetCharacterDocument,
      variables: {
        id: "1",
      },
    },
    result: {
      data: {
        character: null,
      },
    },
  },
];

describe("Character Screen", () => {
  it("Renders character info", async () => {
    const MockComponent = jest.fn(() => (
      <MockedProvider mocks={completeInfoMock}>
        <CharacterScreen />
      </MockedProvider>
    ));

    renderRouter(
      {
        "character/[id]": MockComponent,
      },
      {
        initialUrl: "/character/1",
      }
    );

    await waitFor(() => {
      expect(screen).toHavePathname("/character/1");

      // Avatar is displayed
      expect(screen.getByTestId("character-avatar")).toBeVisible();

      // Name is displayed
      expect(screen.getByText("Rick Sanchez")).toBeVisible();

      // Fields are displayed properly
      expect(screen.getByText("Gender")).toBeVisible();
      expect(screen.getByText("Male")).toBeVisible();

      expect(screen.getByText("Status")).toBeVisible();
      expect(screen.getByText("Alive")).toBeVisible();

      expect(screen.getByText("Species")).toBeVisible();
      expect(screen.getByText("Human")).toBeVisible();

      expect(screen.getByText("Origin")).toBeVisible();
      expect(screen.getByText("Earth (C-137)")).toBeVisible();

      expect(screen.getByText("Location")).toBeVisible();
      expect(
        screen.getByText("Space station - Citadel of Ricks")
      ).toBeVisible();
    });
  });

  it("Shows not found if character doesn't exist", async () => {
    const NotFoundComponent = jest.fn(() => <NotFoundScreen />);

    const MockComponent = jest.fn(() => (
      <MockedProvider mocks={notFoundInfoMock}>
        <CharacterScreen />
      </MockedProvider>
    ));

    renderRouter(
      {
        "character/[id]": MockComponent,
        "+not-found": NotFoundComponent,
      },
      {
        initialUrl: "/character/1",
      }
    );

    await waitFor(() => {
      expect(screen).toHavePathname("/+not-found");

      // Avatar is displayed
      expect(screen.getByTestId("not-found-image")).toBeVisible();

      expect(
        screen.getByText("PAGE DOES NOT EXIST IN THIS DIMENSION")
      ).toBeVisible();
      expect(
        screen.getByText("Please try another reality or go back to homepage.")
      ).toBeVisible();
    });
  });
});
