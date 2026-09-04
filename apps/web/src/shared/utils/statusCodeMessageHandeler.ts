interface StatusInfo {
  message: string;
  userMessage: string;
}

export function getStatusInfo(statusCode: number): StatusInfo {
  const statusMap: Record<number, StatusInfo> = {
    200: {
      message: "OK",
      userMessage: "Success!",
    },
    201: {
      message: "Created",
      userMessage: "Your request was completed successfully.",
    },
    204: {
      message: "No Content",
      userMessage: "Done! There's nothing more to show here.",
    },
    400: {
      message: "Bad Request",
      userMessage:
        "Something went wrong with your request. Please check your input and try again.",
    },
    401: {
      message: "Unauthorized",
      userMessage: "Access denied. Please log in to continue.",
    },
    403: {
      message: "Forbidden",
      userMessage:
        "You do not have access to this page. Please log in with an authorized account.",
    },
    404: {
      message: "Not Found",
      userMessage: "The page you're looking for could not be found.",
    },
    405: {
      message: "Method Not Allowed",
      userMessage: "This action isn't supported here.",
    },
    409: {
      message: "Conflict",
      userMessage:
        "This request conflicts with existing data. Please refresh and try again.",
    },
    422: {
      message: "Unprocessable Entity",
      userMessage:
        "We couldn't process your request. Please check the details you entered.",
    },
    429: {
      message: "Too Many Requests",
      userMessage:
        "You're doing that too much! Please wait a moment and try again.",
    },
    500: {
      message: "Internal Server Error",
      userMessage: "Something went wrong on our end. Please try again later.",
    },
    502: {
      message: "Bad Gateway",
      userMessage:
        "We're having trouble connecting to the server. Please try again shortly.",
    },
    503: {
      message: "Service Unavailable",
      userMessage:
        "The service is temporarily unavailable. Please try again later.",
    },
    504: {
      message: "Gateway Timeout",
      userMessage: "The server took too long to respond. Please try again.",
    },
  };

  return (
    statusMap[statusCode] || {
      message: "Unknown Status",
      userMessage: "Something unexpected happened. Please try again.",
    }
  );
}

// // Example usage
// console.log(getStatusInfo(404));
// // { message: "Not Found", userMessage: "The page you're looking for could not be found." }

// console.log(getStatusInfo(403).userMessage);
// // "You do not have access to this page. Please log in with an authorized account."
