import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

// ADD TOKEN AUTOMATICALLY
api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token")

    if (token) {

        config.headers.Authorization =
            `Bearer ${token}`
    }

    return config
})

/**
 * Generate interview report
 */
export const generateInterviewReport = async ({
    jobDescription,
    selfDescription,
    resumeFile
}) => {

    const formData = new FormData()

    formData.append(
        "jobDescription",
        jobDescription
    )

    formData.append(
        "selfDescription",
        selfDescription
    )

    formData.append(
        "resume",
        resumeFile
    )

    const response = await api.post(
        "/api/interview/",
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data"
            }
        }
    )

    return response.data
}

/**
 * Get report by id
 */
export const getInterviewReportById =
    async (interviewId) => {

        const response = await api.get(
            `/api/interview/report/${interviewId}`
        )

        return response.data
    }

/**
 * Get all reports
 */
export const getAllInterviewReports =
    async () => {

        const response = await api.get(
            "/api/interview/"
        )

        return response.data
    }

/**
 * Generate resume PDF
 */
export const generateResumePdf =
    async ({ interviewReportId }) => {

        const response = await api.post(
            `/api/interview/resume/pdf/${interviewReportId}`,
            null,
            {
                responseType: "blob"
            }
        )

        return response.data
    }

export default api




// // import axios from "axios";

// // const api = axios.create({
// //     baseURL: "http://localhost:3000",
// //     withCredentials: true,
// // });

// // /**
// //  * @description Service to generate interview report
// //  */
// // export const generateInterviewReport = async ({
// //     title,
// //     jobDescription,
// //     selfDescription,
// //     resumeFile
// // }) => {

// //     try {

// //         const formData = new FormData();

// //         // Required fields
// //         formData.append("title", title);
// //         formData.append("jobDescription", jobDescription);
// //         formData.append("selfDescription", selfDescription);
// //         formData.append("resume", resumeFile);

// //         const response = await api.post(
// //             "/api/interview/",
// //             formData,
// //             {
// //                 headers: {
// //                     "Content-Type": "multipart/form-data"
// //                 }
// //             }
// //         );

// //         return response.data;

// //     } catch (error) {

// //         console.log("Generate Interview Error:", error);

// //         return null;
// //     }
// // };


// // /**
// //  * @description Service to get interview report by interviewId.
// //  */
// // export const getInterviewReportById = async (interviewId) => {

// //     try {

// //         const response = await api.get(
// //             `/api/interview/report/${interviewId}`
// //         );

// //         return response.data;

// //     } catch (error) {

// //         console.log(error);

// //         return null;
// //     }
// // };


// // /**
// //  * @description Service to get all interview reports
// //  */
// // export const getAllInterviewReports = async () => {

// //     try {

// //         const response = await api.get("/api/interview/");

// //         return response.data;

// //     } catch (error) {

// //         console.log(error);

// //         return null;
// //     }
// // };


// // /**
// //  * @description Service to generate resume pdf
// //  */
// // export const generateResumePdf = async ({ interviewReportId }) => {

// //     try {

// //         const response = await api.post(
// //             `/api/interview/resume/pdf/${interviewReportId}`,
// //             null,
// //             {
// //                 responseType: "blob"
// //             }
// //         );

// //         return response.data;

// //     } catch (error) {

// //         console.log(error);

// //         return null;
// //     }
// // };
