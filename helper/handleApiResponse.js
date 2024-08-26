export const handleApiResponse = (response) => {
    const { responseCode, responseMessage, result } = response.data;
    switch (responseCode) {
        case 200:
            return { success: true, data: result, message: responseMessage };
        case 401:
            return { success: false, message: responseMessage || "Invalid credentials!" };
        case 400:
            return { success: false, message: responseMessage || "Bad request!" };
        case 500:
            return { success: false, message: responseMessage || "Internal server error. Please try again later." };
        default:
            return { success: false, message: "Unexpected response from server." };
    }
};
