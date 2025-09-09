import { GRAPHQL_ENDPOINT } from "./src/constants";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: GRAPHQL_ENDPOINT,
  documents: ["./src/graphql/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "src/graphql/generated.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
