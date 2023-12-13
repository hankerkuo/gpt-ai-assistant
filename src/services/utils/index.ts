import config from '@src/config/index';

const handleRequest = (c: any) => {
  c.metadata = { startTime: new Date() };
  return c;
};

const handleFulfilled = (response: any) => {
  if (config.APP_DEBUG)
    console.info(
      `[${response.status}] ${response.config.method.toUpperCase()} ${
        response.config.baseURL
      }${response.config.url} (${
        new Date().getTime() - response.config.metadata.startTime.getTime()
      }ms)`,
    );
  return response;
};

const handleRejected = (err: any) => {
  if (config.APP_DEBUG)
    console.info(
      `[${err.response?.status || 500}] ${err.config.method.toUpperCase()} ${
        err.config.baseURL
      }${err.config.url} (${
        new Date().getTime() - err.config.metadata.startTime.getTime()
      }ms)`,
    );
  return Promise.reject(err);
};

export { handleRequest, handleFulfilled, handleRejected };
