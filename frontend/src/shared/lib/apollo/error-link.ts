import { ErrorLink } from "@apollo/client/link/error";

export const errorLink = new ErrorLink(({ error, operation }) => {
  if (error) {
    // GraphQL errors
    if ("errors" in error && Array.isArray(error.errors)) {
      error.errors.forEach((err) => {
        console.warn(
          `[GraphQL error] op=${operation.operationName} msg=${err.message} path=${err.path?.join(".") ?? "n/a"}`,
        );
      });
    }

    // Network error
    if ("networkError" in error && error.networkError) {
      console.warn(
        `[Network error] op=${operation.operationName}`,
        error.networkError,
      );
    }
  }
});
