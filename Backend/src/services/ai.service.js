
module.exports = { generateInterviewReport, generateResumePdf }
const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

/**
 * =========================
 * ZOD SCHEMA
 * =========================
 */

const interviewReportSchema = z.object({
    title: z.string(),

    matchScore: z.number(),

    technicalQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum(["low", "medium", "high"])
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(z.string())
        })
    )
})

/**
 * =========================
 * RETRY FUNCTION
 * =========================
 */

// async function generateWithRetry(fn, retries = 3, delay = 5000) {

//     for (let i = 0; i < retries; i++) {

//         try {

//             return await fn()

//         } catch (error) {

//             console.log("AI ERROR:", error.message)

//             if (i === retries - 1) {

//                 throw new Error("AI service temporarily unavailable.")

//             }

//             console.log(`Retrying... Attempts left: ${retries - i - 1}`)

//             await new Promise(resolve => setTimeout(resolve, delay))
//         }
//     }
// }

async function generateWithRetry(
    fn,
    retries = 5,
    delay = 5000
) {

    for (let i = 0; i < retries; i++) {

        try {

            return await fn()

        } catch (error) {

            console.log("AI ERROR:", error.message)

            const isRetryableError =
                error.message.includes("429") ||
                error.message.includes("503") ||
                error.message.includes("RESOURCE_EXHAUSTED") ||
                error.message.includes("UNAVAILABLE")

            if (!isRetryableError) {
                throw error
            }

            if (i === retries - 1) {

                throw new Error(
                    "AI service temporarily unavailable"
                )
            }

            const waitTime = delay * (i + 1)

            console.log(
                `Retrying in ${waitTime / 1000}s...`
            )

            await new Promise(resolve =>
                setTimeout(resolve, waitTime)
            )
        }
    }
}

/**
 * =========================
 * GENERATE INTERVIEW REPORT
 * =========================
 */

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {

    try {

        // Reduce token usage
        const shortResume = resume?.slice(0, 5000)

        const prompt = `
You are an expert technical interviewer.

Generate a COMPLETE interview report in STRICT JSON format.

Resume:
${shortResume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

IMPORTANT:
- Return ONLY JSON
- No markdown
- No explanation
- Do not return empty arrays

JSON FORMAT:
{
  "title": "Frontend Developer",
  "matchScore": 85,

  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],

  "behavioralQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],

  "skillGaps": [
    {
      "skill": "",
      "severity": "low"
    }
  ],

  "preparationPlan": [
    {
      "day": 1,
      "focus": "",
      "tasks": [""]
    }
  ]
}

Rules:
- Generate minimum 5 technical questions
- Generate minimum 5 behavioral questions
- Generate minimum 3 skill gaps
- Generate minimum 5 preparation days
`

        const response = await generateWithRetry(async () => {

            return await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: zodToJsonSchema(interviewReportSchema)
                }
            })

        })

        let text = response.text

        // Remove markdown
        text = text.replace(/```json/g, "")
        text = text.replace(/```/g, "")

        const parsed = JSON.parse(text)

        return {
            title: parsed.title || "Frontend Developer",
            matchScore: parsed.matchScore || [],

            technicalQuestions:
                parsed.technicalQuestions || [],

            behavioralQuestions:
                parsed.behavioralQuestions || [],

            skillGaps:
                parsed.skillGaps || [],

            preparationPlan:
                parsed.preparationPlan || []
        }

    } catch (error) {

        console.log(error)

        /**
         * FALLBACK DATA
         */

        return {
            title: "Frontend Developer",

            matchScore: 75,

            technicalQuestions: [
                {
                    question: "Explain React Hooks.",
                    intention: "Check React fundamentals.",
                    answer: "Explain useState, useEffect and real-world usage."
                },
                {
                    question: "What is REST API?",
                    intention: "Check backend knowledge.",
                    answer: "Explain CRUD operations and client-server communication."
                },
                {
                    question: "Difference between SQL and MongoDB?",
                    intention: "Check database knowledge.",
                    answer: "Explain relational vs NoSQL databases."
                },
                {
                    question: "What is JWT Authentication?",
                    intention: "Check auth knowledge.",
                    answer: "Explain token-based authentication."
                },
                {
                    question: "What is Express.js?",
                    intention: "Check backend framework understanding.",
                    answer: "Explain Express routing and middleware."
                }
            ],

            behavioralQuestions: [
                {
                    question: "Tell me about yourself.",
                    intention: "Check communication skills.",
                    answer: "Explain education, skills and goals."
                },
                {
                    question: "Why should we hire you?",
                    intention: "Check confidence.",
                    answer: "Explain strengths and dedication."
                },
                {
                    question: "What are your strengths?",
                    intention: "Check self-awareness.",
                    answer: "Talk about problem solving and learning ability."
                },
                {
                    question: "Describe a challenge you faced.",
                    intention: "Check problem-solving.",
                    answer: "Explain situation and resolution."
                },
                {
                    question: "Where do you see yourself in 5 years?",
                    intention: "Check career goals.",
                    answer: "Talk about growth as full stack developer."
                }
            ],

            skillGaps: [
                {
                    skill: "Advanced React",
                    severity: "medium"
                },
                {
                    skill: "System Design",
                    severity: "high"
                },
                {
                    skill: "Testing",
                    severity: "medium"
                }
            ],

            preparationPlan: [
                {
                    day: 1,
                    focus: "React Basics",
                    tasks: [
                        "Revise hooks",
                        "Build small React app"
                    ]
                },
                {
                    day: 2,
                    focus: "Node.js",
                    tasks: [
                        "Learn Express routing",
                        "Practice APIs"
                    ]
                },
                {
                    day: 3,
                    focus: "MongoDB",
                    tasks: [
                        "Practice CRUD",
                        "Learn aggregation"
                    ]
                },
                {
                    day: 4,
                    focus: "Interview Questions",
                    tasks: [
                        "Solve frontend questions",
                        "Practice HR questions"
                    ]
                },
                {
                    day: 5,
                    focus: "Mock Interview",
                    tasks: [
                        "Give mock interview",
                        "Improve communication"
                    ]
                }
            ]
        }
    }
}

/**
 * =========================
 * GENERATE PDF FROM HTML
 * =========================
 */

// async function generatePdfFromHtml(htmlContent) {

//     const browser = await puppeteer.launch({
//         headless: true
//     })

//     const page = await browser.newPage()

//     await page.setContent(htmlContent, {
//         waitUntil: "networkidle0"
//     })

//     const pdfBuffer = await page.pdf({
//         format: "A4",
//         printBackground: true,
//         margin: {
//             top: "20mm",
//             bottom: "20mm",
//             left: "15mm",
//             right: "15mm"
//         }
//     })

//     await browser.close()

//     return pdfBuffer
// }

/**
 * =========================
 * GENERATE RESUME PDF
 * =========================
 */


// async function generatePdfFromHtml(htmlContent) {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage();
//     await page.setContent(htmlContent, { waitUntil: "networkidle0" })

//     const pdfBuffer = await page.pdf({
//         format: "A4", margin: {
//             top: "20mm",
//             bottom: "20mm",
//             left: "15mm",
//             right: "15mm"
//         }
//     })

//     await browser.close()

//     return pdfBuffer
// }

async function generatePdfFromHtml(htmlContent) {

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu"
        ]
    })

    const page = await browser.newPage()

    await page.setContent(htmlContent, {
        waitUntil: "networkidle0"
    })

    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `

    const response = await ai.models.generateContent({
       model: "gemini-2.0-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        }
    })


    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}

module.exports = {
    generateInterviewReport,
    generateResumePdf
}
