import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

// since we're using a proxy we set this as empty string
// if not using a proxy then needed to set a baseURL like http://localhost:5000/api
const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
	baseQuery,
	tagTypes: ["User"],
	endpoints: (builder) => ({}),
});
