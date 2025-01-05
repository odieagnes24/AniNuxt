import { getQuery, getRouterParams } from 'h3';

export default defineEventHandler(async (event) => {
  const { path } = getRouterParams(event);
  const query = getQuery(event);

  // Get the base URL from the query parameters (for the initial request)
  const baseUrl = query.baseUrl;

  if (!baseUrl) {
    event.node.res.statusCode = 400;
    return 'Missing baseUrl parameter.';
  }

  // Construct the requested path
  const requestedPath = Array.isArray(path) ? `/${path.join('/')}` : `/${path}`;
  const url = `${baseUrl}${requestedPath}`;

  try {
    const response = await $fetch.raw(url);

    // Set headers for the response
    for (const [key, value] of Object.entries(response.headers)) {
      event.node.res.setHeader(key, value);
    }

    // Return the response body
    return response._data;
  } catch (error) {
    console.error('Error fetching the HLS resource:', error);

    // Return 404 status for errors
    event.node.res.statusCode = 404;
    return 'The requested resource was not found on this server.';
  }
});
