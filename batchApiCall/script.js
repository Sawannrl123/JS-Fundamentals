/**
 * Design and implement a batching function that handles multiple API requests triggered randomly, batches them together, and sends a single consolidated API call to the server. This function should throttle the requests by grouping them into predefined intervals and ensure efficient server communication.
 */

function createBatchingFunction(apiCall, interval = 100) {
  let queue = [];
  let timer = null;

  return function batchedApiCall(data) {
    return new Promise((resolve, reject) => {
      // Add the request to the queue with its associated promise handlers
      queue.push({ data, resolve, reject });

      // Start a timer if it's not already running
      if (!timer) {
        timer = setTimeout(() => {
          // Capture the current batch and reset the queue and timer
          const currentBatch = [...queue];
          queue = [];
          timer = null;

          // Extract the data payloads from the current batch
          const payload = currentBatch.map(({ data }) => data);

          // Make the API call with the batched data
          apiCall(payload)
            .then((response) => {
              // Distribute the response to each individual promise
              currentBatch.forEach(({ resolve }, index) => {
                resolve(response[index]); // Map response back to individual calls
              });
            })
            .catch((error) => {
              // Handle errors for each individual promise
              currentBatch.forEach(({ reject }) => reject(error));
            });
        }, interval);
      }
    });
  };
}

function mockApiCall(payload) {
  return new Promise((resolve) => {
    console.log("Batched API Call with Payload:", payload);
    setTimeout(() => {
      // Simulate a successful response for each payload item
      resolve(payload.map((item) => ({ success: true, data: item })));
    }, 500); // Simulate API latency
  });
}

const batchedApiCall = createBatchingFunction(mockApiCall, 100);

batchedApiCall({ id: 1, name: "John" }).then(console.log).catch(console.error);
batchedApiCall({ id: 2, name: "Jane" }).then(console.log).catch(console.error);
batchedApiCall({ id: 3, name: "Alice" }).then(console.log).catch(console.error);

const sendLogs = createBatchingFunction(mockApiCall, 200);

sendLogs({ level: "info", message: "User logged in" })
  .then(console.log)
  .catch(console.error);
sendLogs({ level: "error", message: "Failed to fetch data" })
  .then(console.log)
  .catch(console.error);
sendLogs({ level: "warn", message: "API rate limit approaching" })
  .then(console.log)
  .catch(console.error);
