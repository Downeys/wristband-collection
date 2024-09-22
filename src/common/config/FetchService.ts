export const POST = async (uri: string, data: any, contentType?: 'application/json') => {
    const contentTypeHeader: HeadersInit = contentType ? { "Content-Type": contentType } : {}
    try {
        const response = await fetch(uri, {
            method: "POST",
            body: data,
            headers: {
                ...contentTypeHeader
            },
        });
        if (!response.ok) {
            throw new Error("HTTP error! status: " + response.status);
        }
    } catch (error: any) {
        console.log(
            "There was a problem with the fetch operation " + error.message
        );
    }
}

export default { POST }