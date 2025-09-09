import { renderRouter, screen, waitFor } from "expo-router/testing-library";
import { MockedProvider } from "@apollo/client/testing/react";
import { GetCharactersDocument } from "../src/graphql";
import IndexScreen from "../app/index";

const completeListMock = [
  {
    request: {
      query: GetCharactersDocument,
      variables: {},
    },
    result: {
      data: {
        characters: {
          info: {
            next: 0,
          },
          results: [
            {
              id: "1",
              name: "Rick Sanchez",
              species: "Human",
              image: "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
              status: "Alive",
              __typename: "Character",
            },
            {
              id: "2",
              name: "Morty Smith",
              species: "Alien",
              image: "https://rickandmortyapi.com/api/character/avatar/8.jpeg",
              status: "Dead",
              __typename: "Character",
            },
            {
              id: "3",
              name: "Alien Morty",
              image: "https://rickandmortyapi.com/api/character/avatar/14.jpeg",
              species: "Alien",
              status: "unknown",
              __typename: "Character",
            },
          ],
        },
      },
    },
  },
];

const emptyListMocks = [
  {
    request: {
      query: GetCharactersDocument,
      variables: {},
    },
    result: {
      data: {
        characters: {
          info: {
            next: 0,
          },
          results: [],
        },
      },
    },
  },
];

const errorMocks = [
  {
    request: {
      query: GetCharactersDocument,
      variables: {},
    },
  },
];

describe("Characters List Screen", () => {
  it("Renders characters list", async () => {
    const MockComponent = jest.fn(() => (
      <MockedProvider mocks={completeListMock}>
        <IndexScreen />
      </MockedProvider>
    ));

    renderRouter(
      {
        index: MockComponent,
      },
      {
        initialUrl: "/",
      }
    );

    await waitFor(() => {
      // Filters are displayed
      expect(screen.getByTestId("search-field")).toBeVisible();
      expect(screen.getByTestId("status-picker")).toBeVisible();
      expect(screen.getByTestId("gender-picker")).toBeVisible();

      // Names are displayed
      expect(screen.getAllByTestId("character-name")).toHaveLength(3);
      expect(screen.getByText("Rick Sanchez")).toBeVisible();
      expect(screen.getByText("Morty Smith")).toBeVisible();
      expect(screen.getByText("Alien Morty")).toBeVisible();

      // Statuses are displayed
      expect(screen.getAllByTestId("character-status")).toHaveLength(3);
      expect(screen.getByText("Alive")).toBeVisible();
      expect(screen.getByText("Dead")).toBeVisible();
      expect(screen.getByText("unknown")).toBeVisible();

      // Avatars are displayed
      expect(screen.getAllByTestId("character-avatar")).toHaveLength(3);
      // Species are displayed
      expect(screen.getAllByTestId("character-species")).toHaveLength(3);
    });
  });

  it("Handles empty results", async () => {
    const MockComponent = jest.fn(() => (
      <MockedProvider mocks={emptyListMocks}>
        <IndexScreen />
      </MockedProvider>
    ));

    renderRouter(
      {
        index: MockComponent,
      },
      {
        initialUrl: "/",
      }
    );

    await waitFor(() => {
      // Rick`s unamused image is displayed
      expect(screen.getByTestId("rick-image")).toBeVisible();

      // Text is displayed
      expect(
        screen.getByText(
          "This is a waste of perfectly good electricity. Try again, but with a brain this time."
        )
      ).toBeVisible();
    });
  });

  it("Handles errors", async () => {
    const MockComponent = jest.fn(() => (
      <MockedProvider mocks={errorMocks}>
        <IndexScreen />
      </MockedProvider>
    ));

    renderRouter(
      {
        index: MockComponent,
      },
      {
        initialUrl: "/",
      }
    );

    await waitFor(() => {
      // Error image is displayed
      expect(screen.getByTestId("error-image")).toBeVisible();

      // Texts are displayed
      expect(screen.getByText("OOPS...")).toBeVisible();
      expect(screen.getByText("Something went wrong.")).toBeVisible();
      expect(screen.getByText("Let`s Try Again")).toBeVisible();
    });
  });
});
