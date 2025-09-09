import { renderRouter, screen, waitFor } from "expo-router/testing-library";
import NotFoundScreen from "../app/+not-found";

describe("Not Found Screen", () => {
  it("Shows if screen not found", async () => {
    const NotFoundComponent = jest.fn(() => <NotFoundScreen />);

    renderRouter(
      {
        "+not-found": NotFoundComponent,
      },
      {
        initialUrl: "/no-screen",
      }
    );

    await waitFor(() => {
      expect(screen).toHavePathname("/no-screen");

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
