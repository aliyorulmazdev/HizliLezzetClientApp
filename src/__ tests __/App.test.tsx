import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import { StoreContext, store } from "../app/stores/store.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "../app/router/Routes.tsx";

test("Renders the main page", () => {
    const root = document.createElement('div');
    document.body.appendChild(root);

    render(
      <StoreContext.Provider value={store}>
        <RouterProvider router={router} />
      </StoreContext.Provider>,
      { container: root }
    );

    expect(true).toBeTruthy()
})
